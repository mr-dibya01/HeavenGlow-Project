import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import axios from "axios";
import { baseurl, ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
// import { use}

const PlaceOrder = () => {
  let [paymentMode, setPaymentMode] = useState("cod");
  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    email: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    number: "",
  });

  let { token, cartItems, shipping_fee, navigate, setCartItems } =
    useContext(ShopContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit");
    console.log(formData);
    // formDa
    switch (paymentMode) {
      case "cod":
        try {
          let res = await axios.post(
            baseurl + "/api/order/place",
            { formData, cartItems, paymentMode, shipping_fee },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          navigate("/orders");
          setCartItems([]);
        } catch (err) {
          console.log(err);
          toast.error(
            err?.response?.data?.error || "Some issue with cash on Delivery"
          );
        }
        break;

      case "razorpay":
        try {
          let res = await axios.post(
            baseurl + "/api/order/razor",
            { formData, cartItems, paymentMode, shipping_fee },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const { razorOrder, key, amount, orderId } = res.data;

          var options = {
            key,
            amount: amount * 100,
            currency: "INR",
            name: "Your Store",
            description: "Order Payment",
            order_id: razorOrder.id,
            handler: async function (response) {
              const verify = await axios.post(
                baseurl + "/api/order/razor/verify",
                {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  orderId,
                },
                { headers: { Authorization: `Bearer ${token}` } }
              );

              if (verify.data.success) {
                setCartItems([]);
                navigate("/orders");
              } else {
                toast.error("Payment Failed");
              }
            },
            prefill: {
              name: formData.firstName,
              email: formData.email,
              contact: formData.number,
            },
            theme: { color: "#3399cc" },
          };

          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        } catch (err) {
          console.log(err);
          toast.error(
            err?.response?.data?.error || "Some issue with razorPay"
          );
        }
        break;

      case "stripe":
        try {
          let responseStripe = await axios.post(
            baseurl + "/api/order/stripe",
            { formData, cartItems, paymentMode, shipping_fee },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
        } catch (err) {
          console.log(err);
        }
        break;

      default:
        break;
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setPaymentMethod = (method) => {
    setPaymentMode(method);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex sm:flex-row flex-col justify-between pt-8 sm:pt-16 min-h-[80] pb-40 gap-6">
        {/* Left Side */}
        <div className="w-full max-w-[480px] flex flex-col gap-6">
          <div className="text-2xl pb-2">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>
          <div className="flex gap-3 flex-wrap">
            <input
              onChange={handleChange}
              required
              type="text"
              placeholder="First Name"
              className="flex-shrink flex-grow border border-gray-400 min-w-[50px] px-2 py-1.5 rounded"
              name="firstName"
            />
            <input
              onChange={handleChange}
              required
              type="text"
              placeholder="Last Name"
              className="flex-shrink flex-grow border border-gray-400 min-w-[50px] px-2 py-1.5 rounded"
              name="lastName"
            />
          </div>
          <input
            onChange={handleChange}
            required
            type="text"
            className="border w-full h-10 border-gray-400 px-2 rounded"
            placeholder="Address"
            name="street"
          />
          <input
            onChange={handleChange}
            required
            type="email"
            className="border w-full h-10 border-gray-400 px-2 rounded"
            placeholder="Email Address"
            name="email"
          />
          <div className="flex gap-3">
            <input
              onChange={handleChange}
              required
              type="text"
              placeholder="City"
              className="border w-full border-gray-400 px-2 py-1.5 rounded"
              name="city"
            />
            <input
              onChange={handleChange}
              required
              type="text"
              placeholder="State"
              className="border w-full border-gray-400 px-2 py-1.5 rounded"
              name="state"
            />
          </div>
          <div className="flex gap-3 ">
            <input
              onChange={handleChange}
              required
              type="number"
              placeholder="Zip code"
              className="border border-gray-400 w-full px-2 py-1.5 rounded"
              name="pincode"
            />
            <input
              onChange={handleChange}
              required
              type="text"
              placeholder="Country"
              className="border border-gray-400 w-full px-2 py-1.5 rounded"
              name="country"
            />
          </div>
          <input
            onChange={handleChange}
            required
            type="number"
            className="border w-full h-10 border-gray-400 px-2 rounded"
            placeholder="Phone"
            name="number"
          />
        </div>
        {/* Right Side */}
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="text-xl py-6">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>
          <div className="flex gap-2  justify-between my-4 flex-col lg:flex-row">
            <div
              onClick={() => setPaymentMethod("stripe")}
              className={`flex gap-2 items-center border-2 px-2 py-2 rounded-md ${
                paymentMode === "stripe" ? "border-blue-700" : ""
              }`}
            >
              <p
                className={`min-w-3 min-h-3 border rounded-full ${
                  paymentMode === "stripe"
                    ? "bg-blue-700 border-blue-700"
                    : "border-gray-400"
                }`}
              ></p>
              <img
                src={assets.stripe_logo}
                alt=""
                className="h-6 object-cover"
              />
            </div>
            <div
              onClick={() => setPaymentMethod("razorpay")}
              className={`flex gap-2 items-center border-2 px-2 py-2 rounded-md ${
                paymentMode === "razorpay" ? "border-blue-700" : ""
              }`}
            >
              <p
                className={`min-w-3 min-h-3 border rounded-full ${
                  paymentMode === "razorpay"
                    ? "bg-blue-700 border-blue-700"
                    : "border-gray-400"
                }`}
              ></p>
              <img
                src={assets.razorpay_logo}
                alt=""
                className="h-6 object-cover"
              />
            </div>
            <div
              onClick={() => setPaymentMethod("cod")}
              className={`flex gap-2 items-center border-2 px-2 py-2 rounded-md ${
                paymentMode === "cod" ? "border-blue-700" : ""
              }`}
            >
              <p
                className={`min-w-3 min-h-3 border rounded-full ${
                  paymentMode === "cod"
                    ? "bg-blue-700 border-blue-700"
                    : "border-gray-400"
                }`}
              ></p>
              <p className="font-semibold">Cash on Delivery</p>
            </div>
          </div>
          <div className="pt-10 text-end">
            <button
              // onClick={() => navigate('/orders')}
              type="submit"
              className="bg-black text-white px-8 uppercase py-2 font-medium"
            >
              place order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
