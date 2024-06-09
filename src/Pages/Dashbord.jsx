import React, { useEffect, useRef, useState } from "react";
import Background from "../Components/Background";
import Card from "../Components/Card";
import Header from "../Components/Header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/firebase";

const Dashbord = () => {
  const ref = useRef(null);
  const [docList, setDoclist] = useState([]);
  const docsCollectionsRefs = collection(db, "Docs");
  const localUserId = localStorage.getItem("currentUserid");

  const getDocList = async () => {
    try {
      const data = await getDocs(docsCollectionsRefs);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setDoclist(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDocList();
  }, []);

  let userfilterData = docList?.filter((item) => item?.userId == localUserId);

  return (
    <div className="relative w-full h-screen bg-zinc-800">
      <Background />
      <Header insideDash={true} fetchData={getDocList} />
      <div
        ref={ref}
        className="fixed z-[3] top-20 bottom-10 left-0 w-full flex gap-8 flex-wrap px-3 pb-2"
        style={{ overflowY: "scroll", height: "100%" }}
      >
        {userfilterData.length > 0 ? (
          userfilterData.map((data) => (
            <div key={data?.id}>
              <Card reference={ref} displayData={data} />
            </div>
          ))
        ) : (
          <div className="font-semibold text-red-700 text-center w-full text-3xl ">
            <i>No Docs? Create new by pressing '+' !!!</i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashbord;
