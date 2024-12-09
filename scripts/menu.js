const apiUrl = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/";
const menuElement = document.getElementById('menu-items');
async function fetchMenuData() {
    const options = {
        method: "GET",
        headers:{
            "x-zocom": "yum-4wOFSa0vV0WtlFYK"
        }
    }
    try {
        const response = await fetch(apiUrl + 'menu',options);
        if (!response.ok) {
            throw new Error('could not fetch');
        }
        const data = await response.json();
        return data

    } catch (error){
        console.error("error fetching menu data", error)
    }
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
			<span class="item-price">${wonton.price}</span> <br>
			<span class="item-details">${wonton.ingredients}</span>
		</div> `

		newDiv.addEventListener("click", () => {
            addToCart(wonton, newDiv);
        });

    wontonsMenu.append(newDiv)
    })

    dipsList.forEach(
        dip => {
            const newDiv2 = document.createElement("div");
            newDiv2.innerHTML =`
            <input type="radio" name="dips">
            <label for="">${dip.name}</label>`
            newDiv2.classList.add("dip-btn")

			newDiv2.addEventListener("click", () => {
				addToCart(dip, newDiv2);
			});

			dipsMenu.append(newDiv2);})

    drinkList.forEach(
        drink => {
            const newDiv3 = document.createElement("div");
            newDiv3.innerHTML = `
            <input type="radio" name="drinks">
            <label for="">${drink.name}</label>`
            newDiv3.classList.add("drink-btn")

			newDiv3.addEventListener("click", () => {
				addToCart(drink, newDiv3);
			});
	
    	drinksMenu.append(newDiv3)})
}
populateMenu(await fetchMenuData());