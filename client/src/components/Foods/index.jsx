import axios from "../../axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./food.css";
import { PiCurrencyInr } from "react-icons/pi";

function FoodList({ getCarts,  }) {
  const [products, setProducts] = useState([]);
  const fetchProduct = async () => {
    await axios(
      "https://api.spoonacular.com/food/search?offset=606&number=300&apiKey=4965b72677b84e0fb9e79d34a55d335f"
    );
    const data = await axios(`/products`);

    setProducts(data.data.data);
  };

  const addToCart = async (productId) => {
    try {
      
      const { data } = await axios.patch(
        "/carts/add",
        { product: productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
          },
        }
      );
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        getCarts();
      });
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
    fetchProduct();
  }, []);
  return (
    <div className="foodListContainer" id="food" name="food">
      <div className="heading">
        <h2 className="menu-title">Food List</h2>
      </div>
      <div className="food_menu_block">
        {products.map((product, inx) => (
          <div className="food_menu_content" id={inx}>
            <div>
              <div className="dish-img">
                <img src={product.image} className="img-circle" />
              </div>
              <div className="dish-content">
                <h5 className="dish-title">{product.name}</h5>
                {/* <span className="dish-meta">Onion / Tomato</span> */}
                <div className="dish-price">
                  <p>
                    <PiCurrencyInr />
                    {product.price}
                  </p>
                </div>
              </div>
              <div className="cartButtonContainer">
                <button
                  className="cartButton"
                  onClick={() => addToCart(product._id)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodList;
