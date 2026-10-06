import { getCart, clearCart } from "./cart-storage.js";
import { validateCheckoutForm } from "./validation.js";
import { formatCurrency } from "./utils.js";

const checkoutForm = document.querySelector("#checkout-form");
const orderSummary = document.querySelector("#order-summary");

const TAX_RATE = 0.075;
const SHIPPING_COST = 10;

function displayOrderSummary() {
    const cart = getCart();

    if (cart.length === 0) {
        orderSummary.innerHTML = `
      <h2>Order Summary</h2>

      <p>Your cart is empty.</p>

      <a href="../products/" class="btn">
        Continue Shopping
      </a>
    `;

        checkoutForm.style.display = "none";
        return;
    }

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + SHIPPING_COST;

    orderSummary.innerHTML = `
    <h2>Order Summary</h2>

    <div class="summary-items">
      ${cart.map((item) => `
        <div class="summary-item">
          <span>
            ${item.title} × ${item.quantity}
          </span>

          <span>
           ${formatCurrency(item.price * item.quantity)}
          </span>
        </div>
      `).join("")}
    </div>

    <div class="summary-line">
      <span>Subtotal</span>
      <span>${formatCurrency(subtotal)}</span>
    </div>

    <div class="summary-line">
      <span>Tax (7.5%)</span>
      <span>${formatCurrency(tax)}</span>
    </div>

    <div class="summary-line">
      <span>Shipping</span>
      <span>${formatCurrency(SHIPPING_COST)}></span>
    </div>

    <div class="summary-total">
      <strong>Total</strong>
      <strong>${formatCurrency(total)}</strong>
    </div>
  `;
}

checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const errorMessage = validateCheckoutForm(checkoutForm);

    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    const cart = getCart();

    if (cart.length === 0) {
        return;
    }

    clearCart();

    window.location.href = "../success/";
});

displayOrderSummary();