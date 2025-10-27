import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import TransactionList from './pages/transactions/TransactionsList.jsx';
import PlacesList from './pages/places/PlacesList.jsx';
import NotFound from './pages/NotFound.jsx';
import About from './pages/about/About.jsx';
import { Services, History, Location } from './pages/about/About.jsx';
import PlaceDetail from './pages/places/PlaceDetail.jsx';
import Layout from './pages/Layout.jsx';
import AddOrEditTransaction from './pages/transactions/AddOrEditTransaction.jsx';
import ThemeProvider from './contexts/Theme.context.jsx';
import { AuthProvider } from './contexts/Auth.context';
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';
import Register from './pages/Register.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    Component: Layout, 
    children: [
      {
        path: '/',
        element: <Navigate replace to='/transactions' />,
      },
      {
        path: '/login',
        Component : Login,
      },
      {
        path: '/register',
        Component : Register,
      },
      {
        path: '/logout',
        Component: Logout,
      },
      {
        path: '/transactions',
        Component:PrivateRoute,
        children: [
          {
            index: true,
            Component: TransactionList ,
          },
          {
            path: 'add',
            Component: AddOrEditTransaction,
          },
          {
            path: 'edit/:id',
            Component: AddOrEditTransaction,
          },
        ],
      },
      {
        path: '/places',
        Component:PrivateRoute,
        children: [
          {
            index: true,
            Component: PlacesList,
          },
          {
            path: ':id',
            Component: PlaceDetail,
          },
        ],
      },
      {
        path: 'about',
        Component: About,
        children: [
          {
            path: 'services',
            Component: Services,
          },
          {
            path: 'history',
            Component: History,
          },
          {
            path: 'location',
            Component: Location,
          },
        ], 
      },
      {
        path: 'services',
        element: <Navigate to='/about/services' replace />,
      },
      { path: '*', Component: NotFound },
    ],
  }]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
