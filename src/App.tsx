import Layout from 'components/Layout';
import Router from 'components/Router';
import { useAuthContext } from 'hooks/useContextUtil';

function App() {
  const { user } = useAuthContext();

  return (
    <Layout>
      <Router isAuthenticated={!!user} />
    </Layout>
  );
}

export default App;
