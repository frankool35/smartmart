export function filterProducts(products, category) {
    if (!category || category === "all") {
        return products;
    }

    return products.filter(
        (product) => product.category === category
    );
}
export function sortProducts(products, sortOption) {
    const sortedProducts = [...products];

    if (sortOption === "price-low") {
        return sortedProducts.sort(
            (a, b) => a.price - b.price
        );
    }

    if (sortOption === "price-high") {
        return sortedProducts.sort(
            (a, b) => b.price - a.price
        );
    }

    if (sortOption === "name") {
        return sortedProducts.sort(
            (a, b) => a.title.localeCompare(b.title)
        );
    }

    return sortedProducts;
}
