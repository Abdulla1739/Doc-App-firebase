import React from "react";
import Background from "../Components/Background";
import Header from "../Components/Header";
import LoginRegister from "../Components/LoginRegister";
import Logo from "../assets/Logo.png";

const Home = ({ insideregister }) => {
  return (
    <div className="relative w-full h-screen bg-zinc-800">
      <Background />
      <Header />
      <div className="fixed flex w-full h-screen z-[3] top-6  bg-black/50">
        <div className="w-full  flex items-center justify-center bg-opacity-50  lg:w-1/2">
          <LoginRegister insidereg={insideregister} />
        </div>
        <div className="hidden relative lg:flex items-center justify-center h-full w-1/2 ">
          <div className="w-80 h-80 bg-gradient-to-tr from-violet-500 to-red-500 rounded-full animate-bounce"></div>
          <div className="w-full z-[5] end-0 bottom-0 absolute flex flex-col items-center justify-center h-screen   bg-black/30">
            <div className="flex justify-center items-center">
              <img className="w-20 h-20 animate-pulse" src={Logo} alt="logo" />
              <h1 className="text-white ms-2 text-5xl font-semibold">Docs. </h1>
            </div>
            <p className=" px-40 text-gray-400 font-semibold text-center text-xl mt-6 mb-10">
              This is a cutting-edge application developed using React, Material
              UI, Firebase, React Quill, React router DOM, and Tailwindcss. This
              app is designed to provide seamless and intuitive document
              management and editing functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
