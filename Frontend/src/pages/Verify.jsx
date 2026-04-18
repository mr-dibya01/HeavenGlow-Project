import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

function Verify() {
  let { token, setCartItems, navigate, baseurl } = useContext(ShopContext);
  console.log("baseUrl", baseurl);
  let [searchParams, setSearchParams] = useSearchParams();

  let success = searchParams.get("success");
  let orderId = searchParams.get("orderId");
  console.log(success);
  console.log(orderId);
  const verifyStripe = async () => {
    console.log("verifyStripe");
    if (!token) {
      return null;
    }
    try {
      let res = await axios.put(
        baseurl + "/api/order/verifyStripe",
        { orderId, success },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res);
      if (res.data.success) {
        setCartItems([]);
        navigate("/");
      } else {
        toast.error("Item has not ordered")
        navigate("/cart");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
    // if(success === true) {

    // }
  };
  useEffect(() => {
    verifyStripe();
  }, [token]);

  return <div>Verify</div>;
}

export default Verify;
