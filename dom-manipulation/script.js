// === Load quotes from localStorage or use default ===
let quotes = [];

const savedQuotes = localStorage.getItem("quotes");
if (savedQuotes) {
  quotes = JSON.parse(savedQuotes);
} else {
  quotes = [
    {
      text: "The only limit to our realization of tomorrow is our doubts of today.",
      category: "Motivation",
    },
    {
      text: "Life is what happens when you're busy making other plans.",
      category: "Life",
    },
    {
      text: "Imagination is more important than knowledge.",
      category: "Inspiration",
    },
  ];
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// === Display a random quote ===
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> ${quote.text}</p>
    <p><strong>Category:</strong> ${quote.category}</p>
  `;

  // Save to sessionStorage
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
}

// === Show last viewed quote from sessionStorage on page load ===
window.addEventListener("DOMContentLoaded", () => {
  const lastViewed = sessionStorage.getItem("lastViewedQuote");
  if (lastViewed) {
    const quote = JSON.parse(lastViewed);
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `
      <p><strong>Quote:</strong> ${quote.text}</p>
      <p><strong>Category:</strong> ${quote.category}</p>
    `;
  }
});

// === Show Random Quote Button Event ===
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// === Add a New Quote via Form ===
function addQuote() {
  const quoteInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const quoteText = quoteInput.value.trim();
  const quoteCategory = categoryInput.value.trim();

  if (quoteText === "" || quoteCategory === "") {
    alert("Please fill in both the quote and category.");
    return;
  }

  const newQuote = {
    text: quoteText,
    category: quoteCategory,
  };

  quotes.push(newQuote);

  // Save updated quotes to localStorage
  localStorage.setItem("quotes", JSON.stringify(quotes));

  // Clear input fields
  quoteInput.value = "";
  categoryInput.value = "";

  // Show the new quote immediately
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> ${newQuote.text}</p>
    <p><strong>Category:</strong> ${newQuote.category}</p>
  `;

  // Save to sessionStorage
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(newQuote));

  alert("New quote added!");
}

// === Export Quotes to JSON File ===
document.getElementById("exportBtn").addEventListener("click", () => {
  const json = JSON.stringify(quotes, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

// === Import Quotes from JSON File ===
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);

      if (
        Array.isArray(importedQuotes) &&
        importedQuotes.every((q) => q.text && q.category)
      ) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
        showRandomQuote(); // optionally display one
      } else {
        alert("Invalid JSON format.");
      }
    } catch (error) {
      alert("Failed to parse JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Bind the import function to the input file element
document
  .getElementById("importFile")
  .addEventListener("change", importFromJsonFile);
