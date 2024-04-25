import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <section className="my-10 text-center sm:my-14 lg:my-20">
      <h1 className=" text-3xl font-medium md:text-4xl lg:text-5xl">
        404 Not Found!!!
      </h1>
      <p className="my-3 leading-6 text-gray-400 md:my-4 md:text-lg lg:my-5 lg:text-xl">
        The page you are looking for can not be found.
        <br />
        <Link to={"/"} className="mt-5 inline-block text-blue-600 underline">
          Go to home page
        </Link>
      </p>
    </section>
  );
}

export default Error;
