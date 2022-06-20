const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort-by-richest");
const calculateWealthBtn = document.getElementById("calculate-wealth");


// Initialise Array
let data = [];


// Fetch random user and add money using async await
async function getRandomUser() {
    const res = await fetch("https://www.randomuser.me/api")
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser)
};

// Double Money 
function doubleMoney() {
    data = data.map((person) => {
        return {...person, money: person.money * 2}
    });

    updateDOM();
}

// Add new object to data array
function addData(object) {
    data.push(object);

    updateDOM();
};

// Sort Users by richest
function sortByRichest() {
    data.sort((a, b) => {
        return b.money - a.money
    });

    updateDOM();
};

// Filter only Millionaires
function showMillionaires() {
    data = data.filter(person => person.money > 1000000);

    updateDOM();
}

// Calculates all users total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthElement = document.createElement("div");
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);

};

// Update DOM
function updateDOM(providedData = data) {
    // Clear Main Div
    main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

    // Arrow functions dont need () for only one param
    providedData.forEach(person => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`;
        main.appendChild(element);
    });
};


// Format Number as money 
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return "£" + " " + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Event Lisneters
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);