// src/context/ShopContext.jsx
import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  // Corrected prop name
  const currency = "₹"; // Indian Rupee symbol
  const delivery_fee = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (productId, sizes) => {
    let cartData = structuredClone(cartItems);
    if (!sizes) {
      toast.error("Please select a size", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (cartData[productId]) {
      if (cartData[productId][sizes]) {
        cartData[productId][sizes] += 1;
      } else {
        cartData[productId][sizes] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][sizes] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
            await axios.post(
              backendUrl + "/api/cart/add",
              { itemId: productId, size: sizes },
              { headers: { token } }
            );
      } catch (error) {
        console.log(error);
        toast.error("Error adding to cart: " + error.message, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    }
  };

  const getCartCount = () => {
    let itemCount = 0;
    for (const items in cartItems) {
      for (const sizes in cartItems[items]) {
        try {
          if (cartItems[items][sizes] > 0) {
            itemCount += cartItems[items][sizes];
          }
        } catch (e) {
          continue;
        }
      }
    }
    return itemCount;
  };

  const updateQuantity = async (productId, sizes, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[productId][sizes] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
            await axios.post(
              backendUrl + "/api/cart/update",
              { itemId: productId, size: sizes, quantity },
              { headers: { token } }
            );
      } catch (error) {
        console.log(error);
        toast.error("Error updating cart: " + error.message, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    }
  };

  const getCartAmount = () => {
    let amount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((p) => p._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            amount += cartItems[items][item] * itemInfo.price;
          }
        } catch (e) {
          continue;
        }
      }
    }
    return amount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      console.log("Products data response:", response.data);
      if (response.data.success) {
        setProducts(response.data.products);
        console.log(products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + "/api/cart/get",{}, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  // Load initial data: products and cart (from server if logged in, otherwise from localStorage)
  useEffect(() => {
    getProductsData();

    const localToken = localStorage.getItem("token");
    const localCart = localStorage.getItem("cartItems");

    if (localCart && !localToken) {
      try {
        setCartItems(JSON.parse(localCart));
      } catch (e) {
        console.warn("Failed to parse local cartItems", e);
      }
    }

    if (localToken) {
      setToken(localToken);
      // fetch server cart which will overwrite local cart if present
      getUserCart(localToken);
    }
  }, []);

  // Persist cart to localStorage so page refresh retains cart for non-logged-in users
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (e) {
      console.warn("Failed to persist cartItems to localStorage", e);
    }
  }, [cartItems]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    delivery_fee,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>
      {children} {/* Render the corrected prop */}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
