import React, { useState } from "react";
import Modal from "../components/Modal.jsx";
import { ModalTestComponent } from "../components/ModalTestComponent.jsx";

export const IndexPage = () => {
  const [active, setActive] = useState(false);
  const isModal = true;
  const toggle = () => {
    setActive(!active);
  };

  return (
    <>
      <h1 className="text-4xl">Index Page</h1>
      <button onClick={toggle}>Abrir modal</button>
      {toggle && (
        <Modal active={active} toggle={toggle} onRequestClose={toggle}>
          <ModalTestComponent isModal={isModal} />
        </Modal>
      )}
    </>
  );
};
