import React, { useContext, useState } from "react";
import Title from "../components/Title";
import FloatingLabelInput from "../components/FloatingLabelInput";
import CartTotal from "../components/CartTotal";
import assets from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone:"",
    pincode: "",
    house: "",
    address: "",
    town: "",
    city: "",
    state: "",
  });
  const [method, setMethod] = useState("");
  const { navigate } = useContext(ShopContext);

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
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
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
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fname: e.target.value }))
              }
              required
            />
            <FloatingLabelInput
              id="lname"
              label="Last Name"
              value={formData.lname}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, lname: e.target.value }))
              }
              required
            />
          </div>

          <div className="my-2">
            <FloatingLabelInput
              id="email"
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
              required
            />
          </div>
          <div className="my-2">
            <FloatingLabelInput
              id="phone"
              label="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              type="tel"
              maxLength={10}
              required
            />
          </div>

          <h4 className="contatct">Address</h4>

          <div className="my-2">
            <FloatingLabelInput
              id="pincode"
              label="Pin Code"
              value={formData.pincode}
              onChange={handlePincodeChange}
              maxLength={6}
              required
            />
          </div>

          <div className="my-2">
            <FloatingLabelInput
              id="house"
              label="House Number/Tower/Block"
              value={formData.house}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, house: e.target.value }))
              }
              required
            />
          </div>

          <div className="my-2">
            <FloatingLabelInput
              id="address"
              label="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
              required
            />
          </div>

          <div className="my-2">
            <FloatingLabelInput
              id="town"
              label="Town/Locality"
              value={formData.town}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, town: e.target.value }))
              }
              required
            />
          </div>
          <div className="flex gap-4 my-2">
            <FloatingLabelInput
              id="city"
              label="City"
              value={formData.city}
              disabled
            />
            <FloatingLabelInput
              id="state"
              label="State"
              value={formData.state}
              disabled
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
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${method === "paypal" ? "border-green-600" : "border-gray-400"}`}
              >
                <div
                  className={`w-2 h-2 rounded-full  ${method === "stripe" ? "bg-green-600" : "bg-transparent"}`}
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
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center  ${method === "upi" ? "border-green-600" : "border-gray-400"}`}
              >
                <div
                  className={`w-2 h-2 rounded-full  ${method === "razorpay" ? "bg-green-600" : "bg-transparent"}`}
                ></div>
              </div>
              <img src={assets.razonpay_icon} alt="razor_pay" className="h-5 mx-2" />
            </div>

            {/* COD */}
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 rounded-lg cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center  ${method === "cod" ? "border-green-600" : "border-gray-400"}`}
              >
                <div
                  className={`w-2 h-2 rounded-full  ${method === "cod" ? "bg-green-600" : "bg-transparent"}`}
                ></div>
              </div>
              <p className="text-gray-700 font-medium text-sm mx-2">
                Cash on Delivery
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button 
            className="bg-rose-600 text-white py-2 px-8 rounded-lg"
            onClick={() => navigate('/orders')}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
