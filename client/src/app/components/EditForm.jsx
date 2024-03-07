import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FormModal from "./FormModal";
const EditForm = ({ formData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Tooltip title="Edit" arrow>
        <IconButton onClick={openModal}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <FormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        update={true}
        formData={formData}
      />
    </>
  );
};

export default EditForm;
