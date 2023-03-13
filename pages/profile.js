import { useState, useEffect, useContext } from 'react';
import { Button, Table, Spinner, Form } from 'reactstrap';
import Layout from '../components/layout';
import { AuthContext } from '../context/auth-context';
import { useRouter } from 'next/router';
import { getProfile } from '../lib/profile';
import Link from 'next/link';

const Profile = () => {
  // check authenticated user
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const [profile, setProfile] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState();

  const refresh = async () => {
    setIsLoading(true);
    try {
      const profile = await getProfile();
      setProfile(profile);
      setError(null);
    } catch (error) {
      setError({ title: 'Error getting profile', message: error.message });
    }
    setIsLoading(false);
  };

  useEffect(async () => {
    authContext.isUserAuthenticated() ? await refresh() : router.push('/login');
  }, []);

  if (isLoading)
    return (
      <Layout>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Profile</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <Button outline size="sm" disabled>
                Refresh
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Spinner />
        </div>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Profile</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <Button outline size="sm" disabled>
                Refresh
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h6>{error.title}</h6>
          <p>{error.message}</p>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Profile</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Button outline size="sm" onClick={refresh}>
              Refresh
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Table>
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">User ID</th>
              <td>{profile.userId}</td>
            </tr>
            <tr>
              <th scope="row">Username</th>
              <td>{profile.username}</td>
            </tr>
            <tr>
              <th scope="row">First Name</th>
              <td>{profile.firstName}</td>
            </tr>
            <tr>
              <th scope="row">Last Name</th>
              <td>{profile.lastName}</td>
            </tr>
            <tr>
              <th scope="row">Joining In</th>
              <td>
                <Link href={`/events/${profile.memberOf.eventId}`}>
                  {profile.memberOf.title}
                </Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default Profile;
