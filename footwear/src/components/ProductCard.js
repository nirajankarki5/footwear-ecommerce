import React from "react";
import { AiFillStar, AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../features/product/productSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductCard({ _id: id, name, price, desc, rating, brand, image }) {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  //   Toast notification
  const notifyDeleted = () => toast.success("Product has been deleted");

  const handleDeleteProduct = async () => {
    dispatch(deleteProduct(id));
    notifyDeleted();
  };

  return (
    <div className="overflow-hidden rounded-xl p-3 shadow-md">
      <div className="flex h-60 items-center justify-center rounded-xl">
        <img className="h-4/5 w-4/5 object-contain" src={image} alt={name} />
      </div>
      <Link
        to={`/products/${id}`}
        className="my-1 mt-3 line-clamp-1 w-60 text-ellipsis text-lg font-medium hover:underline-offset-1"
      >
        {name}
      </Link>
      <div className="flex gap-2">
        <AiFillStar className="text-xl text-yellow-400" />
        <p className="font-medium">{rating}</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="my-1 text-xl font-medium">${price}</p>
        {user.userType === "Admin" && (
          <div className="flex items-center justify-between gap-2">
            <AiOutlineDelete
              className="cursor-pointer text-3xl text-red-500"
              onClick={handleDeleteProduct}
            />
            <FaRegEdit
              className="cursor-pointer text-2xl text-green-500"
              onClick={() => {
                console.log("EDITTTT");
              }}
            />
          </div>
        )}
      </div>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default ProductCard;
