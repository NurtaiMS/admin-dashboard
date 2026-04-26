import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="sidebar">
      <div className="p-3">
        <h5 className="text-white mb-4">📊 Menu</h5>
        <nav className="nav flex-column">
          <NavLink to="/" className="nav-link">
            🏠 Home
          </NavLink>
          <NavLink to="/dashboard" className="nav-link">
            📈 Dashboard
          </NavLink>
          <NavLink to="/users" className="nav-link">
            👥 Users
          </NavLink>
          <NavLink to="/profile" className="nav-link">
            👤 Profile
          </NavLink>
          {user?.role === 'admin' && (
            <NavLink to="/admin" className="nav-link">
              🔧 Admin Panel
            </NavLink>
          )}
          // Добавь в навигацию
            <NavLink to="/settings" className="nav-link">
               ⚙️ Settings
            </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;