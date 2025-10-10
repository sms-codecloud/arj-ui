import { Link, useParams } from "react-router";
import "./styles/userEdit.css";
import useUserInfo from "../context/userContext.jsx";
import { useEffect, useState } from "react";

const UserEdit = () => {
  const { id } = useParams();
  const { getUserById } = useUserInfo();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserById(id);
      setUser(data);
    };
    fetchUser();
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-edit-card">
      <h3>Edit User</h3>
      <form>
        <div className="section">
          <label>First Name</label>
          <input name="name" value={user?.firstName} />

          <label>Last Name</label>
          <input name="username" value={user?.lastName} />

          <label>Email</label>
          <input name="email" value={user?.email} />

          <label>Phone</label>
          <input name="phone" value={user?.phoneNo} />
        </div>

        <div className="section">
          <h4>Address</h4>
          <textarea name="address.street" value={`${user?.address}`} />
        </div>
        <div className="actions">
          <button type="submit">Save</button>
          <Link to="/" style={{ padding: "10px" }}>
            Back to List
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
