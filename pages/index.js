import { useState, useEffect } from 'react';
import { Button, Table, Spinner, Form } from 'reactstrap';
import Layout from '../components/layout';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState();

  const [refresh, setRefresh] = useState();

  useEffect(async () => {
    setIsLoading(true);
    setError(null);
    setIsLoading(false);
  }, [refresh]);

  if (isLoading)
    return (
      <Layout>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Dashboard</h1>
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
          <h1 className="h2">Dashboard</h1>
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
        <h1 className="h2">Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Button
              outline
              size="sm"
              onClick={() => {
                setRefresh({});
              }}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
