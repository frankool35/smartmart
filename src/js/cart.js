import {
    getCart,
    removeFromCart,
    updateQuantity
} from "./cart-storage.js";

import { formatCurrency } from "./utils.js";

const cartItems = document.querySelector("#cart-items");
const cartSummary = document.querySelector("#cart-summary");

function displayCart() {
    const cart = getCart();

    if (cart.length === 0) {
        cartItems.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is currently empty.</p>
        <a href="../products/" class="btn">
          Continue Shopping
        </a>
      </div>
    `;

        cartSummary.innerHTML = "";
        return;
    }

    cartItems.innerHTML = cart.map((item) => `
    <article class="cart-item">
      <img
        src="${item.thumbnail}"
        alt="${item.title}"
      >

      <div class="cart-item-details">
        <h2>${item.title}</h2>

        <p>
          Price:
         ${formatCurrency(item.price)}
        </p>

        <div class="quantity-controls">
          <button
            type="button"
            class="quantity-btn"
            data-action="decrease"
            data-id="${item.id}"
          >
            −
          </button>

          <span class="quantity">
            ${item.quantity}
          </span>

          <button
            type="button"
            class="quantity-btn"
            data-action="increase"
            data-id="${item.id}"
          >
            +
          </button>
        </div>

        <p>
          Item Total:
          ${formatCurrency(item.price * item.quantity)}
        </p>

        <button
          class="btn remove-item"
          type="button"
          data-id="${item.id}"
        >
          Remove
        </button>
      </div>
    </article>
  `).join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    cartSummary.innerHTML = `
    <div class="cart-total">
      <h2>Cart Total</h2>

      <p>
       ${formatCurrency(total)}
      </p>

      <a href="../checkout/" class="btn">
        Proceed to Checkout
      </a>
    </div>
  `;

    const quantityButtons =
        document.querySelectorAll(".quantity-btn");

    quantityButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productId = Number(button.dataset.id);
            const action = button.dataset.action;

            const product = cart.find(
                (item) => item.id === productId
            );

            if (!product) {
                return;
            }

            let newQuantity = product.quantity;

            if (action === "increase") {
                newQuantity += 1;
            }

            if (action === "decrease") {
                newQuantity -= 1;
            }

            updateQuantity(productId, newQuantity);

            displayCart();
        });
    });

    const removeButtons =
        document.querySelectorAll(".remove-item");

    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productId = Number(button.dataset.id);

            removeFromCart(productId);

            displayCart();
        });
    });
}

displayCart();