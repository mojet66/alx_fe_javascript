// === Global Quotes Array ===
let quotes = [];

// === Load saved quotes or use default ===
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
  saveQuotes(); // Save defaults to localStorage
}

// === Save to localStorage ===
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// === Show a random quote ===
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

// === Filter and display quotes by selected category ===
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter((q) => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = `<p>No quotes found for this category.</p>`;
  } else {
    filteredQuotes.forEach((quote) => {
      const quoteBlock = document.createElement("div");
      quoteBlock.innerHTML = `
        <p><strong>Quote:</strong> ${quote.text}</p>
        <p><strong>Category:</strong> ${quote.category}</p>
        <hr/>
      `;
      quoteDisplay.appendChild(quoteBlock);
    });
  }
}

// === Populate category dropdown dynamically ===
function populateCategories() {
  const categorySet = new Set();
  quotes.forEach((quote) => categorySet.add(quote.category));

  const filterDropdown = document.getElementById("categoryFilter");
  filterDropdown.innerHTML = `<option value="all">All Categories</option>`;

  categorySet.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filterDropdown.appendChild(option);
  });

  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter) {
    filterDropdown.value = savedFilter;
    filterQuotes(); // Re-apply filter
  }
}

// === Add a new quote from input fields ===
function addQuote() {
  const quoteInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const quoteText = quoteInput.value.trim();
  const quoteCategory = categoryInput.value.trim();

  if (quoteText === "" || quoteCategory === "") {
    alert("Please fill in both the quote and category.");
    return;
  }

  const newQuote = { text: quoteText, category: quoteCategory };
  quotes.push(newQuote);
  saveQuotes();

  quoteInput.value = "";
  categoryInput.value = "";

  populateCategories(); // Refresh dropdown if new category was added
  filterQuotes(); // Reapply filter or show all
  alert("New quote added!");
}

// === Export quotes to a downloadable JSON file ===
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

// === Import quotes from uploaded JSON file ===
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
        populateCategories();
        filterQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch (error) {
      alert("Failed to parse JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// === On page load ===
window.addEventListener("DOMContentLoaded", () => {
  // Restore last viewed quote (same session)
  const lastViewed = sessionStorage.getItem("lastViewedQuote");
  if (lastViewed) {
    const quote = JSON.parse(lastViewed);
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `
      <p><strong>Quote:</strong> ${quote.text}</p>
      <p><strong>Category:</strong> ${quote.category}</p>
    `;
  }

  // Setup dropdown
  populateCategories();
});

// === Bind event listeners ===
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document
  .getElementById("importFile")
  .addEventListener("change", importFromJsonFile);
