import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LuTruck } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import Loading from "../components/Loading";
import { fetchSingleProduct } from "../features/product/productSlice";
import { addToCart } from "../features/cart/cartSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SingleProduct() {
  const { id } = useParams();
  const { isLoading, singleProduct } = useSelector((store) => store.product);
  const { isUser } = useSelector((store) => store.user);
  const { isLoading: cartLoading } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const [size, setSize] = useState(null);
  // console.log(id);

  const notify = () => toast.success("Item added to cart!");

  const addToCartHandler = () => {
    if (!isUser) {
      console.log("Not Logged in");
      return;
    }

    if (!size) {
      console.log("Size not provided");
      return;
    }
    const tokenString = localStorage.getItem("token");
    dispatch(
      addToCart({
        productDetails: { id, size: Number(size), quantity: 1 },
        token: JSON.parse(tokenString),
      }),
    );
    notify();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setSize(null);
    dispatch(fetchSingleProduct("/" + id));
  }, [dispatch, id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !singleProduct.name) {
    return (
      <p className="my-20 text-center text-2xl text-gray-400 md:my-32">
        Sorry we can't find the product
      </p>
    );
  }
  return (
    <div className="grid grid-rows-[auto_1fr] gap-5 px-5 py-4 md:grid-cols-2 md:grid-rows-none lg:px-10 xl:gap-10">
      <section className="mx-auto flex h-96 w-full items-center justify-center self-start rounded-lg bg-stone-200 md:my-2 md:h-[70vh] lg:rounded-3xl">
        <CiImageOn className="mx-auto text-[10rem]" />
      </section>
      <section className="p-3 lg:p-8">
        <h1 className="mb-2 text-2xl font-semibold md:mb-3 md:text-3xl lg:text-4xl">
          {singleProduct.name}
        </h1>

        <div className="mb-5 flex items-center gap-2 md:mb-8">
          <FaStar className="text-xl text-yellow-400" />
          <p className="text-xl text-gray-300">{singleProduct.rating} rating</p>
        </div>

        <h1 className="mb-4 text-4xl font-semibold md:mb-5 md:text-4xl lg:text-5xl">
          ${singleProduct.price}
        </h1>

        <p className="mb-5 text-xl md:mb-8 md:text-2xl">
          Brand: {singleProduct.brand}
        </p>

        <p className="mb-1 text-gray-400 md:mb-3 md:text-xl">Select Sizes:</p>
        <div className="mb-10 flex flex-wrap gap-2 md:mb-16">
          {singleProduct.sizes?.map((item) => {
            return (
              <div
                key={item}
                onClick={() => setSize(item)}
                className={`${
                  size === item ? "bg-gray-900 text-gray-200" : "text-gray-900"
                } flex h-20 w-20 cursor-pointer items-center justify-center border-2 border-gray-400 text-lg md:text-xl`}
              >
                {item}
              </div>
            );
          })}
        </div>

        <button
          onClick={addToCartHandler}
          className="mb-3 flex items-center gap-4 rounded-2xl bg-gray-900 px-10 py-5 text-xl text-gray-200 md:mb-5 lg:px-20"
        >
          <HiOutlineShoppingBag className="text-2xl" />
          <p className={cartLoading ? "text-gray-400" : ""}>
            {cartLoading ? "Please wait..." : "Add to cart"}
          </p>
        </button>

        <div className="flex items-center gap-2 font-medium md:text-lg md:tracking-wide">
          <LuTruck className="text-xl" />
          <p>Free delivery on orders over $30.0</p>
        </div>
      </section>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default SingleProduct;
