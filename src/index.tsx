import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/posts', element: <h1>posts page</h1> },
  { path: '/posts/:id', element: <h1>posts id page</h1> },
  { path: '/posts/new', element: <h1>posts new page</h1> },
  { path: '/posts/edit/:id', element: <h1>edit id page</h1> },
  { path: '/profile', element: <h1>profile page</h1> },
  { path: '/profile/edit', element: <h1>edit page</h1> },
  { path: '/notifications', element: <h1>notifications page</h1> },
  { path: '/search', element: <h1>search page</h1> },
  { path: '/users/signin', element: <h1>signin page</h1> },
  { path: '/users/signup', element: <h1>signup</h1> },
  { path: '*', element: <Navigate to="/" /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router} />);
