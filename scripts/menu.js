import { populateCart } from "./cart.js";

const apiUrl = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/";
const menuElement = document.getElementById('menu-items');

let cart = [];
let cartToSend = [];

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
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
        cartToSend.push(item.id);
    }
    console.log(cart);
    populateCart(cart, cartToSend);
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
            <span class="item-name">${wonton.name}</span>
            <span class="line"></span>
            <span class="item-price">${wonton.price} SEK</span><br>
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

populateMenu(await fetchMenuData());

export { cart, cartToSend };