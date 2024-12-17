import { populateCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", function () {
    const kvittoBtn = document.getElementById("kvitto-btn");
    const menuContainer = document.querySelector(".menu-container");
    const receiptContainer = document.querySelector(".receipt");
    const etaContainer = document.getElementById("eta-container");
    const cartContainer = document.querySelector(".cart-container");
    const newOrderBtns = document.querySelectorAll(".neworder-btn");

    if (kvittoBtn && menuContainer && receiptContainer && cartContainer && newOrderBtns) {
        kvittoBtn.addEventListener("click", function () {
            etaContainer.classList.add("hidden");
            menuContainer.classList.add("hidden");
            receiptContainer.classList.remove("hidden");
            cartContainer.classList.add("hidden");
        });

        newOrderBtns.forEach(button => {
            button.addEventListener("click", function () {
                etaContainer.classList.add("hidden");
                menuContainer.classList.remove("hidden");
                receiptContainer.classList.add("hidden");
                cartContainer.classList.add("hidden");
                populateCart([]);
            });
        });
    } else {
        console.error("One or more elements are missing from the DOM");
    }
});
