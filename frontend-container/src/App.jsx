import React, { useEffect, useState } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
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
import { log, compareHtml } from './utils/logs';
import 'custom-event-polyfill';
import useHelmet from './utils/HelmetLoader';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import {
  domain,
  clientId,
  audience,
  VITE_APP_INSIGHTS_CONNECTION_STRING,
  VITE_APP_INSIGHTS_INSTRUMENTATION_KEY,
} from './config';
import SSRFriendlyWrapper from './components/SSRFriendlyWrapper';
import Wrapper from './components/auth/Wrapper';

// log('App.jsx', 'Starting execution');
// log('App.jsx Client ID:', clientId);
// log('App.jsx Domain:', domain);

const connectionString = VITE_APP_INSIGHTS_CONNECTION_STRING;
const instrumentationKey = VITE_APP_INSIGHTS_INSTRUMENTATION_KEY;

let appInsights;
const reactPlugin = new ReactPlugin();

const initializeAppInsights = () => {
  log('App.jsx', 'Initializing Application Insights');
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
    log('App.jsx', 'Application Insights initialized');
  });
};

function App({ initialData }) {
  const navigate = useNavigate();
  const routeContent = useRoutes(routes);
  const Helmet = useHelmet();

  useEffect(() => {
    log('App.jsx', 'App component mounted', { initialData });
  }, [initialData]);

  log('App.jsx', 'Rendering Application with routeContent:', { routeContent });
  return (
    <Wrapper>
      <React.Fragment>
        {Helmet && (
          <Helmet
            titleTemplate="%s | Love of Football - NFL Stats & Analytics"
            defaultTitle="Love of Football - NFL Stats & Analytics"
          >
            <link rel="shortcut icon" href="/favicon.ico" />
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
    </Wrapper>
  );
}

export default function WrappedApp({ initialData }) {
  useEffect(() => {
    log('App.jsx', 'WrappedApp component mounted', { initialData });
    const serverHTML = document.documentElement.innerHTML;

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
