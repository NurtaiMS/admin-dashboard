import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalRegularUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/users');
      const users = response.data;
      setStats({
        totalUsers: users.length,
        totalAdmins: users.filter(u => u.role === 'admin').length,
        totalRegularUsers: users.filter(u => u.role === 'user').length
      });
      
      // Последние 5 пользователей
      setRecentUsers(users.slice(-5).reverse());
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Данные для круговой диаграммы
  const pieData = [
    { name: 'Admins', value: stats.totalAdmins },
    { name: 'Users', value: stats.totalRegularUsers }
  ];

  const COLORS = ['#dc3545', '#28a745'];

  if (loading) {
    return <div className="text-center">Loading dashboard...</div>;
  }

  return (
    <div>
      <h2 className="mb-4">📊 Dashboard</h2>
      
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <h2 className="display-4">{stats.totalUsers}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">Admins</h5>
              <h2 className="display-4">{stats.totalAdmins}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Regular Users</h5>
              <h2 className="display-4">{stats.totalRegularUsers}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Users Distribution</h5>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Recent Users</h5>
            </div>
            <div className="card-body">
              <div className="list-group">
                {recentUsers.map(user => (
                  <div key={user.id} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{user.name}</strong>
                        <br />
                        <small className="text-muted">{user.email}</small>
                      </div>
                      <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Card */}
      <div className="card mt-4">
        <div className="card-header">
          <h5 className="mb-0">Quick Stats</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 text-center">
              <h4>📊</h4>
              <p>Total Views</p>
              <strong>1,234</strong>
            </div>
            <div className="col-md-3 text-center">
              <h4>👥</h4>
              <p>Active Users</p>
              <strong>{stats.totalUsers}</strong>
            </div>
            <div className="col-md-3 text-center">
              <h4>📝</h4>
              <p>Total Posts</p>
              <strong>42</strong>
            </div>
            <div className="col-md-3 text-center">
              <h4>⭐</h4>
              <p>Rating</p>
              <strong>4.8/5</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;