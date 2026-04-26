import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="alert alert-info">
        <h3>Welcome back, {user?.name}! 👋</h3>
        <p>This is your Admin Dashboard. Use the sidebar to navigate through different sections.</p>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Users Management</h5>
              <p className="card-text">View, add, edit and delete users</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Dashboard</h5>
              <p className="card-text">View statistics and analytics</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">Profile Settings</h5>
              <p className="card-text">Manage your account settings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;