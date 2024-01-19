import React from "react";
import "./mess.css";
import { PiCurrencyInr } from "react-icons/pi";
import { useState } from "react";
import axios from "../../axios";
import { useEffect } from "react";
import Swal from "sweetalert2";

function Mess({}) {
  const [mess, setMess] = useState([]);

  const joinMess = async (id) => {
    try {

      

      const { data } = await axios.post(
        `/mess/join/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
          },
        }
      );

      

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

  const getMessData = async () => {
    try {

      
      const { data } = await axios.get(`/mess`);

      
      setMess(data.data.mess);
    } catch (error) {

      
      setMess([]);
    }
  };

  useEffect(() => {
    getMessData();
  }, []);
  return (
    <div className="foodListContainer" id="mess" name="food">
      <div className="heading">
        <h2 className="menu-title">Mess plan</h2>
      </div>
      <div className="food_menu_block">
        {mess.map((data, inx) => (
          <div className="food_menu_content" id={inx}>
            <div>
              <div className="dish-img">
                <img src={data.image} className="img-circle" />
              </div>
              <div className="dish-content">
                <h5 className="dish-title">{data.messType}</h5>
                {/* <span className="dish-meta">Onion / Tomato</span> */}
                <div className="dish-price">
                  <p>
                    <PiCurrencyInr />
                    {data.amount} - {data.paymentType}
                  </p>
                </div>
              </div>
              <div className="cartButtonContainer">
                <button
                  className="cartButton"
                  onClick={() => joinMess(data._id)}
                >
                  Join Mess
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mess;
