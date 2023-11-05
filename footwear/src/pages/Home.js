import React, { useEffect } from "react";

function Home() {
  const fetchProducts = async () => {
    const response = await fetch("http://localhost:5000/api/products");
    const data = await response.json();

    console.log(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="font-body ">
      <section className="my-10 text-center md:my-12 lg:my-14">
        <h1 className=" text-3xl font-medium md:text-4xl lg:text-5xl">
          Shop Your Favourite Brand
        </h1>
        <p className="my-3 leading-6 text-gray-400 md:my-4 md:text-lg lg:my-5 lg:text-xl">
          We have a bunch of collection for you!, Let's go explore and find your
          dream shoes.
        </p>
      </section>

      <section></section>
    </div>
  );
}

export default Home;
