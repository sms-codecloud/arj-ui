import { Outlet } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { useModal } from "../context/modalContext.jsx";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const { isOpen, message, confirm, closeConfirm } = useModal();

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        message={message}
        onConfirm={confirm}
        onClose={closeConfirm}
      />
      <ToastContainer position="top-center" />
      <Outlet />
    </>
  );
};

export default Layout;
