import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../../utils/apiCalls";
import deleteButton from "../../images/delete.png";
import Logout from "../UserDashboardComponents/Logout";
import AdminNav from "./AdminNav";
import "../../css/app.css";
import "../../css/dashboard.css";
import "../../css/myQuotes.css";
import "../../css/Admin/users.css";

export default function Users() {
  const [userList, setUserList] = useState([]);
  const [resStatus, setResStatus] = useState(false);

  useEffect(() => {
    getUsers();
  }, [userList]);

  async function getUsers() {
    try {
      const response = await getAllUsers();
      setUserList(response.data);
      if (response.status === 200) {
        setResStatus(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='dashboard-body'>
      <div className='header'>
        <AdminNav />
        <Logout />
      </div>
      <div className='dashboard-body'>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>User Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>E-Mail</th>
                <th>Phone Number</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <>
                {resStatus
                  ? userList.map((user, index) => (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>
                          <img
                            className='delete-img'
                            src={deleteButton}
                            alt='delete'
                            onClick={() => deleteUser(user.id)}
                          />
                        </td>
                      </tr>
                    ))
                  : null}
              </>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
