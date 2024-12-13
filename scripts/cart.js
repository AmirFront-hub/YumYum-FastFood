// Import cart from menu.js
import { cart } from "./menu.js"; // Assuming cart is in menu.js

const cartTotal = document.querySelector("#cart-total");
const cartCount = document.querySelector(".cart-count");
const shoppingList = document.querySelector(".shoppinglist");
const cartList = document.querySelector(".cart-list");
const newOrderButton = document.querySelector(".neworder-btn");


export function populateCart(cart) {
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const newDiv = document.createElement("div");
        total += item.price * item.quantity;

        newDiv.innerHTML = `
        <div class="cart-list">
            <span class="item-name">${item.name}</span>
            <span class="line"></span>
            <span class="item-price">${item.price * item.quantity} SEK</span>
        </div>`;

        const quantityContainer = document.createElement("div");
        const plusButton = document.createElement("button");
        const minusButton = document.createElement("button");
        const quantity = document.createElement("p");

        quantityContainer.classList.add("quantity-container");
        plusButton.classList.add("quantity-buttons");
        minusButton.classList.add("quantity-buttons");
        quantity.classList.add("quantity");

        plusButton.innerText = "+";
        minusButton.innerText = "-";
        quantity.innerText = `${item.quantity} stycken`;

        plusButton.addEventListener("click", () => {
            item.quantity += 1;
            updateCartDisplay();
        });

        minusButton.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                const index = cart.indexOf(item);
                if (index > -1) cart.splice(index, 1);
            }
            updateCartDisplay();
        });

        quantityContainer.append(minusButton, quantity, plusButton);
        newDiv.append(quantityContainer);
        cartList.append(newDiv);
    });
    cartTotal.innerText = total + " SEK";
    cartCount.textContent = cart.length;
}


newOrderButton.addEventListener("click", () => {

    cart.length = 0;
    cartCount.textContent = "0";
    shoppingList.innerHTML = "";   
    cartTotal.textContent = "0 SEK";

    const etaSection = document.querySelector("#eta-container");
    const menuContainer = document.querySelector(".menu-container");
    etaSection.classList.add("hidden");
    menuContainer.classList.remove("hidden");

    console.log("New order started! Returning to the menu...");
});

function updateCartDisplay() {populateCart(cart);
}
