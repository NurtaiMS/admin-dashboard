import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/users/${id}`);
      setUser(response.data);
    } catch (error) {
      toast.error('Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading user details...</div>;
  if (!user) return <div className="alert alert-danger">User not found</div>;

  return (
    <div>
      <h2 className="mb-4">User Details</h2>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5>Personal Information</h5>
              <table className="table">
                <tbody>
                  <tr>
                    <th>Name:</th>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th>Role:</th>
                    <td>
                      <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                        {user.role}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>User ID:</th>
                    <td>{user.id}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-3">
            <Link to="/users" className="btn btn-secondary me-2">Back</Link>
            <Link to={`/users/${user.id}/edit`} className="btn btn-warning">Edit</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;