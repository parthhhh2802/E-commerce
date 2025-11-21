import React, { useEffect } from "react";
import axios from "axios";
import {backendUrl} from '../App';
import {toast} from 'react-toastify';

const Orders=({token})=>{
  const [orders, setOrders] = React.useState([]);

  const lodeOrderData=async()=>{
    if(!token){
      return null;
    }
     try {
      const res = await axios.get(backendUrl + "/api/order/list",{}, {
        headers: { token },
      });
      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error("Something went wrong!");
      }
     } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong!");
     }
  }

  useEffect(()=>{
    lodeOrderData();
  },[token]);
  return(
    <div>
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      <div className="space-y-4">
        {orders.map((order)=>(
          <div key={order._id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Order ID: {order._id}</h3>
            <p className="mb-1">User ID: {order.userId}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Orders;