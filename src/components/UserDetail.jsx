import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import './UserDetail.css';
import { BASE_URL } from "../utils/constants";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${BASE_URL}/users/${id}`);
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, [id]);

  if (!user) return <div>Loading...</div>;

  const {
    name,
    username,
    email,
    phone,
    address,
    company,
  } = user;

  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <div className="section">
        <h3>Address</h3>
        <p>{address.street}, {address.suite}</p>
        <p>{address.city} - {address.zipcode}</p>
        <p><strong>Geo:</strong> {address.geo.lat}, {address.geo.lng}</p>
      </div>

      <div className="section">
        <h3>Company</h3>
        <p><strong>Name:</strong> {company.name}</p>
        <p><em>{company.catchPhrase}</em></p>
        <p>{company.bs}</p>
      </div>

      <div className="section">
        <Link to="/">Back to Home</Link>        
      </div>
    </div>
  );
};

export default UserDetail;
