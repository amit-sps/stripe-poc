import React, { useState } from "react";
import { IoMdRestaurant } from "react-icons/io";
import Login from "../components/login";
import Register from "../components/register";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section
      style={{
        backgroundColor: "#0c0c0c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight:"100vh"
      }}
    >
      <div className="card" style={{border:"none"}}>
          {/* <div
            className="col-md-6 col-lg-5 d-none d-md-block"
            style={{ margin: "auto",background:"#0c0c0c" }}
          >
            <IoMdRestaurant
              size={600}
              alt="login form"
              className="img-fluid"
              style={{ borderRadius: "1rem 0 0 1rem", color: "orange" }}
            />
          </div> */}
          {isLogin ? (
            <Login setIsLogin={setIsLogin} />
          ) : (
            <Register setIsLogin={setIsLogin} />
          )}
      </div>
    </section>
  );
}

export default Auth;
