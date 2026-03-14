import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import MenuCategories from './pages/admin/MenuCategories';
import MenuItems from './pages/admin/MenuItems';
import TableManagement from './pages/admin/TableManagement';
import OrderHistory from './pages/admin/OrderHistory';
import Reports from './pages/admin/Reports';
import WaiterDashboard from './pages/waiter/WaiterDashboard';
import KitchenDashboard from './pages/kitchen/KitchenDashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <SocketProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute roles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="categories" element={<MenuCategories />} />
              <Route path="menu" element={<MenuItems />} />
              <Route path="tables" element={<TableManagement />} />
              <Route path="orders" element={<OrderHistory />} />
              <Route path="reports" element={<Reports />} />
            </Route>

            {/* Waiter */}
            <Route path="/waiter" element={
              <ProtectedRoute roles={['waiter', 'admin']}>
                <WaiterDashboard />
              </ProtectedRoute>
            } />

            {/* Kitchen */}
            <Route path="/kitchen" element={
              <ProtectedRoute roles={['kitchen', 'admin']}>
                <KitchenDashboard />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </SocketProvider>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);
}

export default App;
