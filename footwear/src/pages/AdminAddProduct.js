import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../features/product/productSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAddProduct = ({ edit = false }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    desc: "",
    rating: "",
    brand: "",
    sizes: [],
    image: "",
  });

  const { isLoading } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  //   Toast notification
  const notifyAdded = () => toast.success("Product has been added");
  const notifyError = () => toast.error("Error occured");
  const notifySizeError = () => toast.error("Please add size");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSizeChange = (e) => {
    const { value } = e.target;
    const newSize = parseFloat(value);
    if (!product.sizes.includes(newSize)) {
      setProduct({ ...product, sizes: [...product.sizes, newSize].sort() });
    } else {
      setProduct({
        ...product,
        sizes: product.sizes.filter((size) => size !== newSize),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product.sizes.length === 0) {
      notifySizeError();
      return;
    }
    const status = await dispatch(addProduct(product));
    if (status === "success") {
      notifyAdded();
    } else {
      notifyError();
    }

    setProduct({
      name: "",
      price: "",
      desc: "",
      rating: "",
      brand: "",
      sizes: [],
      image: "",
    });
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded bg-white px-8 pb-8 pt-6"
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="name"
            type="text"
            placeholder="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="price"
            type="number"
            placeholder="Price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="desc"
          >
            Description
          </label>
          <textarea
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="desc"
            placeholder="Product Description"
            name="desc"
            value={product.desc}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="rating"
          >
            Rating
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="rating"
            type="number"
            step=".1"
            max="5"
            placeholder="Rating"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="brand"
          >
            Brand
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="brand"
            type="text"
            placeholder="Brand"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Sizes
          </label>
          <div className="flex flex-wrap">
            {Array.from({ length: 15 }, (_, i) => i / 2 + 7).map((size) => (
              <label key={size} className="mb-2 mr-4 inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-gray-600"
                  value={size}
                  onChange={handleSizeChange}
                  checked={product.sizes.includes(size)}
                />
                <span className="ml-2 text-gray-700">{size}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="image"
          >
            Image
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="image"
            type="text"
            placeholder="Image URL"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`focus:shadow-outline rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none ${
              isLoading && "disabled"
            }`}
            type="submit"
          >
            {isLoading ? "Loading..." : "Add Product"}
          </button>
        </div>
        <ToastContainer position="bottom-left" />
      </form>
    </div>
  );
};

export default AdminAddProduct;
