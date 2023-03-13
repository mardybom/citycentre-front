import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Spinner, Table } from 'reactstrap';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getEvent } from '../../lib/events';

const Event = () => {
  // route
  const router = useRouter();
  const { id } = router.query;

  // event detail
  const [isLoading, setIsLoading] = useState(false);
  const [event, setEvent] = useState();

  // error
  const [error, setError] = useState();

  const refresh = async (id) => {
    // in useRouter, dynamic route is an empty object during prerendering
    // therefore we need to check if "id" is already available or not
    if (id) {
      setIsLoading(true);
      try {
        const event = await getEvent(id);
        setEvent(event);
        setError(null);
      } catch (error) {
        setError({ title: 'Error getting event', message: error.message });
      }
      setIsLoading(false);
    }
  };

  useEffect(async () => {
    await refresh(id);
  }, [id]);

  if (isLoading || !event)
    return (
      <Layout>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Events</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <Button outline size="sm" disabled>
                Refresh
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Breadcrumb listTag="div">
            <BreadcrumbItem>
              <Link href="/events">Events</Link>
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
              <Button
                outline
                size="sm"
                onClick={() => {
                  refresh(id);
                }}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Breadcrumb listTag="div">
            <BreadcrumbItem>
              <Link href="/events">Events</Link>
            </BreadcrumbItem>
          </Breadcrumb>
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
        <h1 className="h2">Events</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Button
              outline
              size="sm"
              onClick={() => {
                refresh(id);
              }}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Breadcrumb listTag="div">
          <BreadcrumbItem>
            <Link href="/events">Events</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active tag="span">
            {event.title}
          </BreadcrumbItem>
        </Breadcrumb>
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
              <th scope="row">Title</th>
              <td>{event.title}</td>
            </tr>
            <tr>
              <th scope="row">Capacity</th>
              <td>{event.capacity}</td>
            </tr>
            <tr>
              <th scope="row">Is Private</th>
              <td>{event.isPrivate.toString()}</td>
            </tr>
            <tr>
              <th scope="row">Start Date</th>
              <td>
                <Date dateString={event.startDate} />
              </td>
            </tr>
            <tr>
              <th scope="row">End Date</th>
              <td>
                <Date dateString={event.endDate} />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default Event;
