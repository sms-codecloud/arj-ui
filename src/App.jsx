import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/Error";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <UserList />,
      errorElement: <Error />,
      children: [
        { path: "/user", element: <UserDetails /> },
        { path: "/users", element: <UserList /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
