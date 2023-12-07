import React from "react";

function Cart() {
  return (
    <div className="px-5 py-4 lg:px-10">
      <h1 className="my-4 text-4xl font-medium">Your Shopping Cart</h1>

      <section className="grid grid-cols-[1fr_auto_auto] gap-4 pt-4 text-lg text-gray-400">
        <h2>ITEM</h2>
        <h2>QUANTITY</h2>
        <h2>PRICE</h2>
      </section>
    </div>
  );
}

export default Cart;
