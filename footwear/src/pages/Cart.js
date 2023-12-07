import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart } from "../features/cart/cartSlice";
import Loading from "../components/Loading";
import CartItem from "../components/CartItem";

function Cart() {
  const { isLoading, cart, networkError } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    dispatch(
      fetchUserCart({ url: "/userCart", token: JSON.parse(tokenString) }),
    );
  }, [dispatch]);

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
            <section className="mb-5 grid grid-cols-[1fr_auto_auto] gap-4 pt-4 text-lg text-gray-400">
              <h2>ITEM</h2>
              <h2>QUANTITY</h2>
              <h2>PRICE</h2>
            </section>

            {cart?.map((item) => {
              return <CartItem key={item.productId} {...item} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
