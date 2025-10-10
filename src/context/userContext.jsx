import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants.jsx";
import { toast } from "react-toastify";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch users when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Centralized fetch for all users
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/EmployeeList`);
      if (!response.ok) {
        throw new Error(`Failed to fetch users. Status: ${response.status}`);
      }

      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get user by ID
  const getUserById = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/EmployeeById/${id}`);
      if (!res.ok) {
        throw new Error(`User not found (status ${res.status})`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      toast.error(
        "Failed to fetch user details. Please refresh and try again."
      );
      return null;
    }
  };

  // Update user details
  const updateUserById = async (data) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/EmployeeUpdate/${data.employeeId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to update user. Status: ${response.status}, Details: ${errorText}`
        );
      }

      toast.success("User updated successfully!");
      await fetchData();
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
      return false;
    }
  };

  // Create user
  const createUser = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/api/EmployeeSave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to create user. Status: ${response.status}, Details: ${errorText}`
        );
      }

      toast.success("User created successfully!");
      await fetchData();
      return true;
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user. Please try again.");
      return false;
    }
  };

  // Delete user safely
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/EmployeeDelete/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete user. Status: ${response.status}, Details: ${errorText}`
        );
      }

      setUserList((prevList) =>
        prevList.filter((user) => user.employeeId !== id)
      );
      toast.success("User deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        userList,
        deleteUser,
        isLoading,
        getUserById,
        updateUserById,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// ✅ Hook for consuming user context
const useUserInfo = () => useContext(UserContext);

export default useUserInfo;
