import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import assets from "../assets/assets";
import { useLocation } from "react-router-dom";

const Searchbar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);
  return showSearch && visible ? (
    <div className="border-t border-b  text-center">
  <div className="inline-flex items-center justify-center border border-gray-500 px-5 py-2 mx-3 rounded-full sm:w-1/2 lg:w-1/3 my-2 bg-white ">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <img className="w-8" src={assets.search_icon} alt="search" />
      </div>
      <img
        className="inline w-4 cursor-pointer"
        src={assets.search_cross_icon}
        alt="close"
        onClick={() => {
          setShowSearch(false);
          setSearch("");
        }}
      />
    </div>
  ) : null;
};

export default Searchbar;
