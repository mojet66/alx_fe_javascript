// Array to store quote objects
const quotes = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivation",
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    category: "Inspiration",
  },
  {
    text: "Life is 10% what happens to us and 90% how we react to it.",
    category: "Life",
  },
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Find or create a container to show the quote
  let quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>Category: ${quote.category}</em></p>
  `;
}
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Function to add a new quote from input field

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

  quoteInput.value = "";
  categoryInput.value = "";

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> ${newQuote.text}</p>
    <p><strong>Category:</strong> ${newQuote.category}</p>
  `;

  alert("New quote added!");
}
