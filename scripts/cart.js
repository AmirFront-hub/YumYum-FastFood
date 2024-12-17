import { cart } from "./menu.js";

const cartTotal = document.querySelector("#cart-total");
const cartCount = document.querySelector(".cart-count");
const cartButton = document.querySelector(".cart-container #cart-btn");
const shoppingList = document.querySelector(".shoppinglist");
const cartList = document.querySelector(".cart-list");
const newOrderButton = document.querySelector(".neworder-btn");
const payButton = document.querySelector(".pay-btn");

export function populateCart(cart = []) {
    if (!Array.isArray(cart)) {
        console.error("Invalid cart data");
        return;
    }
    if (!cartList || !cartTotal || !cartCount || !payButton) {
        console.error("Missing essential DOM elements");
        return;
    }
    cartList.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = "<p>Your cart is empty!</p>";
        payButton.disabled = true;
    } else {
        cart.forEach((item, index) => {
            if (!item.name || !item.price || item.quantity == null) {
                console.error(`Invalid item at index ${index}:`, item);
                return;
            }

            const newDiv = document.createElement("div");
            total += item.price * item.quantity;

            newDiv.innerHTML = `
            <div class="cart-item">
                <div class="textordercart">
                    <span class="item-name">${item.name}</span>
                    <span class="line2"></span>
                    <span class="item-price">${item.price * item.quantity} SEK</span>
                </div>
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
        payButton.disabled = false;
    }

    cartTotal.innerText = total + " SEK";

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    console.log("Cart updated:", cart);
}

newOrderButton.addEventListener("click", () => {
    cart.length = 0;
    cartCount.textContent = "0";
    shoppingList.innerHTML = "";
    cartList.innerHTML = "<p>Your cart is empty!</p>";
    cartTotal.textContent = "0 SEK";
    payButton.disabled = true;

    const etaSection = document.querySelector("#eta-container");
    const menuContainer = document.querySelector(".menu-container");
    etaSection.classList.add("hidden");
    menuContainer.classList.remove("hidden");

    console.log("New order started! Returning to the menu...");
});

function updateCartDisplay() {
    populateCart(cart);
}
