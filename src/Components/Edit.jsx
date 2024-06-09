import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Container, Button, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { FaEdit, FaPlus } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "#fff",
  border: "2px solid #000",
  color: "#000 !important",
  boxShadow: 24,
  borderRadius: "40px",
  p: 4,
};

const Edit = ({ insideDashNew, insideViewEdit, insideV, docsdata }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newDocsTitle, setNewDocsTitle] = useState("");
  const [newDocsDesc, setNewDocsDesc] = useState("");
  const [userid, setUserid] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const docsCollectionsRefs = collection(db, "Docs");

  useEffect(() => {
    setUserid(localStorage.getItem("currentUserid"));

    if (id) {
      const fetchDoc = async () => {
        const docRef = doc(db, "Docs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNewDocsTitle(data.Titles);
          setNewDocsDesc(data.Descriptions);
        } else {
          console.error("No such document!");
        }
      };
      fetchDoc();
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      if (id) {
        const docRef = doc(db, "Docs", id);
        await updateDoc(docRef, {
          Titles: newDocsTitle,
          Descriptions: newDocsDesc,
          userId: userid,
        });
      } else {
        await addDoc(docsCollectionsRefs, {
          Titles: newDocsTitle,
          Descriptions: newDocsDesc,
          userId: userid,
        });
        setNewDocsTitle("");
        setNewDocsDesc("");
      }
      if (docsdata) {
        docsdata();
      }
      setOpen(false);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
  ];

  return (
    <div>
      {insideDashNew && (
        <button
          onClick={handleOpen}
          className="flex justify-center items-center bg-transparent hover:bg-green-500 text-white py-2 lg:py-3 px-3 border border-green-500 hover:border-transparent rounded-full"
        >
          <FaPlus className="me-3 lg:me-0" />
          {insideV ? " Add" : ""}
        </button>
      )}

      {insideViewEdit && (
        <button
          onClick={handleOpen}
          className="flex justify-center items-center bg-transparent hover:bg-yellow-500 text-white py-2 lg:py-3 px-3 border border-yellow-500 hover:border-transparent rounded-full"
        >
          <FaEdit className="me-3 lg:me-0" />
          {insideV ? " Edit" : ""}
        </button>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container>
            <Typography variant="h4" gutterBottom>
              {id ? "Edit Document" : "New Document"}
            </Typography>
            <TextField
              label="Title"
              value={newDocsTitle}
              onChange={(e) => setNewDocsTitle(e.target.value)}
              fullWidth
              margin="normal"
            />

            <ReactQuill
              modules={{ toolbar: toolbarOptions }}
              theme="snow"
              value={newDocsDesc || ""}
              onChange={setNewDocsDesc}
              rows="2"
            />
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Save
            </Button>
          </Container>
        </Box>
      </Modal>
    </div>
  );
};

export default Edit;
