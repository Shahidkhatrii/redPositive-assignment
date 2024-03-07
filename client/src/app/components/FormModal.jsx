import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FormCard from "./FormCard";
const FormModal = ({ isOpen, onClose, update = false, formData = null }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md relative lg:w-[30vw] w-[80vw]">
            <IconButton onClick={onClose} className="absolute top-1 right-1">
              <CloseIcon />
            </IconButton>
            <FormCard onClose={onClose} update={update} {...formData} />
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
