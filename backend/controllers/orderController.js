import orderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
//placing order using cOD method
const placeOrder = async (req, res) => {
    try{
        const { userId, items, amount, address} = req.body;
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await UserModel.findByIdAndUpdate(userId,{cartData:{}});

        res.json({success:true,message:"Order placed successfully"});

    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

//placing order using Stripe method
const placeOrderStripe = async (req, res) => {

}

//placing order using Razorpay method
const placeOrderRazorpay = async (req, res) => {

}

//all orders data for admin panel
const allOrders = async (req, res) => {

}

//user orders data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId }).sort({ date: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//update order status by admin
const updateStatus = async (req, res) => {

}
export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };