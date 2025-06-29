// // === Global Quotes Array ===
// let quotes = [];

// // === Load saved quotes or use default ===
// const savedQuotes = localStorage.getItem("quotes");
// if (savedQuotes) {
//   quotes = JSON.parse(savedQuotes);
// } else {
//   quotes = [
//     {
//       text: "The only limit to our realization of tomorrow is our doubts of today.",
//       category: "Motivation",
//     },
//     {
//       text: "Life is what happens when you're busy making other plans.",
//       category: "Life",
//     },
//     {
//       text: "Imagination is more important than knowledge.",
//       category: "Inspiration",
//     },
//   ];
//   saveQuotes(); // Save defaults to localStorage
// }

// // === Save to localStorage ===
// function saveQuotes() {
//   localStorage.setItem("quotes", JSON.stringify(quotes));
// }

// // === Show a random quote ===
// function showRandomQuote() {
//   const randomIndex = Math.floor(Math.random() * quotes.length);
//   const quote = quotes[randomIndex];

//   const quoteDisplay = document.getElementById("quoteDisplay");
//   quoteDisplay.innerHTML = `
//     <p><strong>Quote:</strong> ${quote.text}</p>
//     <p><strong>Category:</strong> ${quote.category}</p>
//   `;

//   // Save to sessionStorage
//   sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
// }

// // === Filter and display quotes by selected category ===
// function filterQuotes() {
//   const selectedCategory = document.getElementById("categoryFilter").value;
//   localStorage.setItem("selectedCategory", selectedCategory);

//   const quoteDisplay = document.getElementById("quoteDisplay");
//   quoteDisplay.innerHTML = "";

//   const filteredQuotes =
//     selectedCategory === "all"
//       ? quotes
//       : quotes.filter((q) => q.category === selectedCategory);

//   if (filteredQuotes.length === 0) {
//     quoteDisplay.innerHTML = `<p>No quotes found for this category.</p>`;
//   } else {
//     filteredQuotes.forEach((quote) => {
//       const quoteBlock = document.createElement("div");
//       quoteBlock.innerHTML = `
//         <p><strong>Quote:</strong> ${quote.text}</p>
//         <p><strong>Category:</strong> ${quote.category}</p>
//         <hr/>
//       `;
//       quoteDisplay.appendChild(quoteBlock);
//     });
//   }
// }

// // === Populate category dropdown dynamically ===
// function populateCategories() {
//   const categorySet = new Set();
//   quotes.forEach((quote) => categorySet.add(quote.category));

//   const filterDropdown = document.getElementById("categoryFilter");
//   filterDropdown.innerHTML = `<option value="all">All Categories</option>`;

//   categorySet.forEach((category) => {
//     const option = document.createElement("option");
//     option.value = category;
//     option.textContent = category;
//     filterDropdown.appendChild(option);
//   });

//   const savedFilter = localStorage.getItem("selectedCategory");
//   if (savedFilter) {
//     filterDropdown.value = savedFilter;
//     filterQuotes(); // Re-apply filter
//   }
// }

// // === Add a new quote from input fields ===
// function addQuote() {
//   const quoteInput = document.getElementById("newQuoteText");
//   const categoryInput = document.getElementById("newQuoteCategory");

//   const quoteText = quoteInput.value.trim();
//   const quoteCategory = categoryInput.value.trim();

//   if (quoteText === "" || quoteCategory === "") {
//     alert("Please fill in both the quote and category.");
//     return;
//   }

//   const newQuote = { text: quoteText, category: quoteCategory };
//   quotes.push(newQuote);
//   saveQuotes();

//   quoteInput.value = "";
//   categoryInput.value = "";

//   populateCategories(); // Refresh dropdown if new category was added
//   filterQuotes(); // Reapply filter or show all
//   alert("New quote added!");
// }

// // === Export quotes to a downloadable JSON file ===
// document.getElementById("exportBtn").addEventListener("click", () => {
//   const json = JSON.stringify(quotes, null, 2);
//   const blob = new Blob([json], { type: "application/json" });
//   const url = URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "quotes.json";
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// });

// // === Import quotes from uploaded JSON file ===
// function importFromJsonFile(event) {
//   const fileReader = new FileReader();
//   fileReader.onload = function (event) {
//     try {
//       const importedQuotes = JSON.parse(event.target.result);
//       if (
//         Array.isArray(importedQuotes) &&
//         importedQuotes.every((q) => q.text && q.category)
//       ) {
//         quotes.push(...importedQuotes);
//         saveQuotes();
//         populateCategories();
//         filterQuotes();
//         alert("Quotes imported successfully!");
//       } else {
//         alert("Invalid JSON format.");
//       }
//     } catch (error) {
//       alert("Failed to parse JSON file.");
//     }
//   };
//   fileReader.readAsText(event.target.files[0]);
// }

// // === On page load ===
// window.addEventListener("DOMContentLoaded", () => {
//   // Restore last viewed quote (same session)
//   const lastViewed = sessionStorage.getItem("lastViewedQuote");
//   if (lastViewed) {
//     const quote = JSON.parse(lastViewed);
//     const quoteDisplay = document.getElementById("quoteDisplay");
//     quoteDisplay.innerHTML = `
//       <p><strong>Quote:</strong> ${quote.text}</p>
//       <p><strong>Category:</strong> ${quote.category}</p>
//     `;
//   }

//   // Setup dropdown
//   populateCategories();
// });

// // === Bind event listeners ===
// document.getElementById("newQuote").addEventListener("click", showRandomQuote);
// document
//   .getElementById("importFile")
//   .addEventListener("change", importFromJsonFile);

// === Global ===
let quotes = [];
let conflictQueue = [];

// === Load from Local Storage or use defaults ===
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
  saveQuotes();
}

// === Save quotes to localStorage ===
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// === Show random quote ===
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> ${quote.text}</p>
    <p><strong>Category:</strong> ${quote.category}</p>
  `;

  sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
}

// === Add new quote ===
function addQuote() {
  const quoteInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const quoteText = quoteInput.value.trim();
  const quoteCategory = categoryInput.value.trim();

  if (!quoteText || !quoteCategory) {
    alert("Please fill in both the quote and category.");
    return;
  }

  const newQuote = { text: quoteText, category: quoteCategory };
  quotes.push(newQuote);
  saveQuotes();
  quoteInput.value = "";
  categoryInput.value = "";

  populateCategories();
  filterQuotes();
  showNotification("✅ Quote added.");
}

// === Filter quotes by category ===
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);

  const display = document.getElementById("quoteDisplay");
  display.innerHTML = "";

  const filtered =
    selected === "all" ? quotes : quotes.filter((q) => q.category === selected);

  if (filtered.length === 0) {
    display.innerHTML = `<p>No quotes found for this category.</p>`;
  } else {
    filtered.forEach((q) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>Quote:</strong> ${q.text}</p>
        <p><strong>Category:</strong> ${q.category}</p>
        <hr/>
      `;
      display.appendChild(div);
    });
  }
}

// === Populate dropdown with categories ===
function populateCategories() {
  const dropdown = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map((q) => q.category))];

  dropdown.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    dropdown.appendChild(option);
  });

  const saved = localStorage.getItem("selectedCategory");
  if (saved) {
    dropdown.value = saved;
    filterQuotes();
  }
}

// === Export quotes as JSON ===
document.getElementById("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
});

// === Import quotes from JSON file ===
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (
        Array.isArray(imported) &&
        imported.every((q) => q.text && q.category)
      ) {
        quotes.push(...imported);
        saveQuotes();
        populateCategories();
        filterQuotes();
        showNotification("✅ Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch {
      alert("Failed to read JSON file.");
    }
  };
  reader.readAsText(event.target.files[0]);
}
document
  .getElementById("importFile")
  .addEventListener("change", importFromJsonFile);

// === Notification Helper ===
function showNotification(msg) {
  const box = document.getElementById("notification");
  box.textContent = msg;
  setTimeout(() => (box.textContent = ""), 5000);
}

// === Conflict Resolution ===
function showConflictUI() {
  const container = document.getElementById("conflictContainer");
  const list = document.getElementById("conflictList");
  list.innerHTML = "";

  conflictQueue.forEach((conflict, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>Conflict #${i + 1}</strong></p>
      <p><u>Local:</u> ${conflict.local.text} (${conflict.local.category})</p>
      <p><u>Server:</u> ${conflict.server.text} (${
      conflict.server.category
    })</p>
      <button onclick="resolveConflict(${i}, 'local')">Keep Local</button>
      <button onclick="resolveConflict(${i}, 'server')">Use Server</button>
      <hr/>
    `;
    list.appendChild(div);
  });

  container.style.display = "block";
}

function resolveConflict(index, choice) {
  const { localIndex, server } = conflictQueue[index];
  if (choice === "server") quotes[localIndex] = server;

  conflictQueue.splice(index, 1);

  if (conflictQueue.length === 0) {
    document.getElementById("conflictContainer").style.display = "none";
    saveQuotes();
    populateCategories();
    filterQuotes();
    showNotification("✅ Conflicts resolved.");
  } else {
    showConflictUI();
  }
}

// === Fetch from Server with Conflict Detection ===
function fetchServerQuotes() {
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    .then((res) => res.json())
    .then((data) => {
      let updated = false;
      conflictQueue = [];

      data.forEach((item) => {
        const serverQuote = { text: item.body, category: "Server" };
        const index = quotes.findIndex((q) => q.text === serverQuote.text);

        if (index === -1) {
          quotes.push(serverQuote);
          updated = true;
        } else {
          const local = quotes[index];
          if (JSON.stringify(local) !== JSON.stringify(serverQuote)) {
            conflictQueue.push({
              localIndex: index,
              local,
              server: serverQuote,
            });
          }
        }
      });

      if (updated) {
        saveQuotes();
        populateCategories();
        filterQuotes();
        showNotification("✅ Synced new quotes from server.");
      }

      if (conflictQueue.length > 0) showConflictUI();
    })
    .catch((err) => console.error("Server fetch failed:", err));
}

// === On Page Load ===
window.addEventListener("DOMContentLoaded", () => {
  const lastViewed = sessionStorage.getItem("lastViewedQuote");
  if (lastViewed) {
    const q = JSON.parse(lastViewed);
    document.getElementById("quoteDisplay").innerHTML = `
      <p><strong>Quote:</strong> ${q.text}</p>
      <p><strong>Category:</strong> ${q.category}</p>
    `;
  }

  populateCategories();
  filterQuotes(); // Ensure initial display is filtered
  fetchServerQuotes(); // Initial sync
});

// === Periodic Server Sync (every 30 seconds) ===
setInterval(fetchServerQuotes, 30000);
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
