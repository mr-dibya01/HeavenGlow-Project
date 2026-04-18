import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";


const TrackOrder = () => {
  let { orderId, productId, size } = useParams();
  let { baseurl, token, navigate, shipping_fee } = useContext(ShopContext);
  let [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    try {
      let res = await axios.get(baseurl + "/api/order/user/list", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const Orders = res.data.find((order) => order._id === orderId);
      console.log(Orders); 

      if (!Orders){
        navigate("/orders");
        return toast.error("Orders data not found");
      } 

      Orders.items.filter((item) =>{
        if(item.productId === productId && item.size === size){
          item.status = Orders.status;
          item.paymentMode = Orders.paymentMode;
          item.payment = Orders.payment;
          item.amount = Orders.amount;
          item.date = Orders.date;
          setOrder(item);
        }
      });
    } catch (err) {
      console.log(err);0
    }
  };

  const steps = [
    "Order Placed",
    "Shipped",
    "Out for Delivery",
    "Delivered"
  ];

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (!order) return <h1>Loading...</h1>;

  return (
    <div className="py-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Track Your Order</h1>

      {/* Product Summary */}
      <div className="flex gap-4 border p-4 rounded-lg mb-6">
        <img src={order.image[0]} className="w-24 rounded" />
        <div>
          <h2 className="font-semibold">{order.name}</h2>
          <p>Size: {order.size}</p>
          <p>Qty: {order.quantity}</p>
          <p>₹{order.amount}</p>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="mt-6">
        {steps.map((step, i) => {
          const isCompleted =
            steps.indexOf(order.status) >= i;

          return (
            <div key={i} className="flex items-center gap-4 mb-6">
              {/* Status Dot */}
              <div
                className={`w-4 h-4 rounded-full ${
                  isCompleted ? "bg-green-600" : "bg-gray-300"
                }`}
              ></div>

              {/* Step Info */}
              <p
                className={`text-lg ${
                  isCompleted ? "text-green-700 font-semibold" : "text-gray-400"
                }`}
              >
                {step}
              </p>
            </div>
          );
        })}
      </div>

      {/* Extra Info */}
      <div className="mt-8 text-gray-700">
        <p>
          <strong>Order Date:</strong> {formatDate(order.date)}
        </p>
        <p>
          <strong>Payment Mode:</strong> {order.paymentMode}
        </p>
        <p>
          <strong>Amount Paid:</strong> ₹{order.amount}
        </p>
      </div>
    </div>
  );
};

export default TrackOrder;
