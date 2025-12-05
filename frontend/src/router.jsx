// Not used by default; App uses inline Routes. Keep for alternate setups.
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import CheckoutPage from './pages/CheckoutPage';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUsers';

const router = createBrowserRouter([
  { path: '/', element: <Home/> },
  { path: '/checkout', element: <CheckoutPage/> },
  { path: '/cart', element: <Cart/> },
  { path: '/profile', element: <Profile/> },
  { path: '/register', element: <Register/> },
  { path: '/admin/login', element: <AdminLogin/> },
  { path: '/admin/dashboard', element: <AdminDashboard/> },
  { path: '/admin/orders', element: <AdminOrders/> },
  { path: '/admin/users', element: <AdminUsers/> },
]);

export default router;
