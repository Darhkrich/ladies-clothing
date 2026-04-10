import { getCart, clearCart } from "./cartStore";

export const checkoutWhatsApp = () => {
  const phone = "233559423149";

  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  const items = cart
    .map(
      (item) =>
        `- ${item.name} x${item.quantity} (GH₵${item.price * item.quantity})`
    )
    .join("\n");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const message = `Hello, I want to order:\n\n${items}\n\nTotal: GH₵${total}`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  // ✅ Open WhatsApp
  window.open(url, "_blank");

  // 🔥 CLEAR CART AFTER ORDER
  clearCart();
};