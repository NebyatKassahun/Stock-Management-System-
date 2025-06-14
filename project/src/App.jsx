import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './Context/AppContext';
import { AuthProvider } from './Context/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Stock from './pages/Stock';
import Purchase from './pages/Purchase';
import Sales from './pages/Sales';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { useAuth } from './hooks/useAuth';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/*" element={<Products />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/stock/*" element={<Stock />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/purchase/*" element={<Purchase />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/sales/*" element={<Sales />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/*" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/*" element={<Customers />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/*" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <div className="min-h-screen bg-gray-50">
            <AppRoutes />
          </div>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;