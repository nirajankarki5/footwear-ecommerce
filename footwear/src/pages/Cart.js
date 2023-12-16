import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  fetchUserCart,
  setNetworkError,
} from "../features/cart/cartSlice";
import Loading from "../components/Loading";
import CartItem from "../components/CartItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const { isUser } = useSelector((store) => store.user);
  const { isLoading, cart, networkError } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const notify = () => toast.success("Item removed!");

  const calculateTotalPrice = useCallback(() => {
    let sum = 0;
    cart?.forEach((each) => (sum += each.quantity * each.price));
    return sum.toFixed(2);
  }, [cart]);

  // delete individual items or clear whole cart based on url(api)
  const deleteCartItem = async (url) => {
    const tokenString = localStorage.getItem("token");
    const data = await dispatch(
      deleteCart({
        url: url,
        token: JSON.parse(tokenString),
      }),
    );

    if (data === "success") {
      // fetch cart again after deleting items
      dispatch(
        fetchUserCart({ url: "/userCart", token: JSON.parse(tokenString) }),
      );
      // display alert message
      notify();
    }
  };

  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    // reset network error to null
    dispatch(setNetworkError(null));
    dispatch(
      fetchUserCart({ url: "/userCart", token: JSON.parse(tokenString) }),
    );
  }, [dispatch]);

  // useEffect(() => {
  // calculateTotalPrice();
  // }, [calculateTotalPrice]);

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

  return (
    <>
      {isLoading && <Loading />}
      {networkError && (
        <p className="my-10 text-center text-xl text-gray-400">
          {networkError}
        </p>
      )}

      {!isLoading && !networkError && (
        <div className="px-5 py-4 lg:px-10">
          <h1 className="my-5 text-4xl font-medium">Your Shopping Cart</h1>

          <div className="md:mx-20 lg:mx-auto lg:max-w-4xl">
            <section className="mb-5 grid grid-cols-[5fr_1fr_1fr] gap-4 pt-4 text-lg text-gray-400">
              <h2>ITEM</h2>
              <h2 className="justify-self-center">QUANTITY</h2>
              <h2 className="justify-self-center">PRICE</h2>
            </section>

            {cart?.map((item) => {
              return (
                <CartItem
                  deleteCartItem={deleteCartItem}
                  key={item.productId}
                  {...item}
                />
              );
            })}

            <h2 className="my-8 flex justify-between text-xl font-medium md:text-2xl lg:text-3xl">
              <p>Total Price:</p>
              <p>${calculateTotalPrice()}</p>
            </h2>

            <div className="my-5 grid grid-cols-2 gap-1 text-center text-lg lg:my-10 lg:text-xl">
              <button className="bg-gray-900 text-gray-200">Checkout</button>
              <button
                onClick={() => deleteCartItem("/deleteCart")}
                className="border-2 border-red-500 px-10 py-3 text-red-500 lg:px-16 lg:py-5 lg:text-lg"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-left" />
    </>
  );
}

export default Cart;
