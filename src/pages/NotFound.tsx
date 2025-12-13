import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-6">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-gray-200 tracking-tighter">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4 mb-2 tracking-tight">Page Not Found</h2>
        <p className="text-base text-gray-600 mb-6 leading-relaxed">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/dashboard"
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors text-sm font-semibold tracking-wide"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
