import ReactDOM from "react-dom/client";
import UsersList from "./components/UsersList";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import UserDetail from "./components/UserDetail";
import ErrorPage from "./components/ErrorPage";
import { UserProvider } from "./context/userContext";
import { ModalProvider, useModal } from "./context/modalContext";
import ConfirmModal from "./components/ConfirmModal";

const AppLayout = () => {
  const { isOpen, message, confirm, closeConfirm } = useModal();
  return (
    <>
      <Outlet />
      <ConfirmModal
        isOpen={isOpen}
        message={message}
        onConfirm={confirm}
        onClose={closeConfirm}
      />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <UsersList /> },
      { path: "/users/:id", element: <UserDetail /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <ModalProvider>
      <RouterProvider router={appRouter} />
    </ModalProvider>
  </UserProvider>
);
