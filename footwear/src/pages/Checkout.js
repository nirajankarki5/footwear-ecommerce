import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserCart, removeCart } from "../features/cart/cartSlice";
import Loading from "../components/Loading";
import { createOrder } from "../features/order/orderSlice";

const Checkout = () => {
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(null);
  const [error, setError] = useState("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const { isUser, user } = useSelector((store) => store.user);
  const { isLoading, cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const handleOrder = async (e) => {
    e.preventDefault();

    const orderData = {
      userId: user._id,
      products: cart,
      totalCost: totalPrice * 1,
      billingAddress: billingAddress,
      shippingAddress: shippingAddress,
    };

    if (!billingAddress || !shippingAddress) {
      setError("Please enter both address!");
      return;
    }

    const status = await dispatch(
      createOrder({
        orderDetails: orderData,
        token: JSON.parse(localStorage.getItem("token")),
      }),
    );
    if (status === "success") {
      setIsOrderPlaced(true);
      // also remove cart

      dispatch(removeCart(JSON.parse(localStorage.getItem("token"))));
    }
  };

  useEffect(() => {
    let sum = 0;
    cart?.forEach((each) => (sum += each.quantity * each.price));
    setTotalPrice((sum * 1.13).toFixed(2));
  }, [cart]);

  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    dispatch(
      fetchUserCart({ url: "/userCart", token: JSON.parse(tokenString) }),
    );
  }, [dispatch]);

  if (!isUser) {
    return (
      <p className="my-10 text-center text-xl text-gray-400">
        Please login to continue
      </p>
    );
  }

  if (cart?.length === 0) {
    return (
      <h1 className="my-20 text-center text-4xl font-medium">
        Your cart is empty
      </h1>
    );
  }

  if (isOrderPlaced) {
    return (
      <p className="my-10 text-center text-xl text-gray-400">
        Thank you for your order. View your orders in{" "}
        <Link to={"/user"} className="text-blue-600 underline">
          {" "}
          your profile
        </Link>
      </p>
    );
  }

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div>
          <h1 className="mx-2 my-5 text-4xl font-medium">Checkout</h1>
          <form
            onSubmit={handleOrder}
            className="m-4 rounded-md p-4 shadow-sm sm:mx-auto sm:w-2/3 md:w-1/2 xl:w-1/3"
          >
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700 md:text-lg"
                htmlFor="name"
              >
                Enter Billing address
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="billindAddress"
                type="text"
                placeholder="Your billing address"
                name="name"
                value={billingAddress}
                onChange={(e) => {
                  setBillingAddress(e.target.value);
                  setError("");
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700 md:text-lg"
                htmlFor="name"
              >
                Enter Shipping address
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="billindAddress"
                type="text"
                placeholder="Your billing address"
                name="name"
                value={shippingAddress}
                onChange={(e) => {
                  setShippingAddress(e.target.value);
                  setError("");
                }}
                required
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <h2 className="my-8 flex justify-between text-xl font-medium md:text-2xl lg:text-3xl">
              <p>Total Price (inc tax):</p>
              <p>${totalPrice}</p>
            </h2>
            <div className="my-5 grid grid-cols-2 gap-1 text-center text-lg lg:my-10 lg:text-xl">
              <button
                onClick={handleOrder}
                type="submit"
                className="flex items-center justify-center bg-gray-900 text-gray-200"
              >
                Order
              </button>
              <Link
                to={-1}
                className="border-2 border-red-500 px-10 py-3 text-red-500 lg:px-16 lg:py-5 lg:text-lg"
              >
                Back to Cart
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Checkout;
