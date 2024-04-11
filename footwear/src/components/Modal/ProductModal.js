/*
Submitted By :
  Ajay Shrestha (C0885384)  
  Gaurab Pokharel (C0886046)
  Nirajan Karki (C0885390)
  Sakar Thapa (C0890972)
*/

import React from "react";
import AdminAddProduct from "../../pages/AdminAddProduct";
import { useSearchParams } from "react-router-dom";

const ProductModal = ({ setShowModal, edit }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 h-full w-full bg-gray-900 opacity-50"></div>

      <div
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className="absolute left-0 top-0 z-[5000] w-full items-center justify-center overflow-y-auto overflow-x-hidden rounded-lg md:mx-auto"
      >
        <div className="fixed m-2 h-full overflow-y-scroll rounded-md bg-white md:left-[50%] md:mx-auto md:w-2/3 md:translate-x-[-50%] lg:w-[50rem]">
          <div className="relative mb-2 rounded-lg bg-white p-2 shadow dark:bg-gray-800 sm:p-5">
            <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-2">
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
                    if (searchParams.has("product")) {
                      searchParams.delete("product");
                      setSearchParams(searchParams);
                    }
                    setShowModal(false);
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

            <AdminAddProduct edit={edit} setShowModal={setShowModal} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
