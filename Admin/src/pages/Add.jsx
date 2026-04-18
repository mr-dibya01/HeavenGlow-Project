import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

function Add() {
  // let [images,setImages] = useState([ image1: "", image2: "", image3: "", image4: "" ]);
  let [image1, setImage1] = useState("");
  let [image2, setImage2] = useState("");
  let [image3, setImage3] = useState("");
  let [image4, setImage4] = useState("");

  let [productName, setProductName] = useState("");
  let [productDescription, setProductDescription] = useState("");
  let [category, setCategory] = useState("Men");
  let [subCategory, setSubCategory] = useState("Topwear");
  let [price, setPrice] = useState("");
  let [sizes, setSizes] = useState([]);
  let [bestSeller, setBestSeller] = useState(false);

  let [loading,setLoading] = useState(false);

  let [errors,setErrors] = useState({});

  const validateForm = () => {
    const newError = {};
    console.log("validateForm",newError);
    if(!productName.trim()) newError.productName = "Please enter the product name";
    if(!productDescription.trim()) newError.productDescription = "Please enter the product description";
    if(!price || price <= 0) newError.price = "Please enter the valid price";
    if(sizes.length === 0) newError.sizes = "Please select at least one size";
    if(!image1 && !image2 && !image3 && !image4) newError.images = "Please upload at least one image";
    console.log(newError);
    return newError;
  }

  const clearError = (fieldname) => {
    if(errors[fieldname]){
      setErrors((prev) =>{
        const remainingError = {...prev};
        delete remainingError[fieldname];
        return remainingError;
      })
    }
  }

  const handleSubmit = async (e) => {
    // console.log("handleSubmiyty");
    e.preventDefault();
    // name, price, description, category, subCategory, sizes, bestSeller

    const validationError = validateForm();

    console.log(validationError);

    if(Object.keys(validationError).length > 0 ){
      setErrors(validationError);
      toast.error('Please fill the all fields')
      return;
    };

    setErrors({});

    setLoading(true);

    const formData = new FormData();

    formData.append("name",productName);
    formData.append("price",price);
    formData.append("description",productDescription);
    formData.append("category",category);
    formData.append("subCategory",subCategory);
    formData.append("sizes",JSON.stringify(sizes));
    formData.append("bestSeller",bestSeller);
    formData.append("image1",image1);
    formData.append("image2",image2);
    formData.append("image3",image3);
    formData.append("image4",image4);

    let token=localStorage.getItem('token');
    console.log(token);
    console.log("formData",formData);
    try {
      let res = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/api/product/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        }
      );
      console.log(res);
      if(res.data.success) {
        toast.success(res.data.message);

        setImage1()
        setImage2("");
        setImage3("");
        setImage4("");

        setProductName("");
        // setProductDescription("");
        setCategory("Men");
        setSubCategory("Topwear");
        setPrice("0");
        setSizes([]);
        setBestSeller(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }

    // console.log("producName--",productName,"productDescription--",productDescription,"category--",category,"subCategory--",subCategory,"price--",price,"sizes--",sizes,"bestSeller===",bestSeller);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-gray-600">
        <div>
          <p className="py-2">Upload Images</p>
          <div className="flex items-center gap-1 sm:gap-4">
            <label htmlFor="image1">
              <img
                className="w-20 h-[75px] object-cover rounded object-top"
                src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
                alt=""
              />
              <input
                type="file"
                className="hidden"
                id="image1"
                onChange={(e) =>{ setImage1(e.target.files[0]); clearError("images");}}
                name="image1"
              />
            </label>
            <label htmlFor="image2">
              <img
                className="w-20 h-[75px] object-cover rounded object-top"
                src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
                alt=""
              />
              <input
                type="file"
                className="hidden"
                id="image2"
                onChange={(e) =>{ setImage2(e.target.files[0]); clearError("images"); }}
                name="image2"
              />
            </label>
            <label htmlFor="image3">
              <img
                className="w-20 h-[75px] object-cover rounded object-top"
                src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
                alt=""
              />
              <input
                type="file"
                className="hidden"
                id="image3"
                onChange={(e) =>{ setImage3(e.target.files[0]); clearError("images");}}
                name="image3"
              />
            </label>
            <label htmlFor="image4">
              <img
                className="w-20 h-[75px] object-cover rounded object-top"
                src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
                alt=""
              />
              <input
                type="file"
                className="hidden"
                id="image4"
                onChange={(e) =>{ setImage4(e.target.files[0]); clearError("images");}}
                name="image4"
              />
            </label>
          </div>
          {errors.images && <p className="text-red-500 mt-1 text-sm">{errors.images}</p>}
        </div>
        <div className="pt-4">
          <p className="py-2">Product name</p>
          <input
            type="text"
            className="border rounded w-full sm:w-[35%] h-10 px-2"
            value={productName}
            onChange={(e) =>{ setProductName(e.target.value); clearError("productName")}}
            required
          />
          {errors.productName && <p className="text-red-500 mt-1 text-sm">{errors.productName}</p>}
        </div>
        <div className="pt-4">
          <p className="py-2">Product Description</p>
          <textarea
            className="border rounded w-full sm:w-[40%] h-24 p-2"
            value={productDescription}
            name="description"
            onChange={(e) =>{ setProductDescription(e.target.value); clearError("productDescription")}}
            required
          ></textarea>
          {errors.productDescription && <p className="text-red-500 mt-1 text-sm">{errors.productDescription}</p>}
        </div>
        <div className="pt-4 flex gap-10 sm:flex-row flex-col">
          <div >
            <p className="text-black py-1">Category</p>
            <select
              className="pr-6 pl-2 py-2 border w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="">
            <p className="text-black py-1">SubCategory</p>
            <select
              className="pr-10 pl-2 py-2 border w-full"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div>
            <p className="text-black py-1">Price</p>
            <input
              type="number"
              className="border rounded h-10 px-2 w-full"
              value={price}
              onChange={(e) =>{ setPrice(e.target.value); clearError("price");}}
              placeholder="₹99"
            />
            {errors.price && <p className="text-red-500 mt-1 text-sm">{errors.price}</p>}
          </div>
        </div>
        <div className="pt-4 w-full">
          <p className="py-2">Sizes</p>
          <div className="flex sm:gap-2 gap-1">
            <div className={`px-4 sm:px-6 py-2 border  cursor-pointer transition rounded text-sm sm:text-base ${sizes.includes("S") ? "bg-pink-100 border-pink-400 text-black": "bg-slate-200" }`}
              onClick={() =>{
                sizes.includes("S")
                  ? setSizes(sizes.filter((item) => item !== "S"))
                  : setSizes((prev) => [...prev, "S"]);
                clearError("sizes");
                }
              }
            >
              S
            </div>
            <div
              className={`px-4 sm:px-6 py-2 border  cursor-pointer transition rounded text-sm sm:text-base ${
                sizes.includes("M")
                  ? "bg-pink-100 border-pink-400 text-black"
                  : "bg-slate-200"
              }`}
              onClick={() =>{
                sizes.includes("M")
                  ? setSizes(sizes.filter((item) => item !== "M"))
                  : setSizes((prev) => [...prev, "M"]);
                  clearError("sizes");
                }
              }
            >
              M
            </div>
            <div
              className={`px-4 sm:px-6 py-2 border  cursor-pointer transition rounded text-sm sm:text-base ${
                sizes.includes("L")
                  ? "bg-pink-100 border-pink-400 text-black"
                  : "bg-slate-200"
              }`}
              onClick={() =>{
                sizes.includes("L")
                  ? setSizes(sizes.filter((item) => item !== "L"))
                  : setSizes((prev) => [...prev, "L"]);
                  clearError("sizes");
                }
              }
            >
              L
            </div>
            <div
              className={`px-4 sm:px-6 py-2 border cursor-pointer transition rounded text-sm sm:text-base ${
                sizes.includes("XL")
                  ? "bg-pink-100 border-pink-400 text-black"
                  : "bg-slate-200"
              }`}
              onClick={() =>{
                sizes.includes("XL")
                  ? setSizes(sizes.filter((item) => item !== "XL"))
                  : setSizes((prev) => [...prev, "XL"]);
                clearError("sizes");
                }
              }
            >
              XL
            </div>
            <div
              className={`px-4 sm:px-6 py-2 border  cursor-pointer transition rounded text-sm sm:text-base ${
                sizes.includes("XXL")
                  ? "bg-pink-100 border-pink-400 text-black"
                  : "bg-slate-200"
              }`}
              onClick={() =>{
                sizes.includes("XXL")
                  ? setSizes(sizes.filter((item) => item !== "XXL"))
                  : setSizes((prev) => [...prev, "XXL"]);
                clearError("sizes")
              }}
            >
              XXL
            </div>
          </div>
          {errors.sizes && <p className="text-red-500 mt-1 text-sm">{errors.sizes}</p>}
        </div>
        <div className="flex items-center py-8 gap-2">
          <input
            type="checkbox"
            checked={bestSeller}
            value={bestSeller}
            onChange={() => setBestSeller((prev) => !prev)}
            id="bestSeller"
          />
          <label htmlFor="bestSeller">Add To BestSeller</label>
        </div>
        <button className={`sm:px-8 px-4 sm:py-3 py-2 rounded bg-black text-white ${ loading ? "opacity-40" : "opacity-100"}`} disabled={loading}>
          {loading ? "Loading...." : "Add"}
        </button>
      </div>
    </form>
  );
}

export default Add;
