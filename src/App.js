import ReactDOM from "react-dom/client";
import UsersList from "./components/UsersList";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import UserDetail from "./components/UserDetail";
import ErrorPage from "./components/ErrorPage";

const AppLayout = () => {
  return (
    <>
      <Outlet />
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
root.render(<RouterProvider router={appRouter} />);
