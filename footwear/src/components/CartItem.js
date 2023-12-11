import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function CartItem({
  productId,
  name,
  brand,
  quantity,
  price,
  size,
  deleteCartItem,
}) {
  const [itemQty, setItemQty] = useState(quantity);

  // const updateQuantity = (method) => {
  //   if (method === "increase") {
  //     setItemQty(itemQty + 1);
  //   } else {
  //     setItemQty(itemQty - 1);
  //   }
  // };

  return (
    <div className="mb-5 grid grid-cols-[5fr_1fr_1fr] gap-4 border-b-2 pb-2 md:mb-8 md:pb-4">
      <div className="flex flex-col gap-1">
        <Link
          to={`/products/${productId}`}
          className="text-sm font-medium sm:text-lg md:text-xl xl:text-2xl"
        >
          {name}
        </Link>
        <p className="text-gray-400 lg:text-lg">{brand}</p>

        <div className="flex items-center gap-5">
          <p className="lg:text-lg">Size: {size}</p>
          <button
            onClick={() => deleteCartItem("/userCart/" + productId)}
            className="text-sm font-medium text-red-500"
          >
            Remove Item
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 self-center justify-self-center pb-4 sm:text-xl md:text-2xl">
        <IoIosArrowBack
          onClick={() => console.log("decrease")}
          className="cursor-pointer"
        />
        <p className="flex h-8 w-8 items-center justify-center border-2 border-gray-400 p-3 md:h-12 md:w-12 md:text-xl">
          {quantity}
        </p>
        <IoIosArrowForward
          onClick={() => console.log("increase")}
          className="cursor-pointer"
        />
      </div>

      <h3 className="self-center justify-self-center pb-4 text-sm font-medium sm:text-base md:text-lg lg:text-xl">
        ${price}
      </h3>
    </div>
  );
}

export default CartItem;
