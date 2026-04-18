import { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';


const Orders = () => {
  let { baseurl, currency ,token ,products , navigate, shipping_fee  } = useContext(ShopContext);
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",  // "Nov"
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true     // 12-hour format
    }).replace(",", "•");
  };
  let [orderData,setOrderData] = useState([]);
  console.log(orderData);

  useEffect(()=> {
    console.log("orderData",orderData);
  },[orderData])
  let fetchOrderData = async () => {
    if(!token) {
      toast.error('You have to login first');
      return navigate('/login');
    }

    if(!products || products.length === 0){
      console.log('product not loaded yet');
      return;
    }
    let tempData=[];
    try {
      let res =await axios.get(baseurl + '/api/order/user/list',{headers: {'Authorization': `Bearer ${token}`}});

      console.log("res.data=",res.data);

      for(const items of res.data){
        for(const item of items['items']){
          if(item) {
            item.status = items.status;
            item.date = items.date;
            item.payment = items.paymentMode;
            item.orderId = items._id;
            tempData.push(item);
          }
        }
      }
      setOrderData(tempData.reverse());
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error || "Orders data not found!");
    }
  }

  useEffect(() => {
    fetchOrderData();
  },[token,products])

  return (
    <div className='pt-10 border-t '>
      
      <div className='text-2xl py-6'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      { orderData.length > 0 
      ?
      <div>
        {
          orderData.map((item,idx)=> 
          <div className='border-t border-b py-4 flex md:flex-row flex-col gap-4 justify-between' key={idx}>
            <div className='flex gap-6 items-center'>
              <img src={item.image[0]} alt="" className='sm:w-20 w-16'/>
              <div className='flex flex-col justify-between gap-3 text-sm'>
                <h1 className='font-medium text-base'>{item.name}</h1>
                <div className='flex items-center gap-4'>
                  <p>{currency}{item.price + shipping_fee}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p>Date: <span className='text-gray-500 '>{formatDate(item.date)}</span></p>
                <p>Payment: <span className='text-gray-500 '>{item.payment}</span></p>
              </div>
            </div>
            <div className='md:w-1/2 flex items-center md:justify-between gap-8'>
              <div className='flex items-center gap-2'>
                <p className='h-2 w-2 bg-green-500 rounded-full '></p>
                <p>{item.status}</p>
              </div>
              <button onClick = {() => navigate(`/trackorder/${item.orderId}/${item.productId}/${item.size}`) } className='px-4 py-2 border text-gray-700 font-medium active:bg-gray-200 transition'>Track Order</button>
            </div>
          </div>)
        }
      </div>
      :   
      <div>
        <h1>you have not ordered item</h1>
      </div>
      }
    </div>
  )
}

export default Orders
