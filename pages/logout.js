import { useContext, useEffect } from 'react';
import Layout from '../components/layout';
import { AuthContext } from '../context/auth-context';

const Logout = () => {
  const authContext = useContext(AuthContext);
  useEffect(async () => {
    authContext.setAuthState();
  }, []);

  return (
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Logout</h1>
      </div>
      <div>
        <h6>You have logged out</h6>
      </div>
    </Layout>
  );
};

export default Logout;
