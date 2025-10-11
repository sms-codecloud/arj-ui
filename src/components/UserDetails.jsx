import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useUserInfo from "../context/userContext.jsx";
import Spinner from "./Spinner.jsx";

const UserDetails = () => {
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

  if (!user) {
    return <Spinner size={60} color="#3498db" overlay={true} />;
  }

  const { firstName, lastName, email, phoneNo, address } = user;

  return (
    <div className="user-details-card">
      <h3>User Details</h3>

      <p>
        <strong>Full Name:</strong> {firstName} {lastName}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Phone:</strong> {phoneNo}
      </p>
      <p>
        <strong>Address:</strong> {address}
      </p>

      <div className="actions">
        <Link to="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default UserDetails;
