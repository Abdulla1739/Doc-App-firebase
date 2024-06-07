import { SiGoogledocs } from "react-icons/si";
import { CiMenuKebab } from "react-icons/ci";
import React, { useState } from 'react';
import { motion } from "framer-motion";



const Card = ({reference}) => {

        const [isOn, setIsOn] = useState(false);
      
        const handleToggle = () => {
            setIsOn((prevIsOn) => !prevIsOn);
        };
  return (
    <>
      <motion.div drag dragConstraints={reference} whileDrag={{scale:1.2}} dragElastic={0.1} className="relative flex-shrink-0 w-56 h-72 bg-zinc-900/90 rounded-[45px] text-white px-8 py-10 overflow-hidden">
        <div className=" flex justify-between items-center  ">
        <SiGoogledocs/>
        <div
      onClick={handleToggle}
      className={`relative w-8 h-4 rounded-full cursor-pointer transition-colors ${
        isOn ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      <div
        className={`absolute w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
          isOn ? 'translate-x-4' : ''
        }`}
      ></div>
    </div>
        
        </div>
        <div className="cursor-pointer">
          <h6 className="text-lg font-semibold mt-5  leading-tight text-justify">Title</h6>
          
          <p className="text-sm mt-3 leading-tight text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, optio!</p>
        </div>
        {!isOn ?
            (
                <div className="footer absolute bottom-0 bg-red-500 w-full py-3 left-0 flex items-center justify-center cursor-pointer">
                    <h3 className="text-sm font-semibold">Not Completed</h3>


        </div>

            ):(
              <div className="footer absolute bottom-0 bg-green-500 w-full py-3 left-0 flex items-center justify-center cursor-pointer">
              <h3 className="text-sm font-semibold">Completed</h3>


  </div>

            )
            }





      </motion.div>
    </>
  );
};

export default Card;
