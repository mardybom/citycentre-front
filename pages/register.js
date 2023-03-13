import Link from 'next/link';
import Layout from '../components/layout';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState } from 'react';

const Register = () => {
  // Register form
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Register</h1>
      </div>
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
            <Label for="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="Jon"
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              type="text"
            />
          </FormGroup>
          <FormGroup check inline>
            <Input
              name="isAgreed"
              type="checkbox"
              checked={isAgreed}
              onChange={() => setIsAgreed(!isAgreed)}
            />
            <Label for="isAgreed">Agree to our Terms and Conditions</Label>
          </FormGroup>
          <FormGroup>
            <Button type="submit" color="success">
              Join
            </Button>
          </FormGroup>
        </Form>
      </div>
      <div className="container" style={{ 'text-align': 'center' }}>
        <p style={{ display: 'inline' }}>Already on City Centre?</p>
        <Link href="/login" style={{ display: 'inline' }}>
          Login
        </Link>
      </div>
    </Layout>
  );
};

export default Register;
