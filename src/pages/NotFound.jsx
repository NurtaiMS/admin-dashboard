import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="text-center">
        <h1 className="display-1 text-muted">404</h1>
        <h3 className="mb-3">Page Not Found</h3>
        <p className="mb-4">The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary">Go to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;