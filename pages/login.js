import Link from 'next/link';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import Layout from '../components/layout';
import { login } from '../lib/auth';
import { AuthContext } from '../context/auth-context';

const Login = () => {
  const authContext = useContext(AuthContext);
  // Login form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitting, setSubmitting] = useState(false);

  // error
  const [error, setError] = useState();

  // route
  const router = useRouter();

  const resetForm = () => {
    setSubmitting(false);
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await login({
        username: username,
        password: password,
      });
      authContext.setAuthState(user);
      resetForm();
      router.push('/profile');
    } catch (error) {
      setError({ title: 'Error Login', message: error.message });
      resetForm();
    }
  };

  if (error)
    return (
      <Layout>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Login</h1>
        </div>
        <div>
          <h6>{error.title}</h6>
          <p>{error.message}</p>
        </div>
        <div>
          <div className="container border-bottom">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="jon@email.com"
                  type="email"
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="password"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                {isSubmitting ? (
                  <Button disabled>
                    <Spinner type="border" size="sm" />
                    Submitting...
                  </Button>
                ) : (
                  <Button type="submit" color="success">
                    Login
                  </Button>
                )}
              </FormGroup>
            </Form>
          </div>
        </div>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ display: 'inline' }}>New to City Centre?</p>
          <Link href="/register" style={{ display: 'inline' }}>
            Register
          </Link>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Login</h1>
      </div>
      <div>
        <div className="container border-bottom">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="jon@email.com"
                type="email"
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="password"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              {isSubmitting ? (
                <Button disabled>
                  <Spinner type="border" size="sm" />
                  Submitting...
                </Button>
              ) : (
                <Button type="submit" color="success">
                  Login
                </Button>
              )}
            </FormGroup>
          </Form>
        </div>
      </div>
      <div className="container" style={{ textAlign: 'center' }}>
        <p style={{ display: 'inline' }}>New to City Centre?</p>
        <Link href="/register" style={{ display: 'inline' }}>
          Register
        </Link>
      </div>
    </Layout>
  );
};

export default Login;
