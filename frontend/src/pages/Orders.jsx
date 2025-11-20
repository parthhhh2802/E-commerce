import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"Your"} text2={"Orders"} />
      </div>
      <div>
        {products.slice(1,4).map((product, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md: justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-16 h-16 object-cover"
              />
              <div>
                <p className="sm:text-base font-medium">{product.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">
                    {currency} {product.price}
                  </p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p className="mt-2">
                  Date: <span className="text-gray-400">25 july 2025</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-base">Ready to ship</p>
              </div>
              <button className="border px-4 py-2 text-sm font-medium rounded bg-rose-500 text-white">Track order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
