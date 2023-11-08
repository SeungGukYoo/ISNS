import App from 'App';
import AuthContextProvider from 'context/authContext';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Router>
    <AuthContextProvider>
      <App />
      <ToastContainer />
    </AuthContextProvider>
  </Router>,
);
