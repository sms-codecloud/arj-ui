import { Outlet } from "react-router-dom";

const UserList = () => {
  return (
    <div>
      Inside Users List <Outlet />
    </div>
  );
};

export default UserList;
