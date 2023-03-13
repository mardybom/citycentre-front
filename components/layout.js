import { useEffect } from 'react';
import { replace } from 'feather-icons';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    replace({ 'aria-hidden': 'true' });
  }, []);

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>City Centre</title>
      </Head>
      <div>
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
          <Link href="/">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
              City Centre
            </a>
          </Link>
          <button
            className="navbar-toggler position-absolute d-md-none collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <input
            className="form-control form-control-dark w-100 rounded-0 border-0"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />

          <div className="navbar-nav">
            <div className="nav-item text-nowrap">
              <Link href="/register">
                <a className="nav-link px-3">Join Now</a>
              </Link>
            </div>
          </div>

          <div className="navbar-nav">
            <div className="nav-item text-nowrap">
              <Link href="/login">
                <a className="nav-link px-3">Login</a>
              </Link>
            </div>
          </div>
        </header>
        <div className="container-fluid">
          <div className="row">
            <nav
              id="sidebarMenu"
              className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
            >
              <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link href="/">
                      <a
                        className={`nav-link ${
                          router.pathname == '/' ? 'active' : ''
                        }`}
                      >
                        <span data-feather="home"></span>
                        Home
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/events">
                      <a
                        className={`nav-link ${
                          router.pathname == '/events' ? 'active' : ''
                        }`}
                      >
                        <span data-feather="file"></span>
                        Events
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/logout">
                      <a
                        className={`nav-link ${
                          router.pathname == '/logout' ? 'active' : ''
                        }`}
                      >
                        <span data-feather="log-out"></span>
                        Logout
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
