import React, { useEffect } from "react";
import { GiFoodTruck } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { IoMdCart } from "react-icons/io";
import { HiArrowNarrowRight } from "react-icons/hi";
import axios from "../../axios";
import Swal from "sweetalert2";

function Navbar({ profile, carts, setShowCart, getProfile, getCarts, }) {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const BillingPortal = async () => {
    try {

      
      const { data } = await axios.get(`/auth/customer/portal`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
        },
      });

      

      if (data?.data?.url) {
        window.location.href = data?.data?.url;
      }
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
  useEffect(() => {
    const token = localStorage.getItem(`accessToken`);
    if (token) {
      getProfile();
      getCarts();
    }
  }, []);
  return (
    <nav className="home_nav_container">
      <div className="logo">
        <Link to={"/"}>
          <GiFoodTruck size={100} color={"orange"} />
        </Link>
      </div>
      <ul className="menu">
        <li>
          <Link className="link" to={"food"}>
            Our Food
          </Link>
          <Link className="link" to={"mess"}>
            Join Mess
          </Link>
        </li>
      </ul>
      {profile ? (
        <div className="nav_login_container">
          <div className="cart-icon" onClick={() => setShowCart(true)}>
            <span className="cart-count">{carts.length}</span>
            <IoMdCart size={30} color="gold" />
          </div>{" "}
          <div class="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle link"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {profile?.username}
            </Link>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Link className="dropdown-item" onClick={() => BillingPortal()}>
                Billing management
              </Link>
              <Link className="dropdown-item" to={"/orders"}>
                Orders Management
              </Link>
            </div>
          </div>
          <Link className="link" onClick={logout}>
            Logout <HiArrowNarrowRight />
          </Link>
        </div>
      ) : (
        <div className="nav_login_container">
          <Link className="link" to={"/auth"}>
            Login / Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
