import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants.jsx";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/EmployeeList`);
        const data = await response.json();
        setUserList(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserById = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/EmployeeById/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch user by ID:", error);
      return null;
    }
  };

  const deleteUser = async (id) => {
    try {
      const userDelete = await fetch(`${BASE_URL}/api/EmployeeDelete/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!userDelete.ok) {
        throw new Error(`HTTP error! status: ${userDelete.status}`);
      }
      setUserList((prevList) =>
        prevList.filter((user) => user.employeeId !== id)
      );
    } catch (error) {
      console.error("Failed to fetch user by ID:", error);
      return null;
    }
  };

  return (
    <UserContext.Provider
      value={{ userList, deleteUser, isLoading, getUserById }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserInfo = () => {
  return useContext(UserContext);
};

export default useUserInfo;
