import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrder } from "../features/order/orderSlice";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const UserOrder = () => {
  const { isLoading, order } = useSelector((store) => store.order);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    const tokenString = localStorage.getItem("token");
    dispatch(fetchUserOrder(JSON.parse(tokenString)));
    document.title = "My Orders";
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="mx-2 my-5 text-4xl font-medium">My Orders</h1>
      <div className="m-2 rounded-lg p-4 shadow-md md:mx-20 lg:mx-auto lg:max-w-5xl">
        <div className="mb-5 flex justify-between">
          <p className="text-lg font-semibold md:text-xl">
            Order Date: {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p
            className={`font-semibold ${
              order.status === "Pending"
                ? "text-yellow-500"
                : order.status === "Rejected"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {order.status}
          </p>
        </div>
        {!isLoading &&
          order.products?.map((product) => (
            <div
              key={product._id}
              className=" mb-2 grid grid-cols-[1fr_6fr_1fr] gap-4 md:pb-2"
            >
              <div className="w-14 self-center md:w-20">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="flex flex-col gap-1">
                <Link
                  to={`/products/${product.productId}`}
                  className="text-sm font-medium sm:text-lg md:text-xl"
                >
                  {product.name}
                </Link>

                <div className="flex items-center gap-5 text-sm md:text-base">
                  <p className="text-xs text-gray-400 sm:text-base">
                    {product.brand}
                  </p>
                  <p className="lg:text-lg">Size: {product.size}</p>
                </div>
              </div>
              <p className="self-center">Quantity: {product.quantity}</p>
            </div>
          ))}

        <h2 className="mt-4 flex justify-between text-sm font-medium text-gray-500 md:text-base lg:text-lg">
          <p>Shipping Address:</p>
          <p>{order.shippingAddress}</p>
        </h2>

        <h2 className="flex justify-between font-medium md:text-xl lg:text-2xl">
          <p>Total Price (inc tax):</p>
          <p>${order.totalCost}</p>
        </h2>
      </div>
    </>
  );
};

export default UserOrder;
