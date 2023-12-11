import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setCart } from "../features/cart/cartSlice";

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
  const dispatch = useDispatch();

  const baseUrl = "http://localhost:5000/api/cart";

  const updateQty = useCallback(async () => {
    try {
      const response = await fetch(baseUrl + "/userCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // This is required!!!
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({ id: productId, size, quantity: itemQty }),
      });
      const data = await response.json();

      // In order to update total price, we have to dispatch above data and set to the cart value in cartSlice
      dispatch(setCart(data.products));
    } catch (error) {
      console.log(error);
      return;
    }
  }, [itemQty, productId, size, dispatch]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      updateQty();
    }, 2000);

    return () => clearTimeout(timeOut);
  }, [updateQty]);

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
          onClick={() => {
            if (itemQty > 1) {
              setItemQty(itemQty - 1);
            }
          }}
          className="cursor-pointer"
        />
        <p className="flex h-8 w-8 items-center justify-center border-2 border-gray-400 p-3 md:h-12 md:w-12 md:text-xl">
          {itemQty}
        </p>
        <IoIosArrowForward
          onClick={() => setItemQty(itemQty + 1)}
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
