import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import "./styles/userDetails.css";
import useUserInfo from "../context/userContext.jsx";

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

  if (!user) return <div>Loading...</div>;

  const { firstName, lastName, email, phoneNo, address } = user;

  return (
    <div className="user-card">
      <p>
        <strong>Username:</strong> {`${firstName} ${lastName}`}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Phone:</strong> {phoneNo}
      </p>
      <div className="section">
        <h3>Address</h3>
        <p>{address}</p>
      </div>

      <div className="section">
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default UserDetails;
