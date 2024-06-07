import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import searchw from "../assets/search-w.png";
import { FaPlus } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import "./Header.css";

const Header = ({ insideDash }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar fixed w-full z-10 bg-black text-white p-3 md:p-3  flex justify-between items-center">
      <a
        href="/"
        className="brand flex items-center font-bold text-lg md:text-xl"
      >
        <img className="logo w-8 h-8 mr-2" src={Logo} alt="logo" />
        Docs.
      </a>
      {insideDash && (
        <div className="hidden md:flex items-center w-full justify-center ">
          <div className="search-box flex items-center bg-gray-800 p-1 rounded-full w-full max-w-md">
            <input
              type="text"
              placeholder="Search Title ..."
              className="bg-transparent border-none outline-none text-white w-full px-2 "
            />
            <img
              src={searchw}
              alt="search"
              className="w-4 h-4 cursor-pointer"
            />
          </div>
        </div>
      )}

      {insideDash && (
        <div className="hidden md:flex items-center space-x-4">
          <button className="bg-transparent hover:bg-yellow-500 text-white py-3 px-3 border border-yellow-500 hover:border-transparent rounded-full">
            <FaPlus />
          </button>
          <button className="bg-transparent hover:bg-red-700 text-white font-semibold py-2 px-4 border border-red-500 hover:border-transparent rounded-full flex items-center">
            Logout
            <IoMdLogOut className="ml-2" />
          </button>
        </div>
      )}
      {insideDash && (
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      )}

      {isMenuOpen && (
        <div className="absolute top-12 left-0 w-full bg-black flex flex-col items-center space-y-4 p-4 md:hidden">
          <div className="search-box flex items-center bg-gray-800 p-2 rounded-full w-full max-w-md mx-4">
            <input
              type="text"
              placeholder="Search Title ..."
              className="bg-transparent border-none outline-none text-white w-full px-2"
            />
            <CiSearch />
          </div>
          <div className="btnGrp flex flex-col items-center space-y-4">
            <button className="bg-transparent hover:bg-yellow-500 text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded-full">
              <FaPlus />
            </button>
            <button className="bg-transparent hover:bg-red-700 text-white font-semibold py-2 px-4 border border-red-500 hover:border-transparent rounded-full flex items-center">
              Logout
              <IoMdLogOut className="ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
