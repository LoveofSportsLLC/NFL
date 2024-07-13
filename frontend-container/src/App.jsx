import React, { useEffect, useState } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import {
  ReactPlugin,
  AppInsightsErrorBoundary,
} from '@microsoft/applicationinsights-react-js';
import { store } from './redux/store';
import './i18n';
import routes from './routes';
import ThemeProvider from './contexts/ThemeProvider';
import SidebarProvider from './contexts/SidebarProvider';
import LayoutProvider from './contexts/LayoutProvider';
import ChartJsDefaults from './utils/ChartJsDefaults';
import ErrorBoundary from './components/ErrorBoundary';
import { log, compareHtml } from './utils/logs';
import 'custom-event-polyfill';
import useHelmet from './utils/HelmetLoader';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import {
  domain,
  clientId,
  audience,
  VITE_APP_INSIGHTS_CONNECTION_STRING,
} from './config';
import SSRFriendlyWrapper from './components/SSRFriendlyWrapper';

log('App.jsx', 'Starting execution');

const connectionString = VITE_APP_INSIGHTS_CONNECTION_STRING;
log('VITE_APP_INSIGHTS_CONNECTION_STRING:', connectionString);

const match = connectionString
  ? connectionString.match(/InstrumentationKey=([^;]+)/)
  : null;
if (!match) {
  throw new Error('InstrumentationKey not found in the connection string');
}
const instrumentationKey = match[1];

let appInsights;
const reactPlugin = new ReactPlugin();

const initializeAppInsights = () => {
  log('App.jsx', 'Initializing Application Insights');
  import('history').then(({ createBrowserHistory }) => {
    const browserHistory = createBrowserHistory({ basename: '' });
    appInsights = new ApplicationInsights({
      config: {
        connectionString,
        instrumentationKey, // Added instrumentation key
        enableAutoRouteTracking: true,
        extensions: [reactPlugin],
        extensionConfig: {
          [reactPlugin.identifier]: { history: browserHistory },
        },
      },
    });
    appInsights.loadAppInsights();
    log('App.jsx', 'Application Insights initialized');
  });
};

function App({ initialData }) {
  const { isLoading, isAuthenticated, error, getAccessTokenSilently } =
    useAuth0();
  const navigate = useNavigate();
  const routeContent = useRoutes(routes);
  const Helmet = useHelmet();

  const [justLoggedIn, setJustLoggedIn] = useState(false);

  useEffect(() => {
    log('App.jsx', 'Auth0 Status:', { isLoading, isAuthenticated, error });

    if (!isLoading && isAuthenticated && !justLoggedIn) {
      setJustLoggedIn(true);
      log('App.jsx', 'Navigating to /dashboard/default');
      setTimeout(() => {
        navigate('/dashboard/default');
      }, 0);
    }

    const fetchAccessToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          log('App.jsx', 'Access Token:', token);
        } catch (fetchError) {
          log('App.jsx', 'Error fetching access token:', fetchError.message);
        }
      }
    };

    fetchAccessToken();
  }, [
    isLoading,
    isAuthenticated,
    navigate,
    getAccessTokenSilently,
    justLoggedIn,
  ]);

  useEffect(() => {
    log('App.jsx', 'App component mounted', { initialData });
  }, [initialData]);

  if (error) {
    log('App.jsx', 'Auth0 Error:', error.message);
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    log('App.jsx', 'Loading...');
    return <div>Loading...</div>;
  }

  log('App.jsx', 'Rendering Application with routeContent:', { routeContent });
  return (
    <React.Fragment>
      {Helmet && (
        <Helmet
          titleTemplate="%s | Love of Football - NFL Stats & Analytics"
          defaultTitle="Love of Football - NFL Stats & Analytics"
        >
          <link rel="shortcut icon" href="/src/assets/img/favicon.ico" />
        </Helmet>
      )}
      <ReduxProvider store={store}>
        <ThemeProvider>
          <SidebarProvider>
            <LayoutProvider>
              <ChartJsDefaults />
              <div id="routeContent">{routeContent}</div>
            </LayoutProvider>
          </SidebarProvider>
        </ThemeProvider>
      </ReduxProvider>
    </React.Fragment>
  );
}

export default function WrappedApp({ initialData }) {
  useEffect(() => {
    log('App.jsx', 'WrappedApp component mounted', { initialData });
    const serverHTML = document.documentElement.innerHTML;
    log(
      'App.jsx',
      'Server rendered HTML (first 2000 chars):',
      serverHTML.substring(0, 2000),
    );

    setTimeout(() => {
      const clientHTML = document.documentElement.innerHTML;
      compareHtml(serverHTML, clientHTML);
    }, 1000); // Wait a bit to ensure hydration is complete
  }, [initialData]);

  return (
    <ErrorBoundary>
      <SSRFriendlyWrapper onClientLoad={initializeAppInsights}>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          audience={audience}
          authorizationParams={{
            redirect_uri:
              typeof window !== 'undefined'
                ? window.location.origin + '/dashboard/default'
                : '',
          }}
        >
          <App initialData={initialData} />
        </Auth0Provider>
      </SSRFriendlyWrapper>
    </ErrorBoundary>
  );
}
