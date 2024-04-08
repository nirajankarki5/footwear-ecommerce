import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { fetchOrders } from "../features/order/orderSlice";

function AdminOrders() {
  const { isLoading, orders } = useSelector((store) => store.order);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    const tokenString = localStorage.getItem("token");
    dispatch(fetchOrders(JSON.parse(tokenString)));
    document.title = "My Orders";
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return (
      <h1 className="my-20 text-center text-4xl font-medium">
        There are no orders
      </h1>
    );
  }

  return (
    <div className="m-4 xl:w-4/5">
      <h1 className="m-4 text-3xl font-semibold lg:mt-8">Order List</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {!isLoading &&
          orders.map((order) => (
            <div
              key={order._id}
              className="h-min rounded bg-white p-4 shadow-md"
            >
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="font-semibold">Order ID:</td>
                    <td>{order._id}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">User ID:</td>
                    <td>{order.userId}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Products:</td>
                    <td>
                      <ul className="ml-5 list-disc">
                        {order.products.map((product) => (
                          <li key={product._id}>
                            <Link
                              to={`/products/${product.productId}`}
                              className="text-sm leading-4 text-blue-800"
                            >
                              {product.name}, &nbsp;
                              <span className="font-semibold">
                                Size: {product.size}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Total Cost:</td>
                    <td>${order.totalCost.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Shipping Address:</td>
                    <td>{order.shippingAddress}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Status:</td>
                    <td>{order.status}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Created At:</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => {}}
                  className="focus:shadow-outline rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-700 focus:outline-none"
                >
                  Approve
                </button>
                <button
                  onClick={() => {}}
                  className="focus:shadow-outline rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-700 focus:outline-none"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminOrders;
