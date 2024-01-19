import axios from "../../axios";
import React, { useState } from "react";
import { IoReturnDownBackSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Login({ setIsLogin,  }) {
  const [username, setUserName] = useState(``);
  const [password, setPassword] = useState(``);
  const navigate = useNavigate();

  const login = async (e) => {
    try {
      e.preventDefault();
      
      const loginData = { username, password };
      const { data } = await axios.post(
        "/auth/login",
        loginData
      );
      localStorage.setItem("accessToken", data.data.token);
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login successfull.",
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
      });
    }
  };
  return (
    <div className="d-flex align-items-center" style={{width:"600px"}} >
      <div className="card-body p-4 p-lg-1 text-black" style={{height:"500px",background:"#0c0c0c"}}>
        <div
          style={{
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
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
        <form onSubmit={login} style={{display:"flex",flexDirection:"column", gap:"20px"}}>
          <div className="d-flex align-items-center">
            <i
              className="fas fa-cubes fa-2x me-3"
              style={{ color: "#ff6219" }}
            />
            <h3 className="fw-bold mb-0">Restaurant App</h3>
          </div>
          <h5 className="fw-normal " style={{ letterSpacing: 1 }}>
            Sign into your account
          </h5>
          <div className=" form-group">
            <label style={{color:"AppWorkspace"}}>User name</label>
            <input
              type="text"
              id="form2Example17"
              className="form-control form-control"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
            />
          </div>
          <div className=" form-group">
            <label style={{color:"AppWorkspace"}}>Password</label>
            <input
              type="password"
              id="form2Example27"
              className="form-control form-control"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <button className="btn btn-dark btn-md btn-block" type="submit">
              Login
            </button>
          </div>
          <div style={{ margin:"10px", color:"red" }}>
          <a className="small" href="#!" style={{ color:"red" }} >
            Forgot password?
          </a>
          </div>
          
          <p style={{ color: "white", margin:"2px" }}>
            Don't have an account?{" "}
            <b
              onClick={() => setIsLogin(false)}
              style={{ cursor: "pointer", color:"Highlight" }}
            >
              Register here
            </b>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
