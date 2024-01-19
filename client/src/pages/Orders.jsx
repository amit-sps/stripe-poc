import axios from "../axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Cart from "../components/Carts";
import Navbar from "../components/Navbar";
import OrderList from "../components/OrderList";

function Orders({
  setShowCart,
  profile,
  carts,
  getCarts,
  showCart,
  getProfile,
  
}) {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      

      const { data } = await axios.get(`/orders/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      
      setOrders(data.data.orders);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <Navbar
        getCarts={getCarts}
        getProfile={getProfile}
        setShowCart={setShowCart}
        profile={profile}
        carts={carts}
      />
      <div className={showCart ? "" : "cartContainerHide"}>
        <Cart setShowCart={setShowCart} carts={carts} getCarts={getCarts} />
      </div>
      <div
        style={{
          padding: "20px",
          background: "#0c0c0c",
          minHeight: "84vh",
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        {orders.length>0?
        <>
        {orders.map((order, index) => (
          <OrderList order={order} index={index} />
        ))}
        </>
        :<div style={{minHeight:"350px",display:"flex",justifyContent:"center",alignItems:"center"}}><h1>Not orders yet (:</h1></div>
        }
        
      </div>
    </div>
  );
}

export default Orders;
