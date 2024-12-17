import { cart, resetCart } from "./menu.js";

document.addEventListener("DOMContentLoaded", function () {
    const kvittoBtn = document.getElementById("kvitto-btn");
    const menuContainer = document.querySelector(".menu-container");
    const receiptContainer = document.querySelector(".receipt");
    const etaContainer = document.getElementById("eta-container");
    const cartContainer = document.querySelector(".cart-container");
    const newOrderBtns = document.querySelectorAll(".neworder-btn");
    const receiptDetails = document.getElementById("receipt-details");
    const receiptTotal = document.getElementById("receipt-total");

    function populateReceipt(cart) {
        receiptDetails.innerHTML = "";

        if (cart.length === 0) {
            receiptDetails.innerHTML = "<p>Your cart is empty!</p>";
            receiptTotal.innerText = "0 SEK";
            return;
        }

        let totalAmount = 0;

        cart.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("receipt-item");

            const itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;

            itemDiv.innerHTML = `
                <div class="cart-item">
                    <div class="textordercart">
                        <span class="item-name">${item.name}</span>
                        <span class="line2"></span>
                        <span class="item-price">${itemTotal} SEK</span>
                    </div>
                </div>`;

            const quantityContainer = document.createElement("div");
            const quantity = document.createElement("p");
            quantity.classList.add("quantity");

            quantity.innerText = `${item.quantity} stycken`;

            quantityContainer.classList.add("quantity-container2");
            quantityContainer.appendChild(quantity);

            itemDiv.appendChild(quantityContainer);
            receiptDetails.appendChild(itemDiv);
        });
        receiptTotal.innerText = `${totalAmount} SEK`;
    }

    if (kvittoBtn && menuContainer && receiptContainer && cartContainer && newOrderBtns) {
        kvittoBtn.addEventListener("click", function () {
            etaContainer.classList.add("hidden");
            menuContainer.classList.add("hidden");
            receiptContainer.classList.remove("hidden");
            cartContainer.classList.add("hidden");

            populateReceipt(cart);
        });

        newOrderBtns.forEach(button => {
            button.addEventListener("click", function () {
                etaContainer.classList.add("hidden");
                menuContainer.classList.remove("hidden");
                receiptContainer.classList.add("hidden");
                cartContainer.classList.add("hidden");

                resetCart();
            });
        });
    } else {
        console.error("One or more elements are missing from the DOM");
    }
});
