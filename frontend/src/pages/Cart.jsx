import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";
import assets from "../assets/assets";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
      setCartData(tempData);
    }
  }, [cartItems]);

  const handleConfirmRemove = (items) => {
    setItemToRemove(items);
    setShowConfirm(true);
  };

  const handleRemove = () => {
    if (itemToRemove) {
      updateQuantity(itemToRemove._id, itemToRemove.size, 0);
    }
    setShowConfirm(false);
    setItemToRemove(null);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setItemToRemove(null);
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"Your"} text2={"Cart"} />
      </div>
      <div>
        {cartData.length > 0 ? (
          cartData.map((items, index) => {
            const productData = products.find((p) => p._id === items._id);
            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[5fr_0.5fr] sm:grid-cols-[5fr_0.55fr] items-center gap-4"
              >
                <div className="flex gap-6 items-start">
                  <img
                    src={productData.images[0] || ""}
                    alt="product_images"
                    className="w-16 sm:w-20"
                  />
                  <div>
                    <p className="text-sm p-2 rounded sm:text-lg sm:py-1">
                      {productData.name}
                    </p>
                    <div className="flex items-center cursor-default gap-5 mt-2">
                      <p>
                        {currency} {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border rounded-full cursor-default bg-slate-50">
                        {items.size}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div
                    onClick={() => {
                      setEditingItem(items);
                      setSelectedQuantity(items.quantity);
                      setShowQuantityModal(true);
                    }}
                    className="inline-flex items-center gap-2 cursor-pointer hover:bg-slate-50 px-3 py-2 rounded transition-colors"
                  >
                    <span className="text-gray-600">Qty:</span>
                    <span className="font-medium">{items.quantity}</span>
                  </div>
                  <div>
                    <img
                      src={assets.bin_icon}
                      onClick={() => handleConfirmRemove(items)}
                      className="w-14 mr-4 cursor-pointer hover:scale-110 transition-transform duration-150"
                      alt="delete"
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col text-center text-gray-500 py-20">
            <p className="inline rounded mb-8 p-2 text-3xl text-white bg-red-500 text-center">
              Your cart is empty 😞
            </p>
            <Link to="/collection">
              <button
                onClick={() => na}
                className="inline rounded p-2 text-white bg-slate-700 text-center"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        {cartData.length > 0 && (
          <div className="flex justify-end mt-8 mb-20 px-4">
            <div className="w-full max-w-md">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/place-order")}
                  className="inline rounded p-2 my-8 text-white bg-rose-500 text-center"
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/*  Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center transform scale-100 transition-all">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Remove Item
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove this item from your cart?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRemove}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
              >
                Remove
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-5 py-2 rounded-lg shadow-md transition"
              >
                Keep it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quantity Selection Modal */}
      {showQuantityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center transform scale-100 transition-all relative">
            <button
              onClick={() => {
                setShowQuantityModal(false);
                setEditingItem(null);
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Select Quantity
            </h2>
            <select
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(Number(e.target.value))}
              className="w-full mb-6 p-2 border rounded-lg text-center text-lg"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  if (editingItem) {
                    updateQuantity(
                      editingItem._id,
                      editingItem.size,
                      selectedQuantity
                    );
                  }
                  setShowQuantityModal(false);
                  setEditingItem(null);
                }}
                className="bg-slate-700 hover:bg-slate-800 text-white font-semibold px-8 py-2 rounded-lg shadow-md transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
