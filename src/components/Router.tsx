import App from 'App';
import HomePage from 'pages/home';
import NotificationsPage from 'pages/notifications';
import PostsPage from 'pages/posts';
import PostDetail from 'pages/posts/detail';
import PostEdit from 'pages/posts/edit';
import PostNew from 'pages/posts/new';
import ProfilePage from 'pages/profile';
import ProfileEdit from 'pages/profile/edit';
import SearchPage from 'pages/search';
import SignIn from 'pages/users/signin';
import SignUp from 'pages/users/signup';
import { Navigate, createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/posts', element: <PostsPage /> },
      { path: '/posts/:id', element: <PostDetail /> },
      { path: '/posts/new', element: <PostNew /> },
      { path: '/posts/edit/:id', element: <PostEdit /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/profile/edit', element: <ProfileEdit /> },
      { path: '/notifications', element: <NotificationsPage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/users/signin', element: <SignIn /> },
      { path: '/users/signup', element: <SignUp /> },
    ],
  },
  { path: '*', element: <Navigate to="/" /> },
]);
