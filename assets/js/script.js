const main = document.getElementById("main");
const addUserBtn = document.getElementById("user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");


// Initialise Array
let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
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

// Add new object to data array
function addData(object) {
    data.push(object);
}