const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch a random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

// Double everone's money
function doubleMoney() {
  data = data.map((user, item, array) => {
    return { ...user, money: user.money * 2 };
    // return { name: user.name, money: user.money * 2 }; // You could manually build object or use spread operator like above
  });

  updateDOM();
}

// Sort by richest
function sortByRichest() {
  // Note this is mutating the array.  Normally we want to make a copy, update the copy and then update the original state.

  // Descending
  data.sort((a, b) => b.money - a.money);

  // Example: Ascending
  // data.sort((a, b) => {
  //   if (a.money < b.money) return -1;
  //   if (a.money > b.money) return 1;
  //   return 0;
  // });

  updateDOM();
}

// Show millionaires
function showMillionaires() {
  data = data.filter(user => {
    return user.money >= 1000000;
  });

  updateDOM();
}

// Calculate total wealth
function calculateWealth() {
  const total = data.reduce((accumulator, user) => {
    return accumulator + user.money;
  }, 0);

  updateDOM();
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    total
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Add new obj to the data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Initialize
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  // <div class="person"><strong>Alma Andersen</strong> $252,174.00</div>
  providedData.forEach((item, index, array) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;

    main.appendChild(element);
  });
}

// Format number as money
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}

// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
