import React from "react";

export const ModalTestComponent = ({ isModal, setDisplay }) => {
  return (
    <>
      <div>ModalTestComponent</div>
      {isModal === false && (
        <button
          onClick={() => {
            setDisplay(false);
          }}
        ></button>
      )}
    </>
  );
};
