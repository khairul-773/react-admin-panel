import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { MdDashboard, MdPeople, MdDescription, MdShoppingCart, MdAdd, MdInventory, MdCategory, MdBrandingWatermark, MdStraighten, MdQrCode2, MdKeyboardArrowRight, MdKeyboardArrowDown, MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from 'react-icons/md';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
  { path: '/users', label: 'Users', icon: <MdPeople /> },
  {
    label: 'Posts',
    icon: <MdDescription />,
    submenu: [
      { path: '/posts/add', label: 'Add Post', icon: <MdAdd /> },
      { path: '/posts/all', label: 'All Posts', icon: <MdDescription /> },
    ],
  },
  {
    label: 'Products',
    icon: <MdShoppingCart />,
    submenu: [
      { path: '/products/add', label: 'Add Product', icon: <MdAdd /> },
      { path: '/products/all', label: 'All Products', icon: <MdInventory /> },
      { path: '/products/category', label: 'Category', icon: <MdCategory /> },
      { path: '/products/brand', label: 'Brand', icon: <MdBrandingWatermark /> },
      { path: '/products/unit', label: 'Unit', icon: <MdStraighten /> },
      { path: '/products/barcode', label: 'Barcode', icon: <MdQrCode2 /> },
    ],
  },
];

const Sidebar = ({ isOpen, onToggle, isMobile = false }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  // Check if any submenu item is active for a parent menu
  const isMenuActive = (item: any) => {
    if (item.submenu) {
      return item.submenu.some((subItem: any) => location.pathname === subItem.path);
    }
    return false;
  };

  // Auto-open menu if any of its submenu items are active
  useEffect(() => {
    const newOpenMenus: { [key: string]: boolean } = {};
    menuItems.forEach((item, index) => {
      if (item.submenu) {
        const isActive = item.submenu.some((subItem: any) => location.pathname === subItem.path);
        newOpenMenus[item.label] = isActive;

      }
    });
    setOpenMenus(newOpenMenus);
  }, [location.pathname]);

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex flex-col z-50 transition-all duration-300 ${
      isMobile 
        ? isOpen ? 'w-56 translate-x-0' : 'w-56 -translate-x-full'
        : isOpen ? 'w-56' : 'w-16'
    }`}>
      <div className="px-3 sm:px-4 py-3 border-b border-gray-200 min-h-[73px] flex items-center justify-between">
        {isOpen && <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight truncate">Admin Panel</h1>}
        {!isMobile && (
          <button
            onClick={onToggle}
            className="text-gray-900 hover:text-indigo-600 ml-auto !bg-transparent !p-0 !rounded-none"
          >
            {isOpen ? (
              <MdKeyboardDoubleArrowRight className="text-2xl" />
            ) : (
              <MdKeyboardDoubleArrowLeft className="text-2xl" />
            )}
          </button>
        )}
      </div>

      <nav className="flex-1 p-3 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={item.path || item.label || `menu-${index}`}>
              {item.submenu ? (
                // Menu with submenu
                <>
                  <a
                    onClick={() => isOpen && toggleMenu(item.label)}
                    className={`flex items-center ${isOpen ? 'gap-2' : 'justify-center'} px-2 py-2 rounded-md text-xs sm:text-sm font-medium tracking-wide transition-colors cursor-pointer ${
                      isMenuActive(item)
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white'
                        : 'text-gray-900 hover:bg-indigo-600 hover:text-white'
                    }`}
                  >
                    <span>{item.icon}</span>
                    {isOpen && (
                      <>
                        <span>{item.label}</span>
                        <span className="ml-auto">
                          {openMenus[item.label] ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                        </span>
                      </>
                    )}
                  </a>

                  {/* Submenu */}
                  {isOpen && openMenus[item.label] && (
                    <ul className="mt-1 ml-4 space-y-1 border-l-2 border-gray-200 pl-2">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.path}>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              `flex items-center gap-2 px-2 py-2 rounded-md text-xs sm:text-sm font-medium tracking-wide transition-colors ${
                                isActive
                                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white'
                                  : 'text-gray-900 hover:bg-indigo-600 hover:text-white'
                              }`
                            }
                          >
                            <span>{subItem.icon}</span>
                            <span>{subItem.label}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // Regular menu item
                <NavLink
                  to={item.path!}
                  className={({ isActive }) =>
                    `flex items-center ${isOpen ? 'gap-2' : 'justify-center'} px-2 py-2 rounded-md text-xs sm:text-sm font-medium tracking-wide transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white'
                        : 'text-gray-900 hover:bg-indigo-600 hover:text-white'
                    }`
                  }
                >
                  <span>{item.icon}</span>
                  {isOpen && <span>{item.label}</span>}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-3 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className={`w-full px-2 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold tracking-wide transition-colors ${isOpen ? 'text-left' : 'text-center'}`}
        >
          {isOpen ? 'Logout' : '⎋'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;