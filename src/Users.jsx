import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([null]);
  const [isAdmin, setIsAdmin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  function fetchUserData() {
    const token = localStorage.getItem("token");

    if (isAdmin) {
      // Fetch data for admin user
      axios
        .get("http://localhost:3001/patients/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setIsAdmin(true);
          setUsers(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      // Fetch data for non-admin user
      axios
        .get("http://localhost:3001/patients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setIsAdmin(false);
          setUsers(res.data);
        })
        .catch((err) => console.log(err));
    }
  }

  const handleDeleteUser = (id) => {
    const token = localStorage.getItem("token");
  
    axios
      .delete(`http://localhost:3001/deleteUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Message:", res.data.message);
          console.log("Deleted User:", res.data.deletedUser);
          fetchUserData();
        } else {
          console.error("Unexpected status code:", res.status);
          console.error("Response data:", res.data);
        }
      })
      .catch((err) => {
        console.error(err);
  
        if (err.response) {
          console.error("Error status code:", err.response.status);
          console.error("Error response data:", err.response.data);
        } else {
          console.error("Unexpected error occurred");
        }
      });
  };
  
       

  const handleUpdateUser = (id) => {
    axios
      .put(
        `http://localhost:3001/updateUser/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // Fetch the updated data and update the state
        fetchUserData();
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:3001/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="vh-100 bg-primary">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <Link className="navbar-brand" to="/user">
            Users
          </Link>
          <button className="btn btn-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-59 bg-white rounded p-3">
          {isAdmin && (
            <Link to="/create" className="btn btn-success mb-3">
              Add +
            </Link>
          )}
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Action1</th>
                <th>Action2</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user?._id}>
                  <td>{user?.name}</td>
                  <td>{user?.age}</td>
                  <td>{user?.gender}</td>
                  <td>
                    {isAdmin && user && (
                      <Link
                        to={`/update/${user._id}`}
                        className="btn btn-success"
                        onClick={(e) => handleUpdateUser(user._id)}
                      >
                        Update
                      </Link>
                    )}
                  </td>
                  <td>
                    {isAdmin && user && (
                      <button
                        className="btn btn-danger"
                        onClick={(e) => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default memo(Users);
