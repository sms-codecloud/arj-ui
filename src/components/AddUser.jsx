import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { validateForm } from "../utils/validateForm.jsx";
import "./styles/userEdit.css";
import useUserInfo from "../context/userContext.jsx";

const AddUser = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    address: "",
  });

  const { createUser } = useUserInfo();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    setIsSaving(true);
    const success = await createUser(formData);
    setIsSaving(false);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      address: "",
    });

    if (success) {
      navigate("/");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="user-edit-card">
      <h3>Add User</h3>
      <form onSubmit={handleSubmit}>
        <div className="section">
          <label htmlFor="firstName">
            First Name <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            className={errors.firstName ? "error" : ""}
            onChange={(e) => handleInputChange(e)}
          />
          {errors.firstName && (
            <span className="error-text">{errors.firstName}</span>
          )}

          <label htmlFor="displayName">
            Last Name <span className="asterisk">*</span>
          </label>
          <input
            name="lastName"
            id="lastName"
            value={formData.displayName}
            className={errors.lastName ? "error" : ""}
            onChange={(e) => handleInputChange(e)}
          />
          {errors.lastName && (
            <span className="error-text">{errors.lastName}</span>
          )}

          <label htmlFor="email">
            Email<span className="asterisk">*</span>
          </label>
          <input
            name="email"
            id="email"
            className={errors.email ? "error" : ""}
            value={formData.email}
            onChange={(e) => handleInputChange(e)}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}

          <label htmlFor="phoneNo">
            Phone <span className="asterisk">*</span>
          </label>
          <input
            name="phoneNo"
            id="phoneNo"
            className={errors.phoneNo ? "error" : ""}
            value={formData.phoneNo}
            onChange={(e) => handleInputChange(e)}
            max={10}
          />
          {errors.phoneNo && (
            <span className="error-text">{errors.phoneNo}</span>
          )}
        </div>

        <div className="section">
          <label htmlFor="address">
            Address <span className="asterisk">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            className={errors.address ? "error" : ""}
            onChange={(e) => handleInputChange(e)}
          />
          {errors.address && (
            <span className="error-text">{errors.address}</span>
          )}
        </div>

        <div className="actions">
          <button type="submit" disabled={isSaving}>
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

export default AddUser;
