import React, { Suspense, useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Provider as ReduxProvider } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { store } from "./redux/store";
import "./i18n";
import routes from "./routes"; // Your routes configuration
import Loader from "./components/Loader";
import ThemeProvider from "./contexts/ThemeProvider";
import SidebarProvider from "./contexts/SidebarProvider";
import LayoutProvider from "./contexts/LayoutProvider";
import ChartJsDefaults from "./utils/ChartJsDefaults";
//import "./builder-components.js";

function App() {
  const { isLoading, isAuthenticated, error, user, getAccessTokenSilently } =
    useAuth0();
  const navigate = useNavigate();
  const routeContent = useRoutes(routes);

  const [justLoggedIn, setJustLoggedIn] = useState(false);
  useEffect(() => {
    if (!isLoading && isAuthenticated && !justLoggedIn) {
      setJustLoggedIn(true);
      navigate("/dashboard/default"); // Redirect on auth success
    }
    // Fetch access token for API calls or session management
    const fetchAccessToken = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        console.log("Access Token:", token); // Log token securely
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

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | NFL Dashboard" defaultTitle="NFL Dashboard" />
      <Suspense fallback={<Loader />}>
        <ReduxProvider store={store}>
          <ThemeProvider>
            <SidebarProvider>
              <LayoutProvider>
                <ChartJsDefaults />
                {routeContent}
              </LayoutProvider>
            </SidebarProvider>
          </ThemeProvider>
        </ReduxProvider>
      </Suspense>
    </HelmetProvider>
  );
}

export default App;