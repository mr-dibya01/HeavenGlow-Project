import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../App";
import { assets } from "../assets/admin_assets/assets";
import { toast } from "react-toastify";
import Login from "../components/Login";
import { currency } from "../App";

function Order({ token }) {
  console.log(token);
  let [orderData, setOrderData] = useState([]);
  // console.log(orderData);

  const fetchOrderData = async () => {
    if (!token) {
      toast.error("Login First");
      return null;
    }
    try {
      let res = await axios.post(baseUrl + "/api/order/list",{},{headers: { 'Authorization': `Bearer ${token}`}});
      if (res.data) {
        setOrderData(res.data);
      }
    } catch (err) {
      console.log(err);
      // toast.error(err.response.d)
    }
  };

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

  const handleChange = async (orderId,status) => {
    if (!token) {
      toast.error("Login First");
      return null;
    }
    try {
      let res =await axios.put(baseUrl+'/api/order/status',{orderId,status},{headers: { 'Authorization': `Bearer ${token}`}});
      // console.log(res);
      fetchOrderData();
      toast.success('Order Updated');
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchOrderData();
  }, [token]);

  return (
    <div>
      <h1 className="pb-4">Order page</h1>
      {orderData.map((item) => (
        <div className="flex flex-col sm:grid md:grid-cols-[50px_2fr_1fr_1fr_1fr] sm:grid-cols-[50px_2fr_1fr_1fr] gap-4 border p-4  rounded mt-6" key={item._id}>
          <div>
            <img src={assets.parcel_icon} alt="" className="w-12" />
          </div>
          <div className="text-sm text-gray-600 flex flex-col gap-1">
            <div>
              { 
                item.items.map((product,idx) => <h1 key={idx}>{product.name}</h1>)
              }
            </div>
            <h1 className="text-black">{item.address.firstName} {item.address.lastName}</h1>
            <h1>{item.address.street}, {item.address.city}, {item.address.state}, {item.address.country}, {item.address.pincode}</h1>
          </div>
          <div className="text-sm">
            <h1>
              item : <span className="text-gray-600">{item.items.length}</span>
            </h1>
            <h1>
              Method : <span className="text-gray-600">{item.paymentMode}</span>
            </h1>
            <h1>
              Payment : <span className="text-gray-600">{item.payment ? "Success" : "Pending"}</span>
            </h1>
            <h1>
              Date : <span className="text-gray-600">{formatDate(item.date)}</span>
            </h1>
          </div>
          <div className="md:text-center sm:row-start-2 sm:row-end-3 sm:col-start-1 sm:col-end-2 md:row-start-1  md:col-start-4 md:col-end-5">
            <h1>{currency}{item.amount}</h1>
          </div>
          <div>
            <select name="" id="" value={item.status} onChange={ (e) => handleChange(item._id,e.target.value)} className="p-2 border w-full md:w-fit">
              <option value="Order Placed">Order Placed</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Order;
