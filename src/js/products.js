import { getProducts } from "./api.js";
import { searchProducts } from "./search.js";
import {
    filterProducts,
    sortProducts
} from "./filter.js";
import { getExchangeRates } from "./currency.js";
import { formatCurrency } from "./utils.js";

const productList = document.querySelector("#product-list");
const searchInput = document.querySelector("#search");
const categoryFilter = document.querySelector("#category-filter");
const sortProductsSelect = document.querySelector("#sort-products");
const currencyRate = document.querySelector("#currency-rate");

let allProducts = [];

function displayProducts(products) {
    if (!products.length) {
        productList.innerHTML = `
      <p>No products found. Try a different search or category.</p>
    `;
        return;
    }

    productList.innerHTML = products.map((product) => `
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
          href="../product/?id=${product.id}"
          class="btn"
        >
          View Product
        </a>
      </div>
    </article>
  `).join("");
}

function populateCategories(products) {
    const categories = [
        ...new Set(products.map((product) => product.category))
    ].sort();

    categories.forEach((category) => {
        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);
    });
}

function updateProducts() {
    let filteredProducts = searchProducts(
        allProducts,
        searchInput.value
    );

    filteredProducts = filterProducts(
        filteredProducts,
        categoryFilter.value
    );

    filteredProducts = sortProducts(
        filteredProducts,
        sortProductsSelect.value
    );

    displayProducts(filteredProducts);
}

async function displayCurrencyRate() {
    const rates = await getExchangeRates();

    if (!rates || !rates.NGN) {
        currencyRate.textContent =
            "Exchange rate currently unavailable.";
        return;
    }

    currencyRate.textContent =
        `Current exchange rate: $1 USD = ₦${rates.NGN.toFixed(2)} NGN`;
}

async function loadProducts() {
    productList.innerHTML = `
<p class="loading-message">Loading products...</p>
  `;

    allProducts = await getProducts();

    if (!allProducts.length) {
        productList.innerHTML = `
      <p>Sorry, we could not load the products.</p>
    `;
        return;
    }

    populateCategories(allProducts);

    displayProducts(allProducts);
    displayCurrencyRate();
}

searchInput.addEventListener("input", updateProducts);

categoryFilter.addEventListener(
    "change",
    updateProducts
);

sortProductsSelect.addEventListener(
    "change",
    updateProducts
);

loadProducts();