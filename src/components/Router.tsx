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
import { Navigate, Route, Routes } from 'react-router-dom';
import { RouterProps } from '../..';
const Router = ({ isAuthenticated }: RouterProps) => {
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/posts/new" element={<PostNew />} />
          <Route path="/posts/edit/:id" element={<PostEdit />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<Navigate to={'/'} />} />
          <Route path="/" element={<HomePage />} />
        </>
      ) : (
        <>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to={'/signin'} />} />
        </>
      )}
    </Routes>
  );
};
export default Router;
