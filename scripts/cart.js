import { cart } from "./menu.js";
import { cartToSend } from "./menu.js";

const cartTotal = document.querySelector("#cart-total");
const paybtn = document.querySelector("#pay-btn");

export function populateCart(cart, cartToSend) {
    const cartList = document.querySelector(".cart-list");
    cartList.innerHTML = "";

    let total = [];

    cart.forEach(item => {
        const newDiv = document.createElement("div");
        total.push(item.price * item.quantity);

        newDiv.innerHTML = `
        <div class="cart-list">
            <span class="item-name">${item.name}</span>
            <span class="line"></span>
            <span class="item-price">${item.price * item.quantity} SEK</span>
        </div>`;

        const itemContainer = document.createElement("div");
        const itemTitle = document.createElement("h3");
        const itemPrice = document.createElement("h3");
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

    cartTotal.innerText = total.reduce((a, b) => a + b, 0) + " SEK";
}


function updateCartDisplay() {
    document.querySelector(".cart-list").innerHTML = "";
    populateCart(cart, cartToSend); 
}
