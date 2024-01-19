// import logo from './logo.svg';
import "./App.css";

import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import { useState } from "react";
import axios from "./axios";

function App() {
  const [profile, setProfile] = useState(null);
  const [carts, setCarts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const getProfile = async () => {
    try {
      const { data } = await axios.get(`/auth/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
      },
    });
    setProfile(data.data.user);
    } catch (error) {
      localStorage.clear();
    }
    
  };

  const getCarts = async () => {
    try {
      const { data } = await axios.get(`/carts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
      },
    });
    setCarts(data?.data?.carts[0]?.products || []);
    } catch (error) {
      
    }
    
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              getProfile={getProfile}
              setShowCart={setShowCart}
              profile={profile}
              showCart={showCart}
              carts={carts}
              getCarts={getCarts}
            />
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/profile"
          element={
            <Profile
              getProfile={getProfile}
              setShowCart={setShowCart}
              profile={profile}
              showCart={showCart}
              carts={carts}
              getCarts={getCarts}
            />
          }
        />
        <Route
          path="/orders"
          element={
            <Orders
              getProfile={getProfile}
              setShowCart={setShowCart}
              profile={profile}
              showCart={showCart}
              carts={carts}
              getCarts={getCarts}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
