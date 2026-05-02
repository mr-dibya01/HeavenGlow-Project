import Product from "../model/productModel.js";
import httpStatus from "http-status";

const addProduct = async (req,res) => {
  let { name, price, description, category, subCategory, sizes, bestSeller } = req.body; // multiple images
  console.log("req.body",req.body);
  console.log("req.files",req.files);
  let image1 = req.files.image1 && req.files.image1[0];
  let image2 = req.files.image2 && req.files.image2[0];
  let image3 = req.files.image3 && req.files.image3[0];
  let image4 = req.files.image4 && req.files.image4[0];
  
  let parsedSize;
  try{
    parsedSize = JSON.parse(sizes.replace(/'/g,'"'));   
    console.log(parsedSize);
  } catch (err) {
    console.log(err);
    parsedSize = sizes.split(',');
    console.log("------------",parsedSize);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: err.message})
  }
 
  let image=[image1, image2, image3, image4].filter((item) => item != undefined).map((item) => item.path);

  let newProduct = new Product(
    { 
      name,
      image,
      price,
      category,
      description,
      subCategory,
      date: Date.now(),
      sizes: parsedSize,
      bestSeller : bestSeller == 'true' ? true : false,
    }
  );
  // console.log(newProduct);
  await newProduct.save();

  res.status(httpStatus.OK).json({  success: true,
    message: "Product added successfully!",
  });
};

const showAllProducts =async (req,res) => {
  let products =await Product.find({});
  // console.log("productController.js",products);
  res.json(products);
};

const removeProduct =async (req,res) => {
  let product=await Product.findByIdAndDelete(req.params.id);
  if(product) {
    res.status(httpStatus.OK).json({ msg: 'Product successfully removed'});
  } else {
    res.status(httpStatus.NOT_FOUND).json({error: "Product not found"})
  }
};

const singleProduct =async (req,res) => {
  // console.log(req.params.id);
  let product =await Product.findById(req.params.id);
  // console.log(product);
  if(!product) {
    res.status(httpStatus.NOT_FOUND).json({ error: "This product is not Availble"});
    return;
  }  
  res.json(product);
};


export { addProduct, removeProduct, singleProduct, showAllProducts };