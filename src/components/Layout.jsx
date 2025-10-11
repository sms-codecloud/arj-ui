import { Outlet } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { useModal } from "../context/modalContext.jsx";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

const Layout = () => {
  const { isOpen, message, confirm, closeConfirm } = useModal();

  return (
    <>
      <Header />
      <div className="content">
        <ConfirmModal
          isOpen={isOpen}
          message={message}
          onConfirm={confirm}
          onClose={closeConfirm}
        />
        <ToastContainer position="top-center" />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
