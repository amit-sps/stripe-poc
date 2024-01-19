import React from "react";
import Cart from "../components/Carts";
import Navbar from "../components/Navbar";

function Profile({ setShowCart, profile, carts, getCarts, showCart, getProfile }) {
  return (
    <div>
      <Navbar getCarts={getCarts} getProfile={getProfile} setShowCart={setShowCart} profile={profile} carts={carts} />

      <div className={showCart ? "" : "cartContainerHide"}>
        <Cart setShowCart={setShowCart} carts={carts} getCarts={getCarts} />
      </div>
    </div>
  );
}

export default Profile;
