import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Background from "../Components/Background";
import { Container } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Config/firebase";
import { useParams } from "react-router-dom";

const View = () => {
  const [docs, setDocs] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const docRef = doc(db, "Docs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDocs(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDoc();
  }, [id]);

  return (
    <>
      <Background />
      <Header insideView={true} docId={id} />
      <div
        style={{
          position: "fixed",
          top: "73px",
          zIndex: 5,
          width: "100%",
          color: "black",
          height: "89vh",
        }}
      >
        <Container
          style={{
            backgroundColor: "white",
            overflowY: "scroll",
            height: "100%",
            padding: "5em",
            borderRadius: "10px",
          }}
        >
          <h1 className="text-5xl font-semibold text-start">{docs?.Titles}</h1>
          <p
            className="font-medium text-lg text-gray-500 mt-4"
            dangerouslySetInnerHTML={{ __html: docs?.Descriptions }}
          />
        </Container>
      </div>
    </>
  );
};

export default View;
