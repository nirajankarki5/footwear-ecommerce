import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="font-body grid grid-rows-2 justify-between bg-stone-900 p-6 py-8 text-gray-300 lg:grid-cols-2 lg:grid-rows-1 lg:gap-8 lg:p-10 lg:py-12">
      <section className="text-sm lg:text-lg">
        <h1 className="text-2xl font-semibold lg:text-3xl">FootWear</h1>
        <p className="my-5 md:text-base">
          Footwear was designed and founded in 2023. It's main goal is to
          provide all sorts of products to individuals looking to get a new pair
          of sneakers.
        </p>
      </section>
      <section className="mt-2 grid grid-cols-3 justify-between lg:text-lg">
        <div>
          <h1 className="mb-4 text-xl font-medium lg:text-2xl">Products</h1>
          <div className="flex flex-col gap-2 text-sm text-gray-300 md:text-base lg:text-lg">
            <p>All Products</p>
            <p>Shoes</p>
            <p>Apparel</p>
          </div>
        </div>
        <div>
          <h1 className="mb-4 text-xl font-medium lg:text-2xl">Collections</h1>
          <div className=" flex flex-col gap-2 text-sm text-gray-300 md:text-base lg:text-lg">
            <p>Nike</p>
            <p>Under Armour</p>
            <p>New Balance</p>
          </div>
        </div>
        <div>
          <h1 className="mb-4 text-xl font-medium lg:text-2xl">Support</h1>
          <div className="flex flex-col gap-2 text-sm text-gray-300 md:text-base lg:text-lg">
            <p>Contact us</p>
            <p>Give feedback</p>
            <p>Help center</p>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
