import React, { useEffect } from 'react';
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
import useHelmet from './utils/HelmetLoader';
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
import authConfig from './components/auth/auth0';
// console.log('App.jsx', 'Starting execution');
// console.log('App.jsx Client ID:', clientId);
// console.log('App.jsx Domain:', domain);

const connectionString = VITE_APP_INSIGHTS_CONNECTION_STRING;
const instrumentationKey = VITE_APP_INSIGHTS_INSTRUMENTATION_KEY;

let appInsights;
const reactPlugin = new ReactPlugin();

const initializeAppInsights = () =>{
  if ( typeof window !== 'undefined' )
  {
    console.log( 'App.jsx', 'Initializing Application Insights' );
    import( 'history' ).then( ( { createBrowserHistory } ) =>
    {
      const browserHistory = createBrowserHistory( { basename: '' } );
      appInsights = new ApplicationInsights( {
        config: {
          connectionString,
          instrumentationKey,
          enableAutoRouteTracking: true,
          extensions: [ reactPlugin ],
          extensionConfig: {
            [ reactPlugin.identifier ]: { history: browserHistory },
          },
        },
      });
      appInsights.loadAppInsights();
      console.log( 'App.jsx', 'Application Insights initialized' );
    } );
  }
};

function App({ initialData }) {
  const routeContent = useRoutes(routes);
  const Helmet = useHelmet();

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
            redirect_uri:
              typeof window !== 'undefined'
                ? window.location.origin + '/dashboard/default'
                : '',
          }}
      >
        <ThemeProvider>
          <SidebarProvider>
            <LayoutProvider>
              <ChartJsDefaults />
              <ErrorBoundary>
                <SSRFriendlyWrapper>
                  <Wrapper>
                    {Helmet}
                    {routeContent}
                  </Wrapper>
                </SSRFriendlyWrapper>
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
};

WrappedApp.propTypes = {
  initialData: PropTypes.object,
};

export default function WrappedApp({ initialData }) {
  useEffect(() => {
    console.log('App.jsx', 'WrappedApp component mounted', { initialData });
    const serverHTML = document.documentElement.innerHTML;

    setTimeout(() => {
      const clientHTML = document.documentElement.innerHTML;
      // Define compareHtml function
      const compareHtml = (serverHTML, clientHTML) => {
        if (serverHTML !== clientHTML) {
          console.warn('HTML content mismatch between server and client');
        } else {
          console.log('HTML content matches between server and client');
        }
      };

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
