import React from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

function ProductCard({ _id: id, name, price, desc, rating, brand }) {
  return (
    <Link
      to={`/products/${id}`}
      className="overflow-hidden rounded-xl p-3 shadow-md"
    >
      <div className="h-60 rounded-xl bg-stone-100"></div>
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
