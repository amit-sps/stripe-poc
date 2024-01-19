import axios from "../../axios";
import React, { useState } from "react";
import { IoReturnDownBackSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Register({ setIsLogin, }) {
  const [username, setUsername] = useState(``);
  const [email, setEmail] = useState(``);
  const [phoneNumber, setPhoneNumber] = useState(``);
  const [password, setPassword] = useState(``);
  const navigate = useNavigate();

  const register = async (e) => {
    try {
      e.preventDefault();

      
       
      const registerData = { username, email, phoneNumber, password };
      const { data } = await axios.post(
        "/auth/register",
        registerData
      );
      localStorage.setItem("accessToken", data.data.token);

      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Account created successfully.",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => navigate("/"));
    } catch (error) {

      
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          })
    }
  };
  return (
    <div className="d-flex align-items-center" style={{width:"600px"}} >
    <div className="card-body p-4 p-lg-1 text-black" style={{height:"500px",background:"#0c0c0c"}}>
      <div
        style={{
          padding: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          gap:"20px"
        }}
      >
        <Link to="/">
          <IoReturnDownBackSharp
            size={50}
            color={"green"}
            cursor={"pointer"}
          />
        </Link>
      </div>
        <form onSubmit={register}>
          <div className="d-flex align-items-center" style={{ gap:"30px"}}>
            <i
              className="fas fa-cubes fa-2x me-3"
              style={{ color: "#ff6219" }}
            />
            <h3 className="fw-bold mb-0">Restaurant App</h3>
          </div>
          <h5 className="fw-normal" style={{ letterSpacing: 1 }}>
            Register your account
          </h5>
          <div className=" form-group">
            <label style={{color:"AppWorkspace"}}>User name</label>
            <input
              type="text"
              id="form2Example17"
              className="form-control form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label style={{color:"AppWorkspace"}}>Email</label>
            <input
              type="email"
              id="form2Example17"
              className="form-control form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="form-group">
            <label style={{color:"AppWorkspace"}}>Mobile</label>
            <input
              type="text"
              id="form2Example17"
              className="form-control form-control"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </div>
          <div className="form-group">
            <label style={{color:"AppWorkspace"}} htmlFor="form2Example27">Password</label>
            <input
              type="password"
              id="form2Example27"
              className="form-control form-control"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="pt-1">
            <button className="btn btn-dark btn-md btn-block" type="submit">
              Register
            </button>
          </div>
          <p className="" style={{ color: "white", margin:"25px" }}>
            Have an account?{" "}
            <b
              onClick={() => setIsLogin(true)}
              style={{ cursor: "pointer", color:"Highlight" }}
            >
              Login here
            </b>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
