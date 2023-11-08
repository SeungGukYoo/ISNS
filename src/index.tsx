import App from 'App';

import ReactDOM from 'react-dom/client';

import AuthContextProvider from 'context/authContext';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Router>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Router>,
);
