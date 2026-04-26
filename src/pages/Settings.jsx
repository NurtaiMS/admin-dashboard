import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { theme, toggleTheme } = useAuth();
  const [notifications, setNotifications] = useState(
    localStorage.getItem('notifications') === 'true'
  );

  const handleNotificationsToggle = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    localStorage.setItem('notifications', newValue);
    toast.success(`Notifications ${newValue ? 'enabled' : 'disabled'}`);
  };

  return (
    <div>
      <h2 className="mb-4">⚙️ Settings</h2>
      
      <div className="card">
        <div className="card-body">
          <h5>Appearance</h5>
          <div className="mb-3">
            <label className="form-label">Theme</label>
            <div>
              <button 
                onClick={toggleTheme}
                className="btn btn-outline-primary"
              >
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
              </button>
            </div>
          </div>

          <hr />

          <h5>Notifications</h5>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={notifications}
              onChange={handleNotificationsToggle}
            />
            <label className="form-check-label">
              Enable email notifications
            </label>
          </div>

          <hr />

          <h5>Data Management</h5>
          <button 
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm('Clear all saved preferences?')) {
                localStorage.clear();
                toast.success('Settings cleared! Page will refresh.');
                setTimeout(() => window.location.reload(), 1500);
              }
            }}
          >
            Reset All Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;