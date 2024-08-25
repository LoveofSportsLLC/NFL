import 'vite/modulepreload-polyfill';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRoutes } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { store } from './redux/store';
import './i18n';
import routes from './routes';
import ThemeProvider from './contexts/ThemeProvider';
import SidebarProvider from './contexts/SidebarProvider';
import LayoutProvider from './contexts/LayoutProvider';
import ChartJsDefaults from './utils/ChartJsDefaults';
import ErrorBoundary from './components/ErrorBoundary';
import 'custom-event-polyfill';
import useHelmet from './utils/HelmetLoader'; // Import Helmet directly
import { Auth0Provider } from '@auth0/auth0-react';
import {
  domain,
  clientId,
  audience,
  VITE_APP_INSIGHTS_CONNECTION_STRING,
  VITE_APP_INSIGHTS_INSTRUMENTATION_KEY,
} from './config';
import SSRFriendlyWrapper from './components/SSRFriendlyWrapper';
import Wrapper from './components/auth/Wrapper';

const connectionString = VITE_APP_INSIGHTS_CONNECTION_STRING;
const instrumentationKey = VITE_APP_INSIGHTS_INSTRUMENTATION_KEY;

let appInsights;
const reactPlugin = new ReactPlugin();

const initializeAppInsights = () => {
  if (typeof window !== 'undefined') {
    console.log('App.jsx', 'Initializing Application Insights');
    import('history').then(({ createBrowserHistory }) => {
      const browserHistory = createBrowserHistory({ basename: '' });
      appInsights = new ApplicationInsights({
        config: {
          connectionString,
          instrumentationKey,
          enableAutoRouteTracking: true,
          extensions: [reactPlugin],
          extensionConfig: {
            [reactPlugin.identifier]: { history: browserHistory },
          },
        },
      });
      appInsights.loadAppInsights();
      console.log('App.jsx', 'Application Insights initialized');
    });
  }
};

function App({ initialData, redirectUri }) {
  const routeContent = useRoutes(routes);
  const HelmetComponent = useHelmet(); // Always call useHelmet

  useEffect(() => {
    console.log('App.jsx', 'App component mounted', { initialData });
  }, [initialData]);

  console.log('App.jsx', 'Rendering Application with routeContent:', {
    routeContent,
  });

  return (
    <ReduxProvider store={store}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        audience={audience}
        authorizationParams={{
          redirect_uri: redirectUri, // Use prop-based redirectUri
        }}
      >
        <ThemeProvider>
          <SidebarProvider>
            <LayoutProvider>
              <ChartJsDefaults />
              <ErrorBoundary>
                <Wrapper>
                  {HelmetComponent && <HelmetComponent />}
                  {routeContent}
                </Wrapper>
              </ErrorBoundary>
            </LayoutProvider>
          </SidebarProvider>
        </ThemeProvider>
      </Auth0Provider>
    </ReduxProvider>
  );
}

App.propTypes = {
  initialData: PropTypes.object,
  redirectUri: PropTypes.string.isRequired, // Make redirectUri a required prop
};

function WrappedApp({ initialData }) {
  const [redirectUri, setRedirectUri] = useState('');
  const HelmetComponent = useHelmet(); // Always call useHelmet

  useEffect(() => {
    console.log('App.jsx', 'WrappedApp component mounted', { initialData });
    const serverHTML = document.documentElement.innerHTML;

    setTimeout(() => {
      const clientHTML = document.documentElement.innerHTML;
      const compareHtml = (serverHTML, clientHTML) => {
        if (serverHTML !== clientHTML) {
          console.warn('HTML content mismatch between server and client');
        } else {
          console.log('HTML content matches between server and client');
        }
      };

      compareHtml(serverHTML, clientHTML);
    }, 1000); // Wait a bit to ensure hydration is complete

    if (typeof window !== 'undefined') {
      setRedirectUri(window.location.origin + '/dashboard/default');
    }
  }, [initialData]);

  return (
    <ErrorBoundary>
      <SSRFriendlyWrapper onClientLoad={initializeAppInsights}>
        {!redirectUri ? (
          <>
            <div>Loading...</div>
            <HelmetComponent>
              <title>Loading...</title>
            </HelmetComponent>
          </>
        ) : (
          <App initialData={initialData} redirectUri={redirectUri} />
        )}
      </SSRFriendlyWrapper>
    </ErrorBoundary>
  );
}

WrappedApp.propTypes = {
  initialData: PropTypes.object,
};

export default WrappedApp;
