import App from 'App';
import AuthContextProvider from 'context/authContext';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RecoilRoot>
    <Router>
      <AuthContextProvider>
        <App />
        <ToastContainer autoClose={1000} hideProgressBar newestOnTop theme="dark" />
      </AuthContextProvider>
    </Router>
  </RecoilRoot>,
);
