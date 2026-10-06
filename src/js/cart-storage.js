const CART_KEY = "smartmart-cart";

export function getCart() {
    const cart = localStorage.getItem(CART_KEY);

    return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product) {
    const cart = getCart();

    const existingProduct = cart.find(
        (item) => item.id === product.id
    );

    const discount = Number(product.discountPercentage) || 0;

    const discountedPrice =
        product.price * (1 - discount / 100);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: discountedPrice,
            originalPrice: product.price,
            discountPercentage: discount,
            thumbnail: product.thumbnail,
            quantity: 1
        });
    }

    saveCart(cart);
}

export function updateQuantity(productId, quantity) {
    const cart = getCart();

    const product = cart.find(
        (item) => item.id === productId
    );

    if (!product) {
        return;
    }

    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    product.quantity = quantity;

    saveCart(cart);
}

export function removeFromCart(productId) {
    const cart = getCart();

    const updatedCart = cart.filter(
        (item) => item.id !== productId
    );

    saveCart(updatedCart);
}

export function clearCart() {
    localStorage.removeItem(CART_KEY);
}