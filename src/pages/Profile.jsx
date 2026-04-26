import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [lastVisit, setLastVisit] = useState(null);

  useEffect(() => {
    const visit = localStorage.getItem('lastVisit');
    if (visit) {
      setLastVisit(new Date(visit).toLocaleString());
    }
  }, []);

  return (
    <div>
      <h2 className="mb-4">👤 My Profile</h2>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5>Profile Information</h5>
              <table className="table">
                <tbody>
                  <tr>
                    <th>Name:</th>
                    <td>{user?.name}</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>{user?.email}</td>
                  </tr>
                  <tr>
                    <th>Role:</th>
                    <td>
                      <span className={`badge ${user?.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                        {user?.role}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Account Status:</th>
                    <td><span className="badge bg-success">Active</span></td>
                  </tr>
                  <tr>
                    <th>User ID:</th>
                    <td>{user?.id}</td>
                  </tr>
                  <tr>
                    <th>Last Visit:</th>
                    <td>{lastVisit || 'First time visit'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;