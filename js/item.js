const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

burgerBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});

const selected = sessionStorage.getItem("selectedItem");
const item = selected ? JSON.parse(selected) : null;

const container = document.getElementById("item-container");

if (!item) {
    container.innerHTML = "<p>Item not found.</p>";
} else {
    container.innerHTML = `
        <div class="item-card">
            <img src="${item[4]}" alt="${item[0]}">
            
            <div class="item-info">
                <h2>${item[0]}</h2>
                <p>Color: ${item[1]}</p>
                <p class="item-price" id="price">${item[2]}</p>
                <p class="item-desc">${item[5]}</p>
                <button class="add-cart-big">Add to Cart</button>
            </div>
        </div>
    `;
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-cart-big")) {

        let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

        const existingIndex = cart.findIndex(
            cartItem =>
                cartItem.data[0] === item[0] &&
                cartItem.data[1] === item[1]
        );

        if (existingIndex !== -1) {
            cart[existingIndex].count++;
        } else {
            cart.push({
                data: item,
                count: 1
            });
        }

        sessionStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart!");
    }
});