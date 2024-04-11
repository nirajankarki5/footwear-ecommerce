import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { fetchOrders, updateOrderStatus } from "../features/order/orderSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminOrders() {
  const { isLoading, orders } = useSelector((store) => store.order);
  const dispatch = useDispatch();

  // Toast Notification
  const notifySuccess = () => toast.success("Success");

  const handleStatusChange = async (orderStatus, orderId) => {
    const status = await dispatch(
      updateOrderStatus({
        updatedStatus: orderStatus,
        orderId,
        token: JSON.parse(localStorage.getItem("token")),
      }),
    );

    if (status === "success") {
      notifySuccess();
      const tokenString = localStorage.getItem("token");
      dispatch(fetchOrders(JSON.parse(tokenString)));
    }
  };

  console.log(orders);
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
            <div key={order._id} className="rounded bg-white p-4 shadow-md">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="font-semibold">User:</td>
                    <td>{order.userId.email}</td>
                  </tr>
                  {/* <tr>
                    <td className="font-semibold">User ID:</td>
                    <td>{order.userId}</td>
                  </tr> */}
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
                            </Link>
                            <p className="text-xs font-semibold">
                              Size: {product.size + " "}
                              <span className="font-semibold">
                                Quantity: {product.quantity}
                              </span>
                            </p>
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
                    <td
                      className={`font-semibold ${
                        order.status === "Pending"
                          ? "text-yellow-500"
                          : order.status === "Rejected"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {order.status}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Created At:</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
              {order.status === "Pending" && (
                <div className="mt-4 flex items-end justify-between self-end">
                  <button
                    onClick={() => {
                      handleStatusChange("Approved", order._id);
                    }}
                    className="rounded border-2 border-green-500 px-4 py-2 font-semibold text-green-500 hover:bg-green-500 hover:text-white"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange("Rejected", order._id);
                    }}
                    className="rounded border-2 border-red-500 px-4 py-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default AdminOrders;
