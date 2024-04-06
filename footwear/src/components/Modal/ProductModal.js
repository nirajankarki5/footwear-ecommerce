import React from "react";
import AdminAddProduct from "../../pages/AdminAddProduct";

const ProductModal = ({ setShowModal }) => {
  return (
    <>
      <div className="m-5 flex justify-center">
        <button
          id="defaultModalButton"
          data-modal-target="defaultModal"
          data-modal-toggle="defaultModal"
          className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hidden rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
          type="button"
        >
          Create product
        </button>
      </div>

      <div className="fixed left-0 right-0 top-0 z-50 h-full w-full bg-gray-900 opacity-50"></div>

      <div
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className="left-0 z-50 translate-y-[-60%] items-center justify-center overflow-y-auto overflow-x-hidden sm:w-max sm:translate-y-[-50%] md:inset-0 md:h-full md:translate-x-[-30%] lg:translate-x-[-100%] lg:translate-y-0 xl:translate-x-[-80%]"
      >
        <div className="relative h-full w-full max-w-2xl md:h-auto">
          <div className="relative rounded-lg bg-white p-2 shadow dark:bg-gray-800 sm:p-5">
            <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Product
              </h3>
              <button
                type="button"
                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    setShowModal(false);
                    console.log("TEST");
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <AdminAddProduct />
            {/* <form action="#">
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Type product name"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="brand"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Product brand"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="$2999"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Write product description here"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
              >
                <svg
                  className="-ml-1 mr-1 h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add new product
              </button>
            </form>  */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
