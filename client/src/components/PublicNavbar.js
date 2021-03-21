import React from "react";
import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <div className="h-24 bg-green-100 w-full grid md:grid-cols-3 text-gray-700 items-center justify-center px-4 relative sm:grid-cols-1">
      <ul className="flex space-x-3 font-light">
        <Link to="/signin">
          <li className="navbar-nav-link border-r border-green-300 pr-2 hover:text-gray-400">
            <i class="fas fa-sign-in-alt mr-2"></i>Sign In
          </li>
        </Link>
        <Link to="/register">
          <li className="navbar-nav-link border-r border-green-300 pr-2 hover:text-gray-400">
            Register
          </li>
        </Link>
        <li>
          <i class="fas fa-search"></i>Search
        </li>
      </ul>
      <div className="text-4xl justify-self-center mx-auto">KA.A.YO</div>
      <div className="justify-self-end">
        <Link to="/cart">
          <i class="fas fa-shopping-cart hover:text-gray-400"></i>
        </Link>
      </div>
    </div>
  );
};

export default PublicNavbar;
