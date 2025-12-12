const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

burgerBtn.addEventListener("click", () => {
    mobileMenu.style.display =
        mobileMenu.style.display === "flex" ? "none" : "flex";
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

        cart.push({
            name: item[0],
            color: item[1],
            price: item[2],
            stock: item[3],
            image: item[4],
            desc: item[5]
        });
        sessionStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart!");
    }
});
