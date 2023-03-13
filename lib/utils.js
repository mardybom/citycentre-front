export const getAuthorizationHeader = () => {
  const currentUser = localStorage.getItem('currentUser');

  return {
    Authorization: `Bearer ${JSON.parse(currentUser || '')?.accessToken || ''}`,
  };
};
