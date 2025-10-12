import { FaEye, FaEdit, FaTrash, FaGripLinesVertical } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useUserInfo from "../context/userContext.jsx";
import { useModal } from "../context/modalContext.jsx";
import Spinner from "./Spinner.jsx";

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
    return (
      <div className="spinner-wrapper">
        <Spinner size={60} color="#3498db" overlay={true} />
      </div>
    );
  }

  return (
    <section className="users-list-container">
      <div className="users-list-header">
        <h2>Users List - Test Pipeline</h2>
        <button className="btn add-user-btn" onClick={handleAddUser}>
          Add User
        </button>
      </div>

      <table className="users-table" aria-label="Users List Table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col" className="actions-column">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 ? (
            userList.map((user) => (
              <tr key={user.employeeId}>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.phoneNo}</td>
                <td className="actions-cell">
                  <Link
                    to={`/user-details/${user.employeeId}`}
                    aria-label={`View details of ${user.firstName} ${user.lastName}`}
                    className="action-icon view-icon"
                  >
                    <FaEye size={18} />
                  </Link>

                  <FaGripLinesVertical
                    className="divider-icon"
                    aria-hidden="true"
                  />

                  <Link
                    to={`/user-edit/${user.employeeId}`}
                    aria-label={`Edit ${user.firstName} ${user.lastName}`}
                    className="action-icon edit-icon"
                  >
                    <FaEdit size={18} />
                  </Link>

                  <FaGripLinesVertical
                    className="divider-icon"
                    aria-hidden="true"
                  />

                  <FaTrash
                    onClick={() => handleDelete(user.employeeId)}
                    className="action-icon delete-icon"
                    aria-label={`Delete ${user.firstName} ${user.lastName}`}
                    size={18}
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
    </section>
  );
};

export default UsersList;
