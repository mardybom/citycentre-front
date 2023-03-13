import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Breadcrumb, BreadcrumbItem, Button, Spinner, Table } from 'reactstrap';
import { listEvents } from '../lib/events';
import Layout from '../components/layout';
import Date from '../components/date';
import { AuthContext } from '../context/auth-context';
import CreateEventModal from '../components/events/createEventModal';
import ErrorModal from '../components/errorModal';

const Events = () => {
  // check authenticated user
  const router = useRouter();
  const authContext = useContext(AuthContext);

  // events
  const [events, setEvents] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [createModal, setCreateModal] = useState(false);

  // error
  const [error, setError] = useState();
  const [errorModal, setErrorModal] = useState(false);

  const refresh = async () => {
    setIsLoading(true);
    try {
      const { events } = await listEvents();
      setEvents(events);
      setError(null);
    } catch (error) {
      setError({ title: 'Error getting events', message: error.message });
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
          <h1 className="h2">Events</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <Button outline size="sm" disabled>
                Create
              </Button>
              <Button outline size="sm" disabled>
                Refresh
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Breadcrumb listTag="div">
            <BreadcrumbItem active tag="span">
              Events
            </BreadcrumbItem>
          </Breadcrumb>
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
          <h1 className="h2">Events</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <Button outline size="sm" disabled>
                Create
              </Button>
              <Button outline size="sm" onClick={refresh}>
                Refresh
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Breadcrumb listTag="div">
            <BreadcrumbItem active tag="span">
              Events
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div>
          <ErrorModal
            error={error}
            errorModal={errorModal}
            setErrorModal={setErrorModal}
            refresh={refresh}
          />
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Events</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Button outline size="sm" onClick={() => setCreateModal(true)}>
              Create
            </Button>
            <Button outline size="sm" onClick={refresh}>
              Refresh
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Breadcrumb listTag="div">
          <BreadcrumbItem active tag="span">
            Events
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div>
        <CreateEventModal
          createModal={createModal}
          setCreateModal={setCreateModal}
          setErrorModal={setErrorModal}
          setError={setError}
          refresh={refresh}
        />
      </div>
      <div
        className="table-responsive"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        <Table className="table table-hover table-sm">
          <thead className="sticky-top" style={{ backgroundColor: 'white' }}>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Capacity</th>
              <th scope="col">Is Private</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
            </tr>
          </thead>
          <tbody>
            {events.map(
              ({ eventId, title, capacity, isPrivate, startDate, endDate }) => (
                <tr key={eventId}>
                  <td>
                    <Link href={`/events/${eventId}`}>{title}</Link>
                  </td>
                  <td>{capacity}</td>
                  <td>{isPrivate.toString()}</td>
                  <td>
                    <Date dateString={startDate} />
                  </td>
                  <td>
                    <Date dateString={endDate} />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default Events;
