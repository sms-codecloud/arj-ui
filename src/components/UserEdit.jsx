import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useUserInfo from "../context/userContext.jsx";
import { validateForm } from "../utils/validateForm.jsx";
import Spinner from "./Spinner.jsx";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUserById, updateUserById } = useUserInfo();

  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserById(id);
      if (data) {
        setUser(data);
      }
    };
    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(user);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSaving(true);
    const success = await updateUserById(user);
    setIsSaving(false);
    setUser(null);

    if (success) {
      navigate("/");
    }
  };

  if (!user)
    return (
      <>
        <Spinner size={60} color="#3498db" overlay={true} />
      </>
    );

  return (
    <div className="user-edit-card">
      <h3>Edit User</h3>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          name="firstName"
          value={user.firstName || ""}
          onChange={handleInputChange}
          className={errors.firstName ? "error" : ""}
        />
        {errors.firstName && (
          <span className="error-text">{errors.firstName}</span>
        )}

        <label>Last Name</label>
        <input
          name="lastName"
          value={user.lastName || ""}
          onChange={handleInputChange}
          className={errors.lastName ? "error" : ""}
        />
        {errors.lastName && (
          <span className="error-text">{errors.lastName}</span>
        )}

        <label>Email</label>
        <input
          name="email"
          value={user.email || ""}
          onChange={handleInputChange}
          className={errors.email ? "error" : ""}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}

        <label>Phone</label>
        <input
          name="phoneNo"
          value={user.phoneNo || ""}
          onChange={handleInputChange}
          maxLength={10}
          className={errors.phoneNo ? "error" : ""}
        />
        {errors.phoneNo && <span className="error-text">{errors.phoneNo}</span>}

        <h4>Address</h4>
        <textarea
          name="address"
          value={user.address || ""}
          onChange={handleInputChange}
          className={errors.address ? "error" : ""}
        />
        {errors.address && <span className="error-text">{errors.address}</span>}

        <div className="actions">
          <button type="submit" className="user-btn" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </button>

          <Link to="/" style={{ padding: "10px" }}>
            Back to List
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
