import React from "react";
import { Link } from "react-router-dom";

function AdminOrders() {
  const orders = [
    {
      _id: "661305eb8e38710562926993",
      userId: "66104ac011222741897df6a4",
      products: [
        {
          productId: "661041896d75c70949e45a13",
          name: "Boys' Grade School UA Charged Rogue 3 Running Shoes",
          image:
            "https://m.media-amazon.com/images/I/71R779vIZ2L._AC_SX695_.jpg",
          brand: "Under Armour",
          quantity: 1,
          price: 59.99,
          size: 7,
          _id: "661305c98e38710562926975",
        },
        {
          productId: "661041896d75c70949e45a14",
          name: "Women's UA Glyde RM Softball Cleats",
          image:
            "https://m.media-amazon.com/images/I/51k0a5YbBrL._AC_SY695_.jpg",
          brand: "Under Armour",
          quantity: 1,
          price: 39.99,
          size: 8.5,
          _id: "661305d08e3871056292697f",
        },
      ],
      totalCost: 112.98,
      shippingAddress: "kathmandu",
      billingAddress: "kathmandu",
      status: "Pending",
      createdAt: "2024-04-07T20:45:31.195Z",
      updatedAt: "2024-04-07T20:45:31.195Z",
      __v: 0,
    },
    {
      _id: "6613061f8e387105629269ba",
      userId: "66104ac011222741897df6a4",
      products: [
        {
          productId: "661041896d75c70949e45a0e",
          name: "Nike Air Force 1 '07 Update",
          image:
            "https://m.media-amazon.com/images/I/51LLTTw8GJL._AC_SX695_.jpg",
          brand: "Nike",
          quantity: 1,
          price: 115,
          size: 7,
          _id: "661306178e387105629269ae",
        },
      ],
      totalCost: 129.95,
      shippingAddress: "sad",
      billingAddress: "asdf",
      status: "Pending",
      createdAt: "2024-04-07T20:46:23.258Z",
      updatedAt: "2024-04-07T20:46:23.258Z",
      __v: 0,
    },
  ];

  return (
    <div className="m-4 xl:w-2/3">
      <h1 className="m-4 text-3xl font-semibold lg:mt-8">Order List</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {orders.map((order) => (
          <div key={order._id} className="h-min rounded bg-white p-4 shadow-md">
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
                        <li>
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
