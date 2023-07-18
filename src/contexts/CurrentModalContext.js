import React, { createContext, useState } from "react";

export const ModalsContext = createContext();

export function ModalsProvider({ children }) {
  // State and functions here
  const [isOpen, setIsOpen] = useState("");

  function openModal(name) {
    setIsOpen(name);
  }

  function closeModals() {
    setIsOpen("");
  }

  return (
    <ModalsContext.Provider value={{ isOpen, openModal, closeModals }}>
      {children}
    </ModalsContext.Provider>
  );
}
