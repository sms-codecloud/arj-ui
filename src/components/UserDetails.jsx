import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useUserInfo from "../context/userContext.jsx";
import Spinner from "./Spinner.jsx";
import "./styles/userEdit.css";

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

  if (!user)
    return (
      <>
        <Spinner size={60} color="#e74c3c" overlay={true} />
      </>
    );

  const { firstName, lastName, email, phoneNo, address } = user;

  return (
    <div className="user-edit-card">
      <h3>User Details</h3>
      <div className="section">
        <p>
          <strong>Full Name:</strong> {`${firstName} ${lastName}`}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone:</strong> {phoneNo}
        </p>
      </div>
      <div className="section">
        <h4>Address</h4>
        <p>{address}</p>
      </div>

      <div className="section">
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default UserDetails;
