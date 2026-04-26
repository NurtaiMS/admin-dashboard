import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Header = () => {
  const { user, logout, theme, toggleTheme } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand">Admin Dashboard</span>
        
        <div className="ms-auto d-flex align-items-center">
          {/* Кнопка переключения темы */}
          <button
            onClick={toggleTheme}
            className="btn btn-outline-secondary me-3"
            style={{ borderRadius: '50%', width: '40px', height: '40px' }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <div className="dropdown">
            <button 
              className="btn btn-light dropdown-toggle" 
              type="button" 
              data-bs-toggle="dropdown"
            >
              👤 {user?.name || 'User'}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button 
                  className="dropdown-item" 
                  onClick={() => navigate('/profile')}
                >
                  Profile
                </button>
              </li>
              <li>
                <button 
                  className="dropdown-item" 
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </button>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button 
                  className="dropdown-item text-danger" 
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;