import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
import ProductCard from "../components/ProductCard";
import shoeImg from "../assets/images/shoes-home.jpg";
import BlackButton from "../components/BlackButton";
import Loading from "../components/Loading";

function Home() {
  const { products, isLoading } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts("/"));
  }, [dispatch]);

  return (
    <>
      <section className="my-10 text-center sm:my-14 lg:my-20">
        <h1 className=" text-3xl font-medium md:text-4xl lg:text-5xl">
          Shop Your Favourite Brand
        </h1>
        <p className="my-3 leading-6 text-gray-400 md:my-4 md:text-lg lg:my-5 lg:text-xl">
          We have a bunch of collection for you!, Let's go explore and find your
          dream shoes.
        </p>
      </section>

      <section>
        {isLoading && <Loading />}
        {!isLoading && products.length === 0 && (
          <p className="mb-10 text-center text-2xl text-gray-300">
            No products
          </p>
        )}

        {!isLoading && products.length > 0 && (
          <div className="mx-auto mb-20 grid w-[85%] gap-5 sm:w-[95%] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        )}
      </section>

      <div className="text-center">
        <BlackButton>View More</BlackButton>
      </div>

      <section className="my-10 text-center sm:my-14 lg:my-20">
        <h1 className=" text-3xl font-medium md:text-4xl lg:text-5xl">
          The Official Store Of The Amazing Brand
        </h1>
        <p className="my-3 leading-6 text-gray-400 md:my-4 md:text-lg lg:my-5 lg:text-xl">
          We work together with the high quality and famous brand around the
          world.
        </p>
      </section>

      <section className="relative m-10 overflow-hidden rounded-3xl bg-stone-900 text-center text-gray-200 sm:my-14 lg:my-20">
        <img
          src={shoeImg}
          alt="shoe"
          className="h-72 w-full object-cover opacity-20 md:h-96"
        />
        <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
          <h1 className=" z-10 text-xl font-medium sm:text-2xl md:text-4xl lg:text-5xl">
            BRINGING YOU TO UPDATE FANTASTIC FOOTWEAR
          </h1>
          <p className="mdleading-6 my-3 text-sm leading-5 text-gray-400 sm:text-base md:my-4 md:text-lg lg:my-5 lg:text-xl">
            View all brands of our collection on FootWear, there is another
            collection. Please check it out.
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
