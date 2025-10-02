import { FaEye, FaEdit, FaTrash, FaGripLinesVertical } from "react-icons/fa";
import { Link } from "react-router";
import useUserInfo from "../context/userContext";
import { useModal } from "../context/modalContext";

const UsersList = () => {
  const { userList, deleteUser, isLoading } = useUserInfo();
  const { openConfirm } = useModal();

  const handleDelete = (id) => {
    openConfirm("Are you sure you want to delete this user?", () => {
      deleteUser(id);
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h4>Users List</h4>
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
            {userList &&
              userList.map((ul) => (
                <tr key={ul.id}>
                  <td>{ul.name}</td>
                  <td>{ul.email}</td>
                  <td>{ul.phone}</td>
                  <td>
                    <Link to={`/users/${ul.id}`} title="View Details">
                      <FaEye color="gray" />
                    </Link>

                    <FaGripLinesVertical />

                    <FaEdit color="#007bff" title="Edit" />

                    <FaGripLinesVertical />

                    <FaTrash
                      color="red"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(ul.id)}
                      title="Delete"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;
