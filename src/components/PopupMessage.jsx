import React, { useEffect, useState } from "react";

const PopupMessage = ({ message }) => {
  const [popupMessage, setPopupMessage] = useState(message.message);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPopupMessage(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [popupMessage]);

  return (
    popupMessage && (
      <div
        className={` fixed z-[2] shadow-lg flex justify-center items-center left-0 right-0 mx-auto top-20 w-fit min-h-[3rem] p-3 bg-white rounded-md border-2 text-gray-700  ${
          message.success ? "border-[#0bdb00]" : "border-[#ff0000]"
        }`}
      >
        <p>{popupMessage}</p>
      </div>
    )
  );
};

export default PopupMessage;
