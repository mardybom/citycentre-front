import { useState, createContext } from 'react';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    currentUser: '',
  });

  const setUserAuthInfo = (data) => {
    localStorage.setItem('currentUser', JSON.stringify(data));

    setAuthState({
      currentUser: data,
    });
  };

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    return !!authState.currentUser;
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
