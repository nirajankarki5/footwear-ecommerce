import React, { useEffect, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiBars3 } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchProducts,
  getProductSearchTerm,
} from "../features/product/productSlice";
import useToken from "../hooks/useToken";

function Navbar() {
  const [isNavLinkShown, setIsNavLinkShown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isToken, setIsToken] = useState(false);
  const dispatch = useDispatch();
  const { token } = useToken();

  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();

    dispatch(fetchProducts(`?searchTerm=${searchTerm}`));
    dispatch(getProductSearchTerm(searchTerm));
    navigate(`/search`);
    setIsNavLinkShown(false);
  };

  // reset search term to null when user clicks any link on navbar
  const onLinkClick = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    console.log(token);
    if (token) {
      setIsToken(true);
    }
  }, [token]);

  return (
    <nav className="flex h-20 items-center justify-between border-y-2 px-5 py-4 font-body lg:px-10">
      <Link
        to="/"
        onClick={() => {
          setIsNavLinkShown(false);
          onLinkClick();
        }}
      >
        <h1 className="p-0 text-3xl font-bold">FootWear</h1>
      </Link>
      <HiBars3
        className="cursor-pointer text-4xl md:hidden"
        onClick={() => setIsNavLinkShown(!isNavLinkShown)}
      />
      <div
        className={`${
          isNavLinkShown
            ? "absolute left-0 top-16 flex w-full flex-col gap-5 bg-white p-10 drop-shadow-md"
            : "hidden"
        }  md:flex md:w-1/2 md:justify-between lg:gap-10`}
      >
        <form className="mr-1 w-full" onSubmit={onSearchSubmit}>
          <input
            className="h-12 w-full rounded-full border-2 bg-stone-50 px-4 py-0 focus:bg-stone-100 focus:outline-none"
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <div className="flex w-60 gap-3 rounded-full border-2 px-4 py-2 md:w-auto">
          <Link
            to={"cart"}
            onClick={() => {
              setIsNavLinkShown(false);
              onLinkClick();
            }}
            className="flex cursor-pointer items-center gap-1 text-xs"
          >
            <HiOutlineShoppingBag className="text-3xl" />
            <p className="md:hidden lg:block">Cart</p>
          </Link>
          <div className="border-2"></div>
          <Link
            to={isToken ? "user" : "login"}
            onClick={() => {
              setIsNavLinkShown(false);
              onLinkClick();
            }}
            className="flex cursor-pointer items-center gap-1 text-xs"
          >
            <HiOutlineUserCircle className="text-3xl" />
            {isToken && <p className="md:hidden lg:block">My&nbsp;account</p>}
            {!isToken && <p className="md:hidden lg:block">Login</p>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
