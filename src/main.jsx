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

const router = createBrowserRouter([
  {
    Component: Layout, 
    children: [
      {
        path: '/',
        element: <Navigate replace to='/transactions' />,
      },
      {
        path: '/transactions',
        children: [
          {
            index: true,
            element: <TransactionList />,
          },
          {
            path: 'add',
            element: <AddOrEditTransaction />,
          },
          {
            path: 'edit/:id',
            element: <AddOrEditTransaction />,
          },
        ],
      },
      {
        path: '/places',
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
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
