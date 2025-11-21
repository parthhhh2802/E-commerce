import React, { useContext, useState } from "react";
import Title from "../components/Title";
import FloatingLabelInput from "../components/FloatingLabelInput";
import CartTotal from "../components/CartTotal";
import assets from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    pincode: "",
    house: "",
    address: "",
    town: "",
    city: "",
    state: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((products) => products._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        //api call on COD
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            //alert("Order placed successfully");
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
    setFormData((prev) => ({ ...prev, pincode }));

    if (pincode.length === 6) {
      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        const [data] = await response.json();

        if (data.Status === "Success") {
          const { State, District } = data.PostOffice[0];
          setFormData((prev) => ({
            ...prev,
            city: District,
            state: State,
          }));
        }
      } catch (error) {
        console.error("Error fetching pincode data:", error);
      }
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* leftSide */}
      <div className="flex flex-col gap-4 w-full border p-12 rounded sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl mt-[-24px] ">
          <Title text1={"Delivery"} text2={"Information"} />
          <h4 className="contatct">Contact Details</h4>
          <div className="flex gap-4 my-2">
            <FloatingLabelInput
              id="fname"
              label="First Name"
              value={formData.fname}
              onChange={onChangeHandler}
              name="fname"
              type="text"
              required
            />
            <FloatingLabelInput
              id="lname"
              label="Last Name"
              value={formData.lname}
              // onChange={(e) =>
              //   setFormData((prev) => ({ ...prev, lname: e.target.value }))
              // }
              onChange={onChangeHandler}
              name="lname"
              required
            />
          </div>

          <div className="my-2">
            <FloatingLabelInput
              id="email"
              label="Email"
              value={formData.email}
              // onChange={(e) =>
              //   setFormData((prev) => ({ ...prev, email: e.target.value }))
              // }
              onChange={onChangeHandler}
              name="email"
              type="email"
              required
            />
          </div>
          <div className="my-2">
            <FloatingLabelInput
              id="phone"
              label="Phone Number"
              value={formData.phone}
              // onChange={(e) =>
              //   setFormData((prev) => ({ ...prev, phone: e.target.value }))
              // }
              onChange={onChangeHandler}
              name="phone"
              type="tel"
              maxLength={10}
              required
            />
          </div>

          <h4 className="contact">Address</h4>

          <div className="my-2">
            <FloatingLabelInput
              id="pincode"
              label="Pin Code"
              value={formData.pincode}
              onChange={handlePincodeChange}
              name="pincode"
              maxLength={6}
              required
            />
          </div>

          <div className="my-2">
            <FloatingLabelInput
              id="house"
              label="House Number/Tower/Block"
              value={formData.house}
              // onChange={(e) =>
              //   setFormData((prev) => ({ ...prev, house: e.target.value }))
              // }
              onChange={onChangeHandler}
              name="house"
              required
            />
          </div>

          <div className="my-2">
            <FloatingLabelInput
              id="address"
              label="Address"
              value={formData.address}
              // onChange={(e) =>
              //   setFormData((prev) => ({ ...prev, address: e.target.value }))
              // }
              onChange={onChangeHandler}
              name="address"
              required
            />
          </div>

          <div className="my-2">
            <FloatingLabelInput
              id="town"
              label="Town/Locality"
              value={formData.town}
              // onChange={(e) =>
              //   setFormData((prev) => ({ ...prev, town: e.target.value }))
              // }
              onChange={onChangeHandler}
              name="town"
              required
            />
          </div>
          <div className="flex gap-4 my-2">
            <FloatingLabelInput
              id="city"
              label="City"
              value={formData.city}
              // onChange={onChangeHandler}
              name="city"
              disabled
              required
            />
            <FloatingLabelInput
              id="state"
              label="State"
              value={formData.state}
              // onChange={onChangeHandler}
              name="state"
              disabled
              required
            />
          </div>
        </div>
      </div>
      {/* rightSide */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"Payment"} text2={"Method"} />
          {/* payment options */}
          <div className="flex gap-3 flex-col sm:flex-row">
            {/* stripe*/}
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 rounded-lg cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  method === "paypal" ? "border-green-600" : "border-gray-400"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full  ${
                    method === "stripe" ? "bg-green-600" : "bg-transparent"
                  }`}
                ></div>
              </div>
              <img src={assets.stripe_icon} alt="stripe" className="h-5 mx-2" />
            </div>
            {/* UPI */}
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 rounded-lg cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center  ${
                  method === "upi" ? "border-green-600" : "border-gray-400"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full  ${
                    method === "razorpay" ? "bg-green-600" : "bg-transparent"
                  }`}
                ></div>
              </div>
              <img
                src={assets.razonpay_icon}
                alt="razor_pay"
                className="h-5 mx-2"
              />
            </div>

            {/* COD */}
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 rounded-lg cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center  ${
                  method === "cod" ? "border-green-600" : "border-gray-400"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full  ${
                    method === "cod" ? "bg-green-600" : "bg-transparent"
                  }`}
                ></div>
              </div>
              <p className="text-gray-700 font-medium text-sm mx-2">
                Cash on Delivery
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-rose-600 text-white py-2 px-8 rounded-lg"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
