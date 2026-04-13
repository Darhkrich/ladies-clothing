// lib/whatsapp.js
import { getCart, clearCart } from "./cartStore";

const phone = "233559423149";

export const checkoutWhatsApp = (onSuccess) => {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  const message = formatOrderMessage();
  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, "_blank");

  clearCart(); // Clears localStorage and dispatches event

};

/**
 * Formats cart items into a readable WhatsApp message
 * @returns {string} Formatted order message
 */
const formatOrderMessage = () => {
  const cart = getCart();

  if (cart.length === 0) return "";

  const items = cart
    .map((item) => {
      const variantInfo = item.selectedColor ? ` [${item.selectedColor}]` : "";
      const lineTotal = (item.price * item.quantity).toFixed(2);
      return `• ${item.name}${variantInfo} × ${item.quantity} — GH₵${lineTotal}`;
    })
    .join("\n");

  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const message = ` *New Order Request*%0A%0A${items}%0A%0A *Total Items:* ${itemCount}%0A *Total Amount:* GH₵${total}%0A%0A*`;

  return message;
};

/**
 * Initiates WhatsApp checkout process
 * @param {Object} options - Optional configuration
 * @param {boolean} options.clearAfter - Whether to clear cart after opening WhatsApp (default: true)
 */

/**
 * Alternative: Checkout with custom message (e.g., including customer name)
 * @param {string} customerName - Optional customer name
 * @param {string} customerLocation - Optional delivery location
 */
export const checkoutWhatsAppWithDetails = (customerName = "", customerLocation = "") => {
  const phone = "233559423149";
  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty. Add some items first!");
    return;
  }

  const items = cart
    .map((item) => {
      const variant = item.selectedColor ? ` [${item.selectedColor}]` : "";
      return `• ${item.name}${variant} × ${item.quantity} — GH₵${(item.price * item.quantity).toFixed(2)}`;
    })
    .join("\n");

  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

 

  const message = `*Hi I want to order *%0A%0A${items}%0A%0A *Total:* GH₵${total}${detailsSection}`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
  clearCart();
};