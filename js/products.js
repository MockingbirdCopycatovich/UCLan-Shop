const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

burgerBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});

// array indexed as follows: [0]name, [1]color, [2]price, [3]stock [4]image-src, [5]desc.

const tshirts = [
    ['Legacy T-Shirt','Red','£7.99','good-stock','../media/images/tshirts/tshirt1.jpg','Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
    ['Legacy T-Shirt','Green','£7.99','last-few','../media/images/tshirts/tshirt2.jpg','Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
    ['Legacy T-Shirt','Blue','£7.99','out-of-stock','../media/images/tshirts/tshirt3.jpg','Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
    ['Legacy T-Shirt','Cyan','£7.99','good-stock','../media/images/tshirts/tshirt4.jpg','Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
    ['Legacy T-Shirt','Magenta','£7.99','out-of-stock','../media/images/tshirts/tshirt5.jpg','Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
    ['Legacy T-Shirt','Yellow','£7.99','last-few','../media/images/tshirts/tshirt6.jpg','Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
    ['Legacy T-Shirt','Black','£7.99','out-of-stock','../media/images/tshirts/tshirt7.jpg','Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
    ['Legacy T-Shirt','Grey','£7.99','good-stock','../media/images/tshirts/tshirt8.jpg','Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
    ['Legacy T-Shirt','Burgundy','£7.99','last-few','../media/images/tshirts/tshirt9.jpg','Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
];

const productsContainer = document.getElementById("products-container");
const filterButtons = document.querySelectorAll(".filter-btn");


let activeFilters = new Set(["all"]);

function renderProducts() {
    productsContainer.innerHTML = "";

    tshirts.forEach((item, index) => {
        if (activeFilters.has("all") || activeFilters.has(item[3])) {
            createCard(item, index);
        }
    });
}

function createCard(item, index) {
    const product = document.createElement("div");
    product.classList.add("product-card");
    product.classList.add(item[3]);

    product.innerHTML = `
        <img src="${item[4]}" alt="${item[0]}">
        <h3>${item[0]}</h3>
        <p><br></p>
        <p>Color: ${item[1]}</p>
        <p>${item[5]}</p>

        <a href="item.html" class="read-more" data-id="${index}">Read more</a>

        <p id="price">${item[2]}</p>

        <div class="card-buttons">
            <button class="add-cart" data-id="${index}">Add to Cart</button>
        </div>
    `;

    productsContainer.appendChild(product);
}

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        if (filter === "all") {
            activeFilters = new Set(["all"]);
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderProducts();
            return;
        }

        activeFilters.delete("all");
        document.querySelector('[data-filter="all"]').classList.remove("active");

        if (activeFilters.has(filter)) {
            activeFilters.delete(filter);
            btn.classList.remove("active");
        } else {
            activeFilters.add(filter);
            btn.classList.add("active");
        }

        if (activeFilters.size === 0) {
            activeFilters.add("all");
            document.querySelector('[data-filter="all"]').classList.add("active");
        }

        renderProducts();
    });
});

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("read-more")) {
        const id = event.target.dataset.id;
        localStorage.setItem("selectedItem", JSON.stringify(tshirts[id]));
    }
});

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-cart")) {

        const index = event.target.dataset.id;
        const item = tshirts[index];

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push({
            data: item,
            count: 1
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart!");
    }
});

renderProducts();