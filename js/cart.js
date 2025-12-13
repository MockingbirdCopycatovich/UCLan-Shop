const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

burgerBtn.addEventListener("click", () => {
    mobileMenu.style.display =
        mobileMenu.style.display === "flex" ? "none" : "flex";
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let activeDiscount = null;
let finalTotal = 0;

const cartContainer = document.getElementById("cart-container");
const clearCartBtn = document.getElementById("clearCart");
const payBtn = document.getElementById("payBtn");

function renderCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach((item, index) => {
        const [name, color, price, availability, image, desc] = item.data;

        const card = document.createElement("div");
        card.classList.add("cart-item");

        card.innerHTML = `
            <img src="${image}" class="cart-item-img">

            <div class="cart-info">
                <h3>${name}</h3>
                <p>${desc}</p>
                <p>Color: <b>${color}</b></p>
                <p>Status: <b>${availability}</b></p>
                <p>Price: <b>${price}</b></p>
            </div>

            <div class="cart-actions">
                <div class="count-controls">
                    <button class="minus" data-id="${index}">-</button>
                    <span>${item.count}</span>
                    <button class="plus" data-id="${index}">+</button>
                </div>

                <button class="remove" data-id="${index}">Remove</button>
            </div>
        `;

        cartContainer.appendChild(card);
    });

    setListeners();
    updateTotal();
}

function setListeners() {
    document.querySelectorAll(".plus").forEach(btn =>
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            cart[id].count++;
            saveCart();
            renderCart();
        })
    );

    document.querySelectorAll(".minus").forEach(btn =>
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            if (cart[id].count > 1) cart[id].count--;
            saveCart();
            renderCart();
        })
    );

    document.querySelectorAll(".remove").forEach(btn =>
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            cart.splice(id, 1);
            saveCart();
            renderCart();
        })
    );
}

function updateTotal() {
    const totalElement = document.getElementById("total-price");

    let total = 0;
    cart.forEach(item => {
        let priceNum = Number(item.data[2].replace('£', ''));
        total += priceNum * item.count;
    });

    if (activeDiscount) {
        if (activeDiscount.type === "100percent") {
            total = total * (1 - activeDiscount.value / 100);
        }
    }

    finalTotal = total;
    totalElement.textContent = `Total: £${finalTotal.toFixed(2)}`;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

clearCartBtn.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
    updateTotal();
    activeDiscount = null;
    promoMessage.textContent = "";
    promoInput.value = "";
});

payBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const unavailable = cart.filter(item => item.data[2] === "Out of stock");

    if (unavailable.length > 0) {
        alert("Some items are out of stock. Purchase failed.");
        return;
    }

    alert(`Sum: £${finalTotal.toFixed(2)}`);
});

const promoInput = document.getElementById("promoInput");
const promoMessage = document.getElementById("promoMessage");
const applyPromoBtn = document.getElementById("applyPromo");

applyPromoBtn.addEventListener("click", () => {
    const code = promoInput.value.trim();

    if (code === "IWillGiveVlad100") {
        activeDiscount = { type: "100percent", value: 100 };
        promoMessage.textContent = "Promo applied: 100% off";
    } 
    else {
        activeDiscount = null;
        promoMessage.textContent = "Invalid promo code";
    }

    updateTotal();
});

renderCart();