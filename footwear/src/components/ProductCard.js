import React from "react";
import { AiFillStar, AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../features/product/productSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductCard({
  _id: id,
  name,
  price,
  desc,
  rating,
  brand,
  image,
  setShowModal,
}) {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Show edit button to modal popup in page other page except homepage
  // Admin can only edit product in Search Screen or Our Product page
  const location = useLocation(); // React Hook
  console.log(location.pathname);

  //   Toast notification
  const notifyDeleted = () => toast.success("Product has been deleted");

  const handleDeleteProduct = async () => {
    dispatch(deleteProduct(id));
    notifyDeleted();
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl p-3 shadow-md">
        <Link to={`/products/${id}`}>
          <div className="flex h-60 items-center justify-center rounded-xl">
            <img
              className="h-4/5 w-4/5 object-contain"
              src={image}
              alt={name}
            />
          </div>
          <p className="my-1 mt-3 line-clamp-1 w-60 text-ellipsis text-lg font-medium hover:underline-offset-1">
            {name}
          </p>
          <div className="flex gap-2">
            <AiFillStar className="text-xl text-yellow-400" />
            <p className="font-medium">{rating}</p>
          </div>
        </Link>

        <div className="flex items-center justify-between">
          <p className="my-1 text-xl font-medium">${price}</p>
          {user.userType === "Admin" && location.pathname !== "/" && (
            <div className="flex items-center justify-between gap-2">
              <AiOutlineDelete
                className="cursor-pointer text-3xl text-red-500"
                onClick={handleDeleteProduct}
              />
              <FaRegEdit
                id="defaultModalButton"
                data-modal-target="defaultModal"
                data-modal-toggle="defaultModal"
                className="cursor-pointer text-2xl text-green-500"
                onClick={() => {
                  setShowModal(true);
                  setSearchParams({ product: id });
                }}
              />
            </div>
          )}
        </div>

        <ToastContainer position="bottom-left" />
      </div>
    </>
  );
}

export default ProductCard;
