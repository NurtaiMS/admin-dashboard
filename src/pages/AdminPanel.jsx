import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersRes = await api.get('/users');
      setUsers(usersRes.data);
      
      setStats({
        total: usersRes.data.length,
        admins: usersRes.data.filter(u => u.role === 'admin').length,
        users: usersRes.data.filter(u => u.role === 'user').length
      });
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const toggleRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    
    try {
      await api.patch(`/users/${userId}`, { role: newRole });
      toast.success(`User role updated to ${newRole}`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const deleteUser = async (userId, userName) => {
    if (userId === currentUser.id) {
      toast.error('You cannot delete your own account!');
      return;
    }
    
    if (window.confirm(`Delete ${userName}?`)) {
      try {
        await api.delete(`/users/${userId}`);
        toast.success('User deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  if (loading) return <div className="text-center">Loading admin panel...</div>;

  return (
    <div>
      <h2 className="mb-4">🔧 Admin Panel</h2>
      
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h6>Total Users</h6>
              <h3>{stats.total}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h6>Admins</h6>
              <h3>{stats.admins}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h6>Regular Users</h6>
              <h3>{stats.users}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">User Management</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {user.name}
                      {user.id === currentUser.id && 
                        <span className="badge bg-info ms-2">You</span>
                      }
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleRole(user.id, user.role)}
                        className="btn btn-sm btn-warning me-2"
                        disabled={user.id === currentUser.id}
                      >
                        Toggle Role
                      </button>
                      <button
                        onClick={() => deleteUser(user.id, user.name)}
                        className="btn btn-sm btn-danger"
                        disabled={user.id === currentUser.id}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;