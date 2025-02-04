import { createPortal } from "react-dom";
import { ReactNode, useEffect, useState } from "react";

interface ModalProps {
  children: ReactNode;
  handleCloseModal: () => void;
}

export default function Modal({ children, handleCloseModal }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
        <div className="modal-container">
          <button onClick={handleCloseModal} className="modal-underlay" />
          <div className="modal-content">{children}</div>
        </div>,
        document.getElementById("portal") as HTMLElement
      )
    : null;
}
