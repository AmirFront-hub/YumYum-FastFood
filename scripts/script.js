window.addEventListener('load', function() {
    const payButton = document.querySelector(".pay-btn");
    const cartSection = document.querySelector(".cart-container");
    const etaSection = document.querySelector("#eta-container");
    const orderNumber = document.querySelector(".order-number");
    const menuContainer = document.querySelector(".menu-container");

    
    if (payButton && cartSection && etaSection && orderNumber && menuContainer) {
        
        payButton.addEventListener("click", () => {
            cartSection.classList.add("hidden");
            etaSection.classList.remove("hidden");
            orderNumber.textContent = `#${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
            console.log("Order finalized! Transitioning to ETA screen...");
        });
    } else {
        console.error("One or more elements are missing from the DOM");
    }
});
