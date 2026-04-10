const CART_KEY = "cart";

// ✅ Get cart safely
export const getCart = () => {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// ✅ Save cart safely
export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  // 🔥 Trigger UI updates everywhere
  window.dispatchEvent(new Event("cartUpdated"));
};

// ✅ Add to cart (NO duplicates)
export const addToCart = (product) => {
  const cart = getCart();

  const index = cart.findIndex((item) => item.id === product.id);

  if (index !== -1) {
    // Increase quantity
    cart[index] = {
      ...cart[index],
      quantity: cart[index].quantity + 1,
    };
  } else {
    // Add new item
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  saveCart(cart);
};

// ✅ Remove item completely
export const removeFromCart = (id) => {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
};

// ✅ Update quantity safely
export const updateQuantity = (id, type) => {
  let cart = getCart();

  cart = cart.map((item) => {
    if (item.id === id) {
      const newQty =
        type === "inc"
          ? item.quantity + 1
          : Math.max(1, item.quantity - 1);

      return {
        ...item,
        quantity: newQty,
      };
    }
    return item;
  });

  saveCart(cart);
};

// ✅ Optional helper (not required but useful)
export const clearCart = () => {
  localStorage.removeItem("cart");
  window.dispatchEvent(new Event("cartUpdated"));
};