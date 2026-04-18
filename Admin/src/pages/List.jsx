import axios from 'axios';
import { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { baseUrl } from '../App';
import { toast } from 'react-toastify';

function List({ token }) {

  let [productData,setProductData] = useState([]);

  const handleDeleteProduct =async (id) => {
    try {
      let result=await axios.delete(baseUrl+`/api/product/remove/${id}`,{
        headers:{ Authorization: `Bearer ${token}`}
      });
      fetchData();
      toast.success(result.data.msg);
    } catch(err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  }

  let fetchData =async () => {
    try {
      const productList = await axios.get(baseUrl + '/api/product/list');
      setProductData(productList.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData(); 
  },[]);

  return (
    <div>
      <h1 className='py-2 text-xl font-thin text-gray-600'>All Product List</h1>
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] text-gray-500 text-sm px-2  items-center py-2 border bg-slate-100 rounded mb-4'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b> 
      </div>
      <div>
        {
          productData.map((item) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 border p-2 rounded mb-3' key={item._id}>
              <img src={item.image[0]} alt="" className='w-12 rounded'/>
              <p className='font-normal text-sm text-gray-600 capitalize'>{item.name} Multi Shirt</p>
              <p className='font-normal text-sm text-gray-600 capitalize'>{item.category}</p>
              <p className='font-normal text-sm text-gray-600 capitalize'>₹{item.price}</p>
              <p className='flex items-center justify-center col-span-2 md:col-span-1 font-normal text-sm text-gray-600 capitalize cursor-pointer' onClick={() => handleDeleteProduct(item._id)}><MdDelete className='size-6 text-red-500' /></p>  
            </div>))
          } 
      </div>
    </div> 
  )
}

export default List
