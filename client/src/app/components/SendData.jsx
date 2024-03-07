import React from "react";
import SendIcon from "@mui/icons-material/Send";
const SendData = ({ sendMail, loading }) => {
  return (
    <>
      <button
        onClick={sendMail}
        className="w-fit flex items-center self-end gap-1 px-3 py-2 text-base font-semibold text-white no-underline align-middle bg-blue-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 hover:bg-blue-700 hover:border-blue-700 hover:opacity-90 active:opacity-100 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700"
      >
        {loading ? (
          "Sending..."
        ) : (
          <>
            Send <SendIcon />
          </>
        )}
      </button>
    </>
  );
};

export default SendData;
