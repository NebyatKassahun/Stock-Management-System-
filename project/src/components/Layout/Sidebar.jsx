import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Warehouse, ShoppingCart, TrendingUp, ShoppingBag, Users, BarChart3, Settings, LogOut, Menu, Layers, ChevronDown, ChevronRight } from 'lucide-react';
import { useApp } from '../../Context/AppContext';
import { useAuth } from '../../hooks/useAuth';

const menuItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/dashboard'
  },
  {
    icon: Package,
    label: 'Products',
    path: '/products',
    hasDropdown: true,
    subItems: [
      { label: 'All Products', path: '/products' },
      { label: 'Add Product', path: '/products/add' },
      { label: 'Categories', path: '/products/categories' }
    ]
  },
  {
    icon: Warehouse,
    label: 'Stock',
    path: '/stock',
    hasDropdown: true,
    subItems: [
      { label: 'Stock Overview', path: '/stock' },
      { label: 'Stock Adjustments', path: '/stock/adjustments' },
      { label: 'Low Stock Alerts', path: '/stock/alerts' }
    ]
  },
  {
    icon: ShoppingCart,
    label: 'Purchase',
    path: '/purchase',
    hasDropdown: true,
    subItems: [
      { label: 'Purchase Orders', path: '/purchase' },
      { label: 'Create Order', path: '/purchase/create' },
      { label: 'Suppliers', path: '/purchase/suppliers' }
    ]
  },
  {
    icon: TrendingUp,
    label: 'Sales',
    path: '/sales',
    hasDropdown: true,
    subItems: [
      { label: 'Sales Overview', path: '/sales' },
      { label: 'Create Sale', path: '/sales/create' },
      { label: 'Sales History', path: '/sales/history' }
    ]
  },
  {
    icon: ShoppingBag,
    label: 'Orders',
    path: '/orders',
    hasDropdown: true,
    subItems: [
      { label: 'All Orders', path: '/orders' },
      { label: 'Pending Orders', path: '/orders/pending' },
      { label: 'Completed Orders', path: '/orders/completed' }
    ]
  },
  {
    icon: Users,
    label: 'Customers',
    path: '/customers',
    hasDropdown: true,
    subItems: [
      { label: 'Customer List', path: '/customers' },
      { label: 'Add Customer', path: '/customers/add' },
      { label: 'Customer Groups', path: '/customers/groups' }
    ]
  },
  {
    icon: BarChart3,
    label: 'Reports',
    path: '/reports',
    hasDropdown: true,
    subItems: [
      { label: 'Sales Reports', path: '/reports/sales' },
      { label: 'Stock Reports', path: '/reports/stock' },
      { label: 'Financial Reports', path: '/reports/financial' }
    ]
  },
  {
    icon: Settings,
    label: 'Setting',
    path: '/settings'
  }
];

const Sidebar = () => {
  const { state, dispatch } = useApp();
  const { logout, user } = useAuth();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const handleLogout = () => {
    logout();
  };

  const toggleExpanded = (path) => {
    if (state.sidebarCollapsed) return;

    setExpandedItems(prev =>
      prev.includes(path)
        ? prev.filter(item => item !== path)
        : [...prev, path]
    );
  };

  const isExpanded = (path) => expandedItems.includes(path);

  const isActiveOrChild = (item) => {
    if (location.pathname === item.path) return true;
    return item.subItems?.some(sub => location.pathname === sub.path) || false;
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 z-50 shadow-2xl ${state.sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700/50">
        {!state.sidebarCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Storify</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3 flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveOrChild(item);
            const expanded = isExpanded(item.path);

            return (
              <li key={item.path}>
                <div className="relative">
                  <NavLink
                    to={item.path}
                    onClick={() => item.hasDropdown && toggleExpanded(item.path)}
                    className={`flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group relative mb-1 ${isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-[1.02]'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:transform hover:scale-[1.01]'
                      }`}
                  >
                    <Icon className={`w-5 h-5 ${state.sidebarCollapsed ? 'mx-auto' : 'mr-3'} transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />

                    {!state.sidebarCollapsed && (
                      <>
                        <span className="font-medium text-sm">{item.label}</span>
                        {item.hasDropdown && (
                          <div className="ml-auto transition-transform duration-200">
                            {expanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </div>
                        )}
                      </>
                    )}

                    {/* Tooltip for collapsed state */}
                    {state.sidebarCollapsed && (
                      <div className="absolute left-full ml-3 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-slate-600">
                        {item.label}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-slate-800"></div>
                      </div>
                    )}
                  </NavLink>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && !state.sidebarCollapsed && expanded && item.subItems && (
                    <ul className="ml-8 mt-1 space-y-1 border-l-2 border-slate-600 pl-4">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.path}>
                          <NavLink
                            to={subItem.path}
                            className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${location.pathname === subItem.path
                              ? 'bg-blue-600/20 text-blue-300 font-medium'
                              : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                              }`}
                          >
                            {subItem.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="border-t border-slate-700/50 p-4">
        {/* User Info */}
        {!state.sidebarCollapsed && user && (
          <div className="flex items-center space-x-3 mb-4 p-3 rounded-xl bg-slate-700/30">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-sm font-bold text-white">
                {user.firstName[0]}{user.lastName[0]}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {user.email}
              </p>
            </div>
          </div>
        )}

        {/* Sign Out Button */}
        <button
          onClick={handleLogout}
          className={`flex items-center w-full px-3 py-2.5 rounded-xl text-slate-300 hover:bg-red-600/20 hover:text-red-300 transition-all duration-200 group ${state.sidebarCollapsed ? 'justify-center' : ''
            }`}
        >
          <LogOut className={`w-5 h-5 ${state.sidebarCollapsed ? 'mx-auto' : 'mr-3'}`} />
          {!state.sidebarCollapsed && <span className="font-medium text-sm">Sign out</span>}

          {/* Tooltip for collapsed state */}
          {state.sidebarCollapsed && (
            <div className="absolute left-full ml-3 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-slate-600">
              Sign out
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-slate-800"></div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;