const menuSection = document.querySelector(".menu-container");
const cartSection = document.querySelector(".cart-container");
const cartButtons = document.querySelectorAll("#cart-btn");

cartButtons.forEach((cartButton) => {
  cartButton.addEventListener("click", () => {
    menuSection.classList.toggle("hidden");
    cartSection.classList.toggle("hidden");
  });
});
