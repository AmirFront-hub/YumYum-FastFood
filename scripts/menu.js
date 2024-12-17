import { populateCart } from "./cart.js";

const apiUrl = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/";
const menuElement = document.getElementById('menu-items');

let cart = [];
let cartCount;
let cartList;

// DOM elements
function initializeDOMElements() {
    cartCount = document.querySelector(".cart-count");
    cartList = document.querySelector(".cart-list");
}

async function fetchMenuData() {
    const options = {
        method: "GET",
        headers: {
            "x-zocom": "yum-4wOFSa0vV0WtlFYK"
        }
    };
    try {
        const response = await fetch(apiUrl + 'menu', options);
        if (!response.ok) {
            throw new Error('Could not fetch menu data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching menu data:", error);
    }
}

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    // increase its quantity
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // add it with quantity 1 If it doesn't exist, 
        cart.push({ ...item, quantity: 1 });
    }

    console.log(cart);
    populateCart(cart);
}

function populateMenu(menuData) {
    const wontonsMenu = document.querySelector(".wontons-menu");
    const dipsMenu = document.querySelector(".dips-selection");
    const drinksMenu = document.querySelector(".drink-selection");

    const wontonList = menuData.items.filter(item => item.type === "wonton");
    const dipsList = menuData.items.filter(item => item.type === "dip");
    const drinkList = menuData.items.filter(item => item.type === "drink");

    wontonList.forEach(wonton => {
        const newDiv = document.createElement("div");
        newDiv.innerHTML = `
        <div class="w-item">
            <div class="textorder">
                <span class="item-name">${wonton.name}</span>
                <span class="line"></span>
                <span class="item-price">${wonton.price} SEK</span>
            </div>
            <span class="item-details">${wonton.ingredients}</span>
        </div>`;

        newDiv.addEventListener("click", () => {
            addToCart(wonton);
        });

        wontonsMenu.append(newDiv);
    });

    dipsList.forEach(dip => {
        const newDiv = document.createElement("div");
        newDiv.innerHTML = `
        <input type="radio" name="dips">
        <label>${dip.name}</label>`;
        newDiv.classList.add("dip-btn");

        newDiv.addEventListener("click", () => {
            addToCart(dip);
        });

        dipsMenu.append(newDiv);
    });

    drinkList.forEach(drink => {
        const newDiv = document.createElement("div");
        newDiv.innerHTML = `
        <input type="radio" name="drinks">
        <label>${drink.name}</label>`;
        newDiv.classList.add("drink-btn");

        newDiv.addEventListener("click", () => {
            addToCart(drink);
        });

        drinksMenu.append(newDiv);
    });
}

async function initMenu() {
    const menuData = await fetchMenuData();
    if (menuData) {
        populateMenu(menuData);
    }
}

// DOM elements when the page loads
document.addEventListener("DOMContentLoaded", function () {
    initializeDOMElements();
    initMenu();
});

export { cart, cartCount, cartList };
