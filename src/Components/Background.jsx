import React from "react";

const Background = () => {
  return (
    <>
      <div className="fixed z-[2] w-full h-screen bg-zinc-800">
        <h1 className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[13vw] leading-none tracking-tighter font-semibold text-zinc-900">
          Docs.
        </h1>
      </div>
    </>
  );
};

export default Background;
