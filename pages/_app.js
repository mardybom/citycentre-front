import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.css';
import { AuthProvider } from '../context/auth-context';
import { useEffect } from 'react';

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
};

export default App;
