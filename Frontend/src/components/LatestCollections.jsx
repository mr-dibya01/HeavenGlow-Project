import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem.jsx";
import SkeletonCard from "./SkeletonCard.jsx";

function LatestCollections() {
  // console.log("LatestCollections");
  const [latestProducts, setLatestProducts] = useState([]);
  const { products, loading } = useContext(ShopContext);
  // console.log(products);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-4">
      <div className="py-10 text-xl sm:text-3xl text-center">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="text-xs sm:text-lg text-gray-500 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum
          dolor.
        </p>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {[...Array(10)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {latestProducts.map((item, idx) => (
            <ProductItem
              key={idx}
              image={item.image}
              name={item.name}
              price={item.price}
              id={item._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default LatestCollections;
