import React, { useEffect } from "react";
import Cart from "../components/Carts";
import FoodList from "../components/Foods";
import Mess from "../components/Mess";
import Navbar from "../components/Navbar";

function Home({ setShowCart, profile, carts, getCarts, showCart, getProfile,  }) {
 

  return (
    <div>
      <Navbar  getCarts={getCarts} getProfile={getProfile} setShowCart={setShowCart} profile={profile} carts={carts} />
      <FoodList  getCarts={getCarts}/>
      <Mess  />
      <div className={showCart ? "" : "cartContainerHide"}>
        <Cart  setShowCart={setShowCart} carts={carts} getCarts={getCarts} />
      </div>
    </div>
  );
}

export default Home;
