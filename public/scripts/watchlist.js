// Watchlist library for frontend

// Loads watchlist from JSON
async function loadWatchlist() {
  try {
    const res = await fetch("/watchlist");
    const data = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    // Creates a new element for each stock instead of a list
    // Allows for users to interact with specific stocks since they are elements
    data.forEach((stock) => {
      const li = document.createElement("li");
      li.className = "list-group-item bg-dark text-light border-secondary d-flex justify-content-between align-items-center";

      const info = document.createElement("span");
      info.textContent = `${stock.symbol} — ${stock.company} ($${stock.price})`;

      const actions = document.createElement("div");
      actions.className = "btn-group btn-group-sm";

      // Edit button assigned to each stock
      const editBtn = document.createElement("button");
      editBtn.className = "btn btn-outline-warning";
      editBtn.textContent = "Edit";
      // Add edit here

      // delete button assigned to each stock
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-outline-danger";
      deleteBtn.textContent = "Delete";
      // Add delete here

      actions.append(editBtn, deleteBtn);
      li.append(info, actions);
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Failed to load watchlist", err);
  }
}


// Create new stock with inputted info
async function createStock(event) {}