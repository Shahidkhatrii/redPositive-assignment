import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const DeleteModal = ({ isOpen, onClose, handleDelete }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md relative lg:w-[20vw] w-[60vw]">
            <IconButton onClick={onClose} className="absolute top-1 right-1">
              <CloseIcon />
            </IconButton>
            <p className="text-3xl my-6">Are you sure?</p>

            <div className="flex justify-center gap-8 mb-4">
              <button
                onClick={onClose}
                className="w-fit flex items-center self-end gap-1 px-3 py-2 text-base font-semibold text-white no-underline align-middle bg-blue-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 hover:bg-blue-700 hover:border-blue-700 hover:opacity-90 active:opacity-100 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="w-fit flex items-center self-end gap-1 px-3 py-2 text-base font-semibold text-white no-underline align-middle bg-red-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 hover:bg-red-700 hover:border-red-700 hover:opacity-90 active:opacity-100 hover:text-white focus-within:bg-red-700 focus-within:border-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
