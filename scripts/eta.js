
const cartContainer = document.querySelector('.cart-container');
const etaContainer = document.querySelector('#eta-container');
const menuContainer = document.querySelector('.menu-container');
const payButton = document.querySelector('#pay-btn');
const newOrderButton = document.querySelector('.neworder-btn');

function showETAContainer() {
  cartContainer.classList.add('hidden');
  etaContainer.classList.remove('hidden');
  menuContainer.classList.add('hidden');
}

function showMenuContainer() {
  cartContainer.classList.add('hidden');
  etaContainer.classList.add('hidden');
  menuContainer.classList.remove('hidden');
}
payButton.addEventListener('click', showETAContainer);
newOrderButton.addEventListener('click', showMenuContainer);
