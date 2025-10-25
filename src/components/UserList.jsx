import { useMemo, useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaGripLinesVertical } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useUserInfo from "../context/userContext.jsx";
import { useModal } from "../context/modalContext.jsx";
import Spinner from "./Spinner.jsx";
import { PAGE_SIZE, NO_RECORDS_FOUND } from "../utils/constants.jsx";
import Pagination from "./Pagination.jsx";

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const { userList, deleteUser, isLoading } = useUserInfo();
  const { openConfirm } = useModal();

  const totalRecords = userList?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalRecords / PAGE_SIZE)); // ensure at least 1 page
  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const currentData = useMemo(() => {
    return userList.slice(startIndex, endIndex);
  }, [userList, currentPage]);

  // Adjust pagination when total pages change after delete
  useEffect(() => {
    const newTotalPages = Math.max(1, Math.ceil(userList.length / PAGE_SIZE));
    if (currentPage >= newTotalPages) {
      setCurrentPage(newTotalPages - 1);
    }
  }, [userList, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    openConfirm("Are you sure you want to delete this user?", () => {
      deleteUser(id);
    });
  };

  const handleAddUser = () => {
    navigate("/add-user");
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
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
        <h2>ARJ Enrollment</h2>
        <button className="user-btn" onClick={handleAddUser}>
          Add User
        </button>
      </div>

      <div className="table-responsive">
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
            {currentData.length > 0 ? (
              currentData.map((user) => (
                <tr key={user.employeeId}>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNo}</td>
                  <td className="actions-cell">
                    <Link
                      to={`/user-details/${user.employeeId}`}
                      className="action-icon view-icon"
                    >
                      <FaEye size={18} />
                    </Link>

                    <FaGripLinesVertical className="divider-icon" />

                    <Link
                      to={`/user-edit/${user.employeeId}`}
                      className="action-icon edit-icon"
                    >
                      <FaEdit size={18} />
                    </Link>

                    <FaGripLinesVertical className="divider-icon" />

                    <FaTrash
                      onClick={() => handleDelete(user.employeeId)}
                      className="action-icon delete-icon"
                      size={18}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="no-records">
                  {NO_RECORDS_FOUND}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination always visible if there's at least 1 record */}
      {totalRecords > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
        />
      )}
    </section>
  );
};

export default UsersList;
