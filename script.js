// ===============================
// MITUMBA STOCK SYSTEM
// ===============================

// Storage for all items
let stock = [];

// ===============================
// ADD STOCK FUNCTION
// ===============================
function addStock() {
  let name = document.getElementById("itemName").value;
  let quantity = parseFloat(document.getElementById("itemQuantity").value);
  let buyPrice = parseFloat(document.getElementById("buyPrice").value);
  let sellPrice = parseFloat(document.getElementById("sellPrice").value);

  // Check empty fields
  if (!name || !quantity || !buyPrice || !sellPrice) {
    alert("Please fill all fields");
    return;
  }

  // Calculate profit
  let profit = (sellPrice - buyPrice) * quantity;

  // Save item
  stock.push({
    name: name,
    quantity: quantity,
    buyPrice: buyPrice,
    sellPrice: sellPrice,
    profit: profit
  });

  // Clear inputs
  document.getElementById("itemName").value = "";
  document.getElementById("itemQuantity").value = "";
  document.getElementById("buyPrice").value = "";
  document.getElementById("sellPrice").value = "";

  // Update UI
  renderStock();
  updateProfit();
}

// ===============================
// SHOW STOCK LIST
// ===============================
function renderStock() {
  let list = document.getElementById("stockList");
  list.innerHTML = "";

  stock.forEach((item, index) => {
    let li = document.createElement("li");

    li.innerHTML =
      "📦 " + item.name +
      " | " + item.quantity + " pcs" +
      " | 💰 Profit: " + item.profit + " KSh " +
      `<button onclick="deleteItem(${index})">Delete</button>`;

    list.appendChild(li);
  });
}

// ===============================
// DELETE ITEM
// ===============================
function deleteItem(index) {
  stock.splice(index, 1); // remove item
  renderStock();          // refresh list
  updateProfit();         // refresh profit
}

// ===============================
// UPDATE TOTAL PROFIT
// ===============================
function updateProfit() {
  let total = 0;

  stock.forEach(item => {
    total += item.profit;
  });

  document.getElementById("profit").innerText = total;
}
function sellItem(index) {
  if (stock[index].quantity > 0) {
    stock[index].quantity -= 1;

    // update profit per sale (simple version)
    stock[index].profit = stock[index].quantity * (stock[index].sellPrice - stock[index].buyPrice);

    saveData();
    renderStock();
    updateProfit();
  } else {
    alert("No stock left!");
  }
}