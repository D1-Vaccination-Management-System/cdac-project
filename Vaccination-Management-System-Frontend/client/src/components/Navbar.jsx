import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Main wrapper div for the Navbar */}
        <div className="w-full flex justify-between items-center space-x-4">
          {/* 1st div: Logo and Company Name */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/4191/4191422.png"
                className="h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                VacciCare
              </span>
            </Link>
          </div>

          {/* 2nd div: Navbar links */}
          <div
            className="flex items-center  justify-between text-2xl"
            id="navbar-user "
          >
            <ul className="flex space-x-8 font-medium p-0 border-none bg-transparent">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-blue-700 dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block py-2 px-3 text-gray-900 dark:text-white"
                >
                  About
                </Link>
              </li>

              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-black pt-2 font-medium rounded-lg text-center inline-flex items-center text-2xl"
                >
                  Services
                  <svg
                    className={`w-2.5 h-2.5 ml-3 transform transition-transform mt-1 ${
                      isDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div
                    id="dropdown"
                    className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Consult a Doctor
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Book an Appointment
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-gray-900 dark:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* 4th div: SignIn Button */}
          <div className="ml-auto">
            <div className="flex gap-4">
              <button className="transition-all duration-500 ease-in-out border-2 border-black text-black bg-transparent py-3 px-6 font-sans text-center uppercase leading-4 text-[17px] rounded-2xl outline-none hover:bg-blue-500 hover:text-white hover:border-transparent">
                Log in
              </button>

              <button className="transition-all duration-500 ease-in-out border-2 border-black text-black bg-transparent py-3 px-6 font-sans text-center uppercase leading-4 text-[17px] rounded-2xl outline-none hover:bg-blue-500 hover:text-white hover:border-transparent">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
