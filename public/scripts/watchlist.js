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

      // Added listener for delete button that calls backend
      // Similar structure to adding a new stock
      deleteBtn.addEventListener("click", async () => {
        try {
          const deleteRes = await fetch(`/watchlist/${encodeURIComponent(stock.symbol)}`, {     // Get stock symbol component to delete specific stock
            method: "DELETE",
          });

          if (!deleteRes.ok) {
            const err = await deleteRes.json().catch(() => ({}));
            throw new Error(err.error || "Could not delete stock");
          }

          // Refresh watchlist after deleting
          await loadWatchlist();
        } catch (err) {
          console.error("delete stock failed", err);
          alert("Failed to delete stock: " + err.message);
        }
      });

      actions.append(editBtn, deleteBtn);
      li.append(info, actions);
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Failed to load watchlist", err);
  }
}


// Create new stock with inputted info
async function createStock() {
  const symbolField = document.getElementById("symbol");
  const companyField = document.getElementById("company");
  const priceField = document.getElementById("price");

  if (!symbolField || !companyField || !priceField) {
    console.error("Modal elements missing: unable to create stock");
    alert("Modal fields are not available. Refresh the page and try again.");
    return;
  }

  const symbol = symbolField.value.trim();
  const company = companyField.value.trim();
  const price = parseFloat(priceField.value);

  if (!symbol || !company || Number.isNaN(price) || price < 0) {
    alert("Please enter valid symbol, company and a non-negative price.");
    return;
  }

  const stock = { symbol, company, price };

  // Retrieve POST stock from server with error checking for testing
  try {
    const res = await fetch("/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stock),
    });

    if (!res.ok) {
      throw new Error("Failed to create stock");
    }

    // refresh list if passed and close modal
    await loadWatchlist();
    closeStockModal();
  } catch (err) {
    console.error("createStock failed", err);
    alert("Could not create stock");
  }
}


// https://www.javaspring.net/blog/is-it-possible-to-give-multiple-input-box-in-prompt-alert-in-javascript/
// Had help from this to create a form screen since the default js input dialog does not support more than one inputs
// without 3rd party library
function openStockModal() {
  document.getElementById("symbol").value = "";
  document.getElementById("company").value = "";
  document.getElementById("price").value = "";
  document.getElementById("multiInputModal").classList.add("active");
  document.getElementById("multiInputModal").setAttribute("aria-hidden", "false");
}

function closeStockModal() {
  document.getElementById("multiInputModal").classList.remove("active");
  document.getElementById("multiInputModal").setAttribute("aria-hidden", "true");
}

// Retrieve content from the modal
window.addEventListener("DOMContentLoaded", () => {
  const addStockBtn = document.getElementById("addStockBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const submitBtn = document.getElementById("submitBtn");
  const modal = document.getElementById("multiInputModal");

  if (addStockBtn) addStockBtn.addEventListener("click", openStockModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeStockModal);
  if (submitBtn) submitBtn.addEventListener("click", createStock);

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeStockModal();
      }
    });
  }
});