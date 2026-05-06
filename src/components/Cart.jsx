import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const imagepath = "https://christabellhiggs.alwaysdata.net/static/images/";

  return (
    <div className="container mt-4">
      <h2 className="text-light text-center mb-3">My Cart</h2>
      {cart.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.cartKey} className="card mb-3 product-card cart-item-card" style={{ backgroundColor: "#bfecac" }}>
              <div className="row g-0">
                <div className="col-md-3">
                  <img src={imagepath + item.product_photo} alt={item.product_name} className="cart-image" />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h5>{item.product_name}</h5>
                    <p>{item.product_description}</p>
                    <b>Ksh {item.product_cost}</b>
                  </div>
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center p-2">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <button className="btn btn-sm btn-outline-dark" onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="btn btn-sm btn-outline-dark" onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}>+</button>
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.cartKey)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          <div className="card p-3 mt-3" style={{ backgroundColor: "#1a3c34", color: "white" }}>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <b>Total: Ksh {getTotalPrice()}</b>
              <button className="btn btn-warning" onClick={() => navigate("/makepayment", { state: { cartItems: cart } })}>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
