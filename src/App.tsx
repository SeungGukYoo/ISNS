import Layout from 'components/Layout';
import Router from 'components/Router';
import { AuthContext } from 'context/authContext';
import { useContext } from 'react';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      <Router isAuthenticated={!!user} />
    </Layout>
  );
}

export default App;
