import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import { IoTrashBinSharp } from "react-icons/io5";
import { PiCurrencyInr } from "react-icons/pi";

function CartList({ cart, removeFromQuantity, incQuantity, descQuantity, inx }) {
  return (
    <div className="card mb-3" id={inx}>
      <div className="d-flex justify-content-between card_list_container">
        <div>
          <img
            src={cart.image}
            className="img-fluid rounded-3"
            alt="Shopping item"
            style={{ width: 65 }}
          />
        </div>
        <div className="ms-3" style={{ width: "80px" }}>
          <b className="small mb-0">{cart.name}</b>
        </div>
        <GrSubtractCircle
          onClick={() => descQuantity(cart._id)}
          size={20}
          cursor="pointer"
          color="orange"
        />
        <b className="fw-normal mb-0">{cart.quantity}</b>
        <IoMdAddCircleOutline
          onClick={() => incQuantity(cart._id)}
          size={20}
          cursor="pointer"
          color="green"
        />
        <div style={{ width: 80 }}>
          <b className="mb-0">
            <PiCurrencyInr />
            {cart.price}
          </b>
        </div>
        <div className="">
          <a href="#!" style={{ color: "red", marginRight: "5px" }}>
            <IoTrashBinSharp
              onClick={() => removeFromQuantity(cart._id)}
              size={20}
              cursor="pointer"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default CartList;
