import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaGripLinesVertical } from "react-icons/fa";
import ConfirmModal from "./ConfirmModal";

const UsersList = () => {
  const [userList, setUserList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("https://jsonplaceholder.typicode.com/users");
      const dataJson = await data.json();
      setUserList(dataJson);
    };
    fetchData();
  }, []);

  //   const handleDelete = (id) => {
  //     const confirmDelete = window.confirm(
  //       "Are you sure you want to delete this record?"
  //     );
  //     if (confirmDelete) {
  //       const data = userList?.filter((x) => x.id !== id);
  //       setUserList(data);
  //     }
  //   };

  // Open modal when delete icon clicked
  const handleDelete = (id) => {
    setSelectedUserId(id);
    setShowConfirm(true);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    setUserList((prevList) => prevList.filter((x) => x.id !== selectedUserId));
    setShowConfirm(false);
    setSelectedUserId(null);
  };

  // Cancel delete
  const handleCloseModal = () => {
    setShowConfirm(false);
    setSelectedUserId(null);
  };

  return (
    <>
      <div>
        <h4>UsersList</h4>
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
                    <FaEye color="gray" /> <FaGripLinesVertical />
                    <FaEdit color="#007bff" /> <FaGripLinesVertical />
                    <FaTrash color="red" style={{cursor:"pointer"}} onClick={() => handleDelete(ul.id)} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this record?"
      />
    </>
  );
};

export default UsersList;
