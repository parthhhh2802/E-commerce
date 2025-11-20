import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { getCartAmount , currency , delivery_fee } = useContext(ShopContext);
  
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"Cart"} text2={"Total"} />
        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{currency} {getCartAmount()}</span>
            </div>
            <hr />
            <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>{currency} {delivery_fee}.00</span>
            </div>
            <hr />
            <div className="flex justify-between">
                <span>Total</span>
                <span>{currency} {getCartAmount() + delivery_fee}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
