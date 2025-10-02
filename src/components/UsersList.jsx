import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaGripLinesVertical } from "react-icons/fa";
import ConfirmModal from "./ConfirmModal";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router";

const UsersList = () => {
  const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}/users`);
      const data = await response.json();
      setUserList(data);
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    setSelectedUserId(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    setUserList((prevList) => prevList.filter((x) => x.id !== selectedUserId));
    setShowConfirm(false);
    setSelectedUserId(null);
  };

  const handleCloseModal = () => {
    setShowConfirm(false);
    setSelectedUserId(null);
  };

   if(userList.length===0){
      return <div>Loading...</div>
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
