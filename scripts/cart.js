import { cart } from "./menu.js";
import { cartToSend } from "./menu.js";

const cartTotal = document.querySelector("#cart-total")

export function populateCart(cart) {
    const cartList = document.querySelector(".cart-list");
    let total = [];
    cart.forEach(item => {
        const newDiv = document.createElement("div");
		total.push(item.price)
        newDiv.innerHTML = `
		<div class="cart-list">
			<span class="item-name">${item.name}</span>
			<span class="line"></span>
			<span class="item-price">${item.price}</span>
		</div> `

		const plusButton = document.createElement("button");
		const minusButton = document.createElement("button");
		const quantity = document.createElement("p");
		const itemContainer = document.createElement("div");
		
        itemContainer.classList.add("item-container");
        quantity.classList.add("quantity");
        plusButton.classList.add("quantity-buttons");
        minusButton.classList.add("quantity-buttons");

		plusButton.innerText = "+";
		minusButton.innerText = "-";

		plusButton.addEventListener("click", () => plusItem);
		minusButton.addEventListener("click", () => removeItem);
        newDiv.append(minusButton);
        newDiv.append(plusButton);
        
    cartList.append(newDiv)
    cartTotal.innerText=total.reduce((a,b) => a + b, 0) + " SEK";
    })}