import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { MdDashboard, MdPeople, MdDescription, MdShoppingCart, MdAdd, MdInventory, MdCategory, MdBrandingWatermark, MdStraighten, MdQrCode2, MdKeyboardArrowRight, MdKeyboardArrowDown, MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from 'react-icons/md';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
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

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
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
      isOpen ? 'w-64' : 'w-20'
    }`}>
      <div className="px-6 py-3 border-b border-gray-200 min-h-[73px] flex items-center justify-between">
        {isOpen && <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>}
        <button
          onClick={onToggle}
          className="text-gray-900 hover:text-[#4361ee] ml-auto !bg-transparent !p-0 !rounded-none"
        >
          {isOpen ? (
            <MdKeyboardDoubleArrowRight className="text-2xl" />
          ) : (
            <MdKeyboardDoubleArrowLeft className="text-2xl" />
          )}
        </button>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={item.path || item.label || `menu-${index}`}>
              {item.submenu ? (
                // Menu with submenu
                <>
                  <a
                    onClick={() => isOpen && toggleMenu(item.label)}
                    className={`flex items-center ${isOpen ? 'gap-3' : 'justify-center'} px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${
                      isMenuActive(item)
                        ? 'bg-[#4361ee] text-white'
                        : 'text-gray-900 hover:bg-[#4361ee] hover:text-white'
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
                    <ul className="mt-2 ml-6 space-y-1 border-l-2 border-gray-200 pl-3">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.path}>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                                isActive
                                  ? 'bg-[#4361ee] text-white'
                                  : 'text-gray-900 hover:bg-[#4361ee] hover:text-white'
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
                    `flex items-center ${isOpen ? 'gap-3' : 'justify-center'} px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-[#4361ee] text-white'
                        : 'text-gray-900 hover:bg-[#4361ee] hover:text-white'
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

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className={`w-full px-3 py-2 rounded-md bg-[#4361ee] hover:bg-[#3651de] text-white transition-colors ${isOpen ? 'text-left' : 'text-center'}`}
        >
          {isOpen ? 'Logout' : '⎋'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;