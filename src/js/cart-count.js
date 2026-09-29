import { getCart } from "./cart-storage.js";

const cartCount = document.querySelector("#cart-count");

function updateCartCount() {
    if (!cartCount) {
        return;
    }

    const cart = getCart();

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    if (totalItems > 0) {
        cartCount.textContent = totalItems;
    } else {
        cartCount.textContent = "";
    }
}

updateCartCount();