import React from "react";

function CartItem({ productId, name, brand, quantity, price, size }) {
  return (
    <div className="mb-5 grid grid-cols-[5fr_1fr_1fr] gap-4 border-b-2 pb-2 md:mb-8 md:pb-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium md:text-xl xl:text-2xl">{name}</h2>
        <p className="text-gray-400 lg:text-lg">{brand}</p>

        <div className="flex items-center gap-5">
          <p className="lg:text-lg">Size: {size}</p>
          <button className="text-sm font-medium text-red-500">
            Remove Item
          </button>
        </div>
      </div>

      <div className="self-center justify-self-center pb-4 lg:text-lg">
        <p>{quantity}</p>
      </div>

      <h3 className="self-center justify-self-center pb-4 font-medium lg:text-xl">
        ${price}
      </h3>
    </div>
  );
}

export default CartItem;
