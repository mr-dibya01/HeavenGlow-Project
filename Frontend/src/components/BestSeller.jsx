import { useContext, useEffect, useState } from "react";
import Title from "./Title.jsx";
import { ShopContext } from "../context/ShopContext.jsx";
import ProductItem from "./ProductItem.jsx";
import SkeletonCard from "./SkeletonCard.jsx";

export default function BestSeller() {
  let [bestSeller, setBestSeller] = useState([]);
  let { products, loading } = useContext(ShopContext);
  // const newArray  = products.slice(10,20);

  // console.log("products1:", products);

  // console.log(bestSeller);

  useEffect(() => {
    // console.log("products2:", products);
    let bestProducts = products.filter((item) => item.bestSeller);
    setBestSeller(bestProducts.slice(0, 5));
  }, [products]);

  return (
    <div className="my-4">
      <div className="py-10 text-xl sm:text-4xl text-center">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="text-xs sm:text-lg text-gray-500 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum
          dolor.
        </p>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {[...Array(5)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {bestSeller.map((item, idx) => (
            <ProductItem
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              key={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
}
