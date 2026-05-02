import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();
export const baseurl = import.meta.env.VITE_SERVER_URL;

const ShopContextProvider = (props) => {
  const navigate = useNavigate();

  let [showSearchBar, setShowSearchBar] = useState(false);
  let [searchQuerry, setSearchQuerry] = useState("");
  let [cartItems, setCartItems] = useState([]);
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  let [token, setToken] = useState(localStorage.getItem("token") || "");

  // console.log("---------------",products)

  async function fetchData() {
    try {
      const productsData = await axios.get(baseurl + "/api/product/list");
        // console.log("baseUrl", baseurl);
        // console.log("productsData", productsData);
      if (productsData.data && productsData.data.length > 0) {
        setProducts(productsData.data);
        setLoading(false);
      } else {
        console.log(productsData);
        toast.error("No products found");
      }
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.error || "Failed to load products"
      );
    }
  }

  async function fetchCartData() {
    if(!token) {
      return;
    }
    try {
      let res = await axios.get(baseurl + "/api/cart/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error || "Failed to load cart");
    }
  }

    useEffect(() => {
      fetchData();
    }, []);

    useEffect(() => {
      localStorage.setItem("token", token);
      // console.log("token", token);
      if (token) {
        fetchCartData();
      }
    }, [token]);

  let handleAddToCart = async (productData, size, setSize) => {
    // console.log(productData);
    if (!size) {
      toast.error("Please Select The Size");
      return;
    }


    if (token) { 
      try {
        let cartData = {
          productId: productData._id,
          size,
          quantity: 1,
          price: productData.price,
        };

        let res = await axios.post(baseurl + "/api/cart/add", cartData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res);
        toast.success(res.data.message);
        fetchCartData();
        setSize("");
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.error);
      }
    } else {
      toast.error("You have to login first before adding to cart");
      navigate("/login");
    }
  };

  // console.log(searchQuerry);
  const currency = "₹";
  const shipping_fee = 7;

  // Function: remove product
  const removeItem = async (id, size) => {
    console.log(id, size);
    setCartItems(cartItems.filter((item) => item._id !== id));
    try {
      let res = await axios.delete(baseurl + "/api/cart/remove", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          cartItemId: id,
          size: size,
        },
      });
      console.log(res);
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.success(err.response.data.error);
      fetchCartData();
    }

    // const updatedCart = cartItems.filter(
    //   (item) => !(item._id === id && item.sizes === size)
    // );
    // setCartItems(updatedCart);
    // toast.error("Removed from cart!", { position: "top-right", autoClose: 2000 });
  };

  const updateCart = async (cartItemId, size, action) => {
    console.log(cartItemId, size, action);
    // console.log("1.updatedCart",updatedCart);

    let updatedCart = cartItems.map((item) => {
      if (item._id === cartItemId && item.size === size) {
        return {
          ...item,
          quantity:
            action === "increase"
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1),
        };
      }
      return item;
    });

    setCartItems(updatedCart);

    try {
      let res = await axios.put(
        baseurl + "/api/cart/update",
        { cartItemId, size, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error || "Something went wrong!");
      fetchCartData();
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    loading,
    products,
    currency,
    shipping_fee,
    showSearchBar,
    setShowSearchBar,
    searchQuerry,
    setSearchQuerry,
    cartItems,
    setCartItems,
    handleAddToCart,
    removeItem,
    totalPrice,
    baseurl,
    token,
    setToken,
    navigate,
    fetchCartData,
    updateCart,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

// const addToCart = async (itemId,size) => {
//     if(!size) {
//         toast.error('Select Product Size',{
//             position: 'top-right',
//             autoClose: 3000,
//         })
//         return;
//     }
//     let cartData = structuredClone(cartItems);

//     if(cartData[itemId]) {
//         if(cartData[itemId][size]) {
//             cartData[itemId][size] += 1;
//         }
//         else {
//             cartData[itemId][size] = 1;
//         }
//     }
//     else {
//         cartData[itemId] = {};
//         cartData[itemId][size] = 1;
//     }
//     setCartItems(cartData);
// }

// const getCartCount = () => {
//     let totalCount = 0;
//     for(const items in cartItems){
//         for(const item in cartItems[items]){
//             try{
//                 if(cartItems[items][item] > 0) {
//                     totalCount += cartItems[items][item];
//                 }
//             } catch(err) {

//             }
//         }
//     }
//     return totalCount;
// }

// console.log(getCartCount());
