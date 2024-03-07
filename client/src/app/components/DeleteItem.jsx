import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "./DeleteModal";
import api from "../api/appApi";
import { useFetchContext } from "../context/fetchContext";
const DeleteItem = ({ _id }) => {
  const { fetchAgain, setFetchAgain } = useFetchContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleDelete = async () => {
    try {
      await api.delete(`api/deleteRow?id=${_id}`);
      closeModal();
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error?.message);
    }
  };
  return (
    <>
      <Tooltip title="Delete" arrow>
        <IconButton onClick={openModal}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default DeleteItem;
