import React from "react";
import "./orderlist.css";
import { PiCurrencyInr } from "react-icons/pi";

function OrderList({ order, index }) {
  return (
    <div className="orderCard">
      <div className="title">Reciept {index+1}</div>
      <div className="info">
        <div className="row">
          <div className="col-7">
            <span id="heading">Date</span>
            <br />
            <span id="details">{new Date(order.createdAt).toDateString()}</span>
          </div>
          <div className="col-5 pull-right">
            <span id="heading">Order No.</span>
            <br />
            <span id="details">{order._id}</span>
          </div>
        </div>
      </div>
      <div className="pricing">
        {order.items.map((item, inx) => (
          <div className="row" id={inx}>
            <div className="col-9">
              <img
                src={item.image}
                className="img-fluid rounded-3"
                alt="Shopping item"
                style={{ width: 65 }}
              />
              <span id="name"> {item.name}</span>
            </div>
            <div className="col-3">
              <span id="price">
                <PiCurrencyInr />
                {item.price} * {item.quantity} = <PiCurrencyInr />
                {item.price * item.quantity}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="total">
        <div className="row">
          <div className="col-9" />
          <div className="col-3">
            <big>
              Total: <PiCurrencyInr />
              {order.totalAmount}
            </big>
          </div>
        </div>
      </div>
      <div className="tracking">
        <div className="title">Tracking Order</div>
      </div>
      <div className="progress-track">
        <ul id="progressbar">
          <li className="step0 active " id="step1">
            Ordered
          </li>
          <li className="step0 active text-center" id="step2">
            Shipped
          </li>
          <li className="step0 text-right" id="step3">
            On the way
          </li>
          <li className="step0 text-right" id="step4">
            Delivered
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OrderList;
