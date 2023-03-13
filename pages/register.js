import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import Layout from '../components/layout';
import { register } from '../lib/auth';

const Register = () => {
  // Register form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  const [isSubmitting, setSubmitting] = useState(false);

  // error
  const [error, setError] = useState();

  // route
  const router = useRouter();

  const resetForm = () => {
    setSubmitting(false);
    setUsername('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setIsAgreed(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await register({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
      });
      resetForm();
      router.push('/login');
    } catch (error) {
      setError({ title: 'Error Registering', message: error.message });
      resetForm();
    }
  };

  if (error)
    return (
      <Layout>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Register</h1>
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
        <h1 className="h2">Register</h1>
      </div>
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
            <Label for="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="Jon"
              type="text"
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              type="text"
              onChange={(event) => setLastName(event.target.value)}
              required
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
            {isSubmitting ? (
              <Button disabled>
                <Spinner type="border" size="sm" />
                Submitting...
              </Button>
            ) : (
              <Button type="submit" color="success" disabled={!isAgreed}>
                Submit
              </Button>
            )}
          </FormGroup>
        </Form>
      </div>
      <div className="container" style={{ textAlign: 'center' }}>
        <p style={{ display: 'inline' }}>Already on City Centre?</p>
        <Link href="/login" style={{ display: 'inline' }}>
          Login
        </Link>
      </div>
    </Layout>
  );
};

export default Register;
