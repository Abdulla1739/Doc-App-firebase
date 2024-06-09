import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { IoMdLogOut } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth, db } from "../Config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import "./Header.css";
import Edit from "./Edit";

const Header = ({ insideDash, insideView, docId, fetchData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.localStorage.removeItem("currentUserid");
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const handleDelete = async () => {
    if (!docId) {
      console.error("No document ID provided");
      return;
    }
    try {
      await deleteDoc(doc(db, "Docs", docId));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="navbar fixed w-full z-10 bg-black text-white p-3 md:p-3 flex justify-between items-center">
      <a
        href="/"
        className="brand flex items-center font-bold text-lg md:text-xl"
      >
        <img className="logo w-8 h-8 mr-2" src={Logo} alt="logo" />
        Docs.
      </a>
      {/* {insideDash && (
        <div className="hidden md:flex items-center w-full justify-center ">
          <div className="search-box flex items-center bg-gray-800 p-1 rounded-full w-full max-w-md">
            <input type="text" placeholder="Search Title ..." className="bg-transparent border-none outline-none text-white w-full px-2 " />
            <img src={searchw} alt="search" className="w-4 h-4 cursor-pointer" />
          </div>
        </div>
      )} */}

      {insideDash || insideView ? (
        <div className="hidden md:flex items-center space-x-4">
          {insideDash && <Edit insideDashNew={true} docsdata={fetchData} />}
          {insideView && <Edit insideViewEdit={true} docsdata={fetchData} />}
          {insideView && (
            <button
              onClick={handleDelete}
              className="bg-transparent hover:bg-red-500 text-white py-3 px-3 border border-red-500 hover:border-transparent rounded-full"
            >
              <MdDeleteForever />
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-transparent hover:bg-violet-700 text-white font-semibold py-2 px-4 border border-violet-500 hover:border-transparent rounded-full flex items-center"
          >
            Logout
            <IoMdLogOut className="ml-2" />
          </button>
        </div>
      ) : null}

      {insideDash || insideView ? (
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      ) : null}

      {isMenuOpen && (
        <div className="absolute top-12 left-0 w-full bg-black flex flex-col items-center space-y-4 p-4 md:hidden">
          {/* {insideDash && (
            <div className="search-box flex items-center bg-gray-800 p-2 rounded-full w-full max-w-md mx-4">
              <input type="text" placeholder="Search Title ..." className="bg-transparent border-none outline-none text-white w-full px-2" />
              <CiSearch />
            </div>
          )} */}

          <div className="btnGrp flex flex-col items-center space-y-4">
            {insideDash && (
              <Edit insideDashNew={true} insideV={true} docsdata={fetchData} />
            )}
            {insideView && (
              <Edit insideV={true} insideViewEdit={true} docsdata={fetchData} />
            )}
            {insideView && (
              <button
                onClick={handleDelete}
                className="flex justify-center items-center bg-transparent hover:bg-red-500 text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full"
              >
                <MdDeleteForever className="me-3" /> Delete
              </button>
            )}
            <button
              onClick={handleLogout}
              className="bg-transparent hover:bg-violet-700 text-white font-semibold py-2 px-4 border border-violet-500 hover:border-transparent rounded-full flex items-center"
            >
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
