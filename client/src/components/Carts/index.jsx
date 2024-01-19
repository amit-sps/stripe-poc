import React from "react";
import CartList from "../CartList";
import "./carts.css";
import Swal from "sweetalert2";
import axios from "../../axios";
import { PiCurrencyInr } from "react-icons/pi";

function Cart({ setShowCart, carts, getCarts,  }) {
  const calculateTotal = () =>
    carts.reduce(
      (total, product) =>
        (total += Number(product.quantity) * Number(product.price || 0)),
      0
    );

  const checkoutOrder = async () => {
    try {
      const { data } = await axios(`/checkout/orders/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
        },
      });
      window.location.href = data.data.url;
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const incQuantity = async (cartId) => {
    try {
      
      const { data } = await axios.put(
        `/carts/quantity/inc/${cartId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
          },
        }
      );

      getCarts();
      
    } catch (error) {
      
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };
  const descQuantity = async (cartId) => {
    try {
      
      const { data } = await axios.put(
        `/carts/quantity/desc/${cartId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
          },
        }
      );

      getCarts();
      
    } catch (error) {
      
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const removeFromQuantity = async (cartId) => {
    try {
      
      const { data } = await axios.delete(
        `/carts/remove/${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
          },
        }
      );

      getCarts();
      
    } catch (error) {
      
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="cartListContainer">
      <div style={{ textAlign: "center" }}>
        <h3>Cart List ({carts.length})</h3>
      </div>
      <div style={{ margin: "15px" }} className="list_container">
        {carts.map((cart, inx) => (
          <CartList
            cart={cart}
            incQuantity={incQuantity}
            descQuantity={descQuantity}
            removeFromQuantity={removeFromQuantity}
            inx={inx}
          />
        ))}
        <div
          class="d-flex justify-content-between p-2 mb-2"
          style={{ backgroundColor: "#e1f5fe" }}
        >
          <h5 class="fw-bold mb-0">Total:</h5>
          <h5 class="fw-bold mb-0 green">
            <PiCurrencyInr />
            {calculateTotal()}
          </h5>
        </div>
      </div>
      <div className="cartButtonContainer">
        <button onClick={() => setShowCart(false)}>Close</button>
        <button onClick={checkoutOrder}>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
