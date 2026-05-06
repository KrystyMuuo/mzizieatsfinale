import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const getProductKey = (product) => {
    if (!product) return "unknown-item";
    return (
      product.cartKey ||
      product._id ||
      `${product.product_name || "item"}-${product.product_cost || 0}-${product.product_photo || "photo"}`
    );
  };

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      const parsed = JSON.parse(saved);
      const normalized = parsed.map((item) => ({
        ...item,
        cartKey: item.cartKey || getProductKey(item),
        quantity: item.quantity || 1
      }));
      setCart(normalized);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    if (!product) return;
    const productKey = getProductKey(product);
    setCart((prev) => {
      const exists = prev.find((item) => item.cartKey === productKey);
      if (exists) {
        return prev.map((item) =>
          item.cartKey === productKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          cartKey: productKey,
          quantity: 1
        }
      ];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.cartKey !== id));

  const updateQuantity = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prev) => prev.map((item) => (item.cartKey === id ? { ...item, quantity: qty } : item)));
  };

  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => cart.reduce((sum, item) => sum + item.product_cost * item.quantity, 0);
  const getItemQuantity = (product) => {
    const key = getProductKey(product);
    const found = cart.find((item) => item.cartKey === key);
    return found ? found.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getItemQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
