import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart } from "../features/cart/cartSlice";
import Loading from "../components/Loading";
import CartItem from "../components/CartItem";

function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const { isLoading, cart, networkError } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const calculateTotalPrice = useCallback(() => {
    let sum = 0;
    cart.forEach((each) => (sum += each.quantity * each.price));
    setTotalPrice(sum);
  }, [cart]);

  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    dispatch(
      fetchUserCart({ url: "/userCart", token: JSON.parse(tokenString) }),
    );
  }, [dispatch]);

  useEffect(() => {
    calculateTotalPrice();
  }, [calculateTotalPrice]);

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
              return <CartItem key={item.productId} {...item} />;
            })}

            <h2 className="flex justify-between text-xl font-medium md:text-2xl lg:text-3xl">
              <p>Total Price:</p>
              <p>${totalPrice}</p>
            </h2>
          </div>

          <div className="my-5 text-center lg:my-10">
            <button className="border-2 border-red-500 px-10 py-3 text-red-500 lg:px-16 lg:text-lg">
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
