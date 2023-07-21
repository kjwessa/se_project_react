import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modals, setModals] = useState({
    create: false,
    preview: false,
    register: false,
    login: false,
    edit: false,
    delete: false,
  });

  function openModal(name) {
    setModals((prev) => ({ ...prev, [name]: true }));
  }

  function closeModals() {
    setModals({
      create: false,
      preview: false,
      register: false,
      login: false,
      edit: false,
      delete: false,
    });
  }

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModals }}>
      {children}
    </ModalContext.Provider>
  );
}
