export function searchProducts(products, searchTerm) {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
        return products;
    }

    return products.filter((product) =>
        product.title.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.tags?.some((tag) =>
            tag.toLowerCase().includes(term)
        )
    );
}