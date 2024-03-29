import React from "react";
import { SyncLoader } from "react-spinners";

const ConfirmationModal = ({ props }) => {
  const {
    name,
    onclickFn,
    id,
    confirmationPopup,
    isConfirmationPopup,
    isFetching = false,
  } = props;
  return (
    <div className="fixed flex justify-center items-center z-10 top-0 bottom-0 my-auto left-0 right-0 mx-auto  bg-[#0000005a] ">
      <div className="flex  flex-col place-content-between w-[20rem] h-[15rem] mobile:w-[30rem] mobile:h-[15rem] p-4 text-center bg-white shadow-lg border-2 border-[#ff0000d4] rounded-lg ">
        <div className="py-4">
          <p className=" tracking-wide text-base mobile:text-xl font-semibold pb-5">
            Are you sure you want to delete this item ?
          </p>
          <p className=" text-sm mobile:text-lg tracking-wide ">
            {`'${name}'`}
          </p>
        </div>

        <div
          className={`${
            isFetching ? "hidden" : "flex"
          } gap-4 justify-center py-4`}
        >
          <button
            className="px-4 py-2 bg-[#ff0000d4] text-white rounded-md"
            onClick={() => onclickFn(id)}
          >
            Confirm
          </button>
          <button
            onClick={() => {
              confirmationPopup(isConfirmationPopup);
            }}
            className="px-4 py-2 bg-white border-2 border-[#ff0000d4] rounded-md"
          >
            Cancel
          </button>
        </div>
        <SyncLoader
          className=" mx-auto mb-10"
          size={7}
          color="#ff0000d4"
          loading={isFetching}
        />
      </div>
    </div>
  );
};

export default ConfirmationModal;
