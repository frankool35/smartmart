import { getProducts } from "./api.js";
import { getCart } from "./cart-storage.js";
import { formatCurrency } from "./utils.js";

const featuredProducts =
  document.querySelector("#featured-products");

const cartCount =
  document.querySelector("#cart-count");

function updateCartCount() {
  if (!cartCount) {
    return;
  }

  const cart = getCart();

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartCount.textContent =
    totalItems > 0 ? `(${totalItems})` : "";
}

async function loadFeaturedProducts() {
  featuredProducts.innerHTML = `
    <p class="loading-message">
      Loading featured products...
    </p>
  `;

  const products = await getProducts();

  if (!products.length) {
    featuredProducts.innerHTML = `
      <p class="loading-message">
        Featured products are currently unavailable.
      </p>
    `;
    return;
  }

  const featured = products.slice(0, 4);

  featuredProducts.innerHTML = featured.map((product) => `
    <article class="product-card">

      <img
        src="${product.thumbnail}"
        alt="${product.title}"
      >

      <div class="product-card-content">

        <h2>${product.title}</h2>

        <p class="product-price">
          ${formatCurrency(product.price)}
        </p>

        <p>
          ${product.description}
        </p>

        <a
          href="./product/?id=${product.id}"
          class="btn"
        >
          View Product
        </a>

      </div>

    </article>
  `).join("");
}

updateCartCount();
loadFeaturedProducts();