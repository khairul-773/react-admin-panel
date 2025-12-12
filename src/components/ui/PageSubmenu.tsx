import { useNavigate, useLocation } from 'react-router-dom';

interface SubmenuItem {
  label: string;
  path: string;
}

interface PageSubmenuProps {
  items: SubmenuItem[];
  className?: string;
}

const PageSubmenu = ({ items, className = '' }: PageSubmenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`mb-4 flex gap-2 flex-wrap ${className}`}>
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`px-4 py-2 border rounded-lg transition-colors ${
              isActive
                ? 'bg-[#4361ee] text-white border-[#4361ee]'
                : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default PageSubmenu;
export type { SubmenuItem };
