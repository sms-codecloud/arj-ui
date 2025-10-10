import { FaEye, FaEdit, FaTrash, FaGripLinesVertical } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useUserInfo from "../context/userContext.jsx";
import { useModal } from "../context/modalContext.jsx";

const UsersList = () => {
  const { userList, deleteUser, isLoading } = useUserInfo();
  const { openConfirm } = useModal();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    openConfirm("Are you sure you want to delete this user?", () => {
      deleteUser(id);
    });
  };

  const handleAddUser = () => {
    navigate("/add-user");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h3>Users List</h3>
        <button className="add-user-btn" onClick={() => handleAddUser()}>
          Add User
        </button>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.length > 0 ? (
              userList.map((user) => (
                <tr key={user.employeeId}>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNo}</td>
                  <td>
                    <Link
                      to={`/employee/${user.employeeId}`}
                      title="View Details"
                    >
                      <FaEye color="gray" />
                    </Link>

                    <FaGripLinesVertical />

                    <Link to={`/users/${user.employeeId}/edit`} title="Edit">
                      <FaEdit color="#007bff" />
                    </Link>

                    <FaGripLinesVertical />

                    <FaTrash
                      color="red"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(user.employeeId)}
                      title="Delete"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="no-records">
                  No records found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;
