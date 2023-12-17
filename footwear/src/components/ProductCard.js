import React from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

function ProductCard({ _id: id, name, price, desc, rating, brand, image }) {
  return (
    <Link
      to={`/products/${id}`}
      className="overflow-hidden rounded-xl p-3 shadow-md"
    >
      <div className="flex h-60 items-center justify-center rounded-xl">
        <img className="h-4/5 w-4/5 object-contain" src={image} alt={name} />
      </div>
      <h2 className="my-1 mt-3 line-clamp-1 w-60 text-ellipsis text-lg font-medium">
        {name}
      </h2>
      <div className="flex gap-2">
        <AiFillStar className="text-xl text-yellow-400" />
        <p className="font-medium">{rating}</p>
      </div>
      <p className="my-1 text-xl font-medium">${price}</p>
    </Link>
  );
}

export default ProductCard;
