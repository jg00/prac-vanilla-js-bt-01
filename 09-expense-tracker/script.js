const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list"); // ul
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

/* For test data only before utilizing localStorage
  const dummyTransactions = [
    { id: 1, text: "Flower", amount: -20 },
    { id: 2, text: "Salary", amount: 300 },
    { id: 3, text: "Book", amount: -10 },
    { id: 4, text: "Camera", amount: 150 }
  ];

  let transactions = dummyTransactions;
*/

// Initialize localStorage
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
); // Returns a stringyfied array so we need to JSON.parse.

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateId(),
      text: text.value.trim(),
      amount: +amount.value.trim()
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

// Generate random Id
function generateId() {
  return Math.floor(Math.random() * 100000000);
}

// Add each transaction to DOM list
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span>
  <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>`;

  list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts
    .reduce((acc, currentValue) => {
      return acc + currentValue;
    }, 0)
    .toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const expense = amounts
    .filter(item => item < 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  balance.innerHTML = `${total}`;
  money_plus.innerHTML = `${income}`;
  money_minus.innerHTML = `${expense}`;
}

// Update local storage transactions
// Important - With localStorage you have to update the whole list when setting.
// Run updateLocalStorage() when adding and removing a transaction.
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Initial load and display transactions
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);

  updateValues();
}

// Remove transaction
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  init();
}

init();

// Event listeners
form.addEventListener("submit", addTransaction);
