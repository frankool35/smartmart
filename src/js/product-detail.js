import { getProducts } from "./api.js";
import { addToCart } from "./cart-storage.js";
import { formatCurrency } from "./utils.js";

const productDetail = document.querySelector("#product-detail");

async function displayProduct() {
    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("id"));

    if (!productId) {
        productDetail.innerHTML = `
      <p>Product not found.</p>
      <a href="../products/" class="btn">Back to Products</a>
    `;
        return;
    }

    const products = await getProducts();

    const product = products.find((item) => item.id === productId);

    if (!product) {
        productDetail.innerHTML = `
      <p>Product not found.</p>
      <a href="../products/" class="btn">Back to Products</a>
    `;
        return;
    }

    productDetail.innerHTML = `
    <article class="product-detail-card">
      <div class="product-detail-image">
        <img
          src="${product.images[0]}"
          alt="${product.title}"
        >
      </div>

      <div class="product-detail-content">
        <p class="product-category">
          ${product.category}
        </p>

        <h2>${product.title}</h2>

        <p class="product-price">
          ${formatCurrency(product.price)}
        </p>

        <p>
          ${product.description}
        </p>

        <p>
          <strong>Rating:</strong>
          ${product.rating}
        </p>

        <p>
          <strong>Stock:</strong>
          ${product.stock}
        </p>

        <button
          id="add-to-cart"
          class="btn"
          type="button"
        >
          Add to Cart
        </button>
      </div>
    </article>
  `;

    const addButton = document.querySelector("#add-to-cart");

    addButton.addEventListener("click", () => {
        addToCart(product);

        addButton.textContent = "Added to Cart!";
    });
}

displayProduct();