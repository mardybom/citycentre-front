import Link from 'next/link';
import Layout from '../components/layout';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Login = () => {
  return (
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Login</h1>
      </div>
      <div>
        <div className="container border-bottom">
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="jon@email.com"
                type="email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="password"
                type="password"
              />
            </FormGroup>
            <FormGroup>
              <Button type="submit" color="success">
                Login
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
      <div className="container" style={{ 'text-align': 'center' }}>
        <p style={{ display: 'inline' }}>New to City Centre?</p>
        <Link href="/register" style={{ display: 'inline' }}>
          Login
        </Link>
      </div>
    </Layout>
  );
};

export default Login;
