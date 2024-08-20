import React, { useState, useEffect, useCallback } from 'react';
import useHelmet from '../../utils/HelmetLoader'; // Import the utility module
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

// Navigation Component to switch between settings
const Navigation = ({ setActiveSection }) => (
  <Card>
    <Card.Header>Profile Settings</Card.Header>
    <ListGroup variant="flush">
      {[
        'Public Info',
        'Private Info',
        'Password',
        'Email Notifications',
        'Web Notifications',
        'Widgets',
        'Your Data',
        'Delete Account',
        'League Preferences',
        'Dashboard Customization',
        'Player Tracking',
        'Integration Settings',
        'Security Settings',
        'Social Sharing Options',
        'Accessibility Settings',
        'Subscription and Billing',
      ].map((section) => (
        <ListGroup.Item
          key={section}
          action
          onClick={() => setActiveSection(section)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setActiveSection(section);
            }
          }}
          tabIndex={0}
          role="button"
        >
          {section}
        </ListGroup.Item>
      ))}
    </ListGroup>
  </Card>
);

// Form Component for Public Info
const PublicInfo = ({ userData, setUserData }) => {
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setUserData((prevData) => ({ ...prevData, [name]: value }));
    },
    [setUserData],
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(
        'Settings.jsx',
        'PublicInfo.handleSubmit',
        'Saving Public Info',
        userData,
      );
      // Here you would typically make an API call to save the data
    },
    [userData],
  );

  return (
    <Card>
      <Card.Header>Public Info</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              value={userData.username || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="bio">Biography</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              id="bio"
              value={userData.bio || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

// Form Component for Private Info
const PrivateInfo = ({ userData }) => (
  <Card>
    <Card.Header>Private Info</Card.Header>
    <Card.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            defaultValue={userData.email}
            readOnly
            id="email"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Card.Body>
  </Card>
);

// Example of Password Settings
const PasswordSettings = ({ isSocialLogin }) => (
  <Card>
    <Card.Header>Password</Card.Header>
    <Card.Body>
      {isSocialLogin ? (
        <div>
          <p>
            You are logged in using a social account. To change your password,
            please visit the respective service's website.
          </p>
          <Button variant="primary" href="https://accounts.google.com/">
            Change Password on Google
          </Button>
        </div>
      ) : (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="current-password">Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Current Password"
              id="current-password"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="new-password">New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New Password"
              id="new-password"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="confirm-new-password">
              Confirm New Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm New Password"
              id="confirm-new-password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Password
          </Button>
        </Form>
      )}
    </Card.Body>
  </Card>
);

// Email Notifications Settings
const NotificationSettings = ({ type }) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Card>
      <Card.Header>{`${type} Notifications`}</Card.Header>
      <Card.Body>
        <ToggleButtonGroup
          type="checkbox"
          value={enabled ? [1] : []}
          onChange={(e) => setEnabled(e.length > 0)}
        >
          <ToggleButton
            id={`toggle-${type}`}
            value={1}
            variant="outline-primary"
          >
            {enabled ? 'Enabled' : 'Disabled'}
          </ToggleButton>
        </ToggleButtonGroup>
      </Card.Body>
    </Card>
  );
};

// Widget Settings Example
const WidgetsSettings = () => (
  <Card>
    <Card.Header>Widgets</Card.Header>
    <Card.Body>
      <p>Select your preferred widgets for the dashboard:</p>
      <Form.Check type="checkbox" label="Weather Widget" />
      <Form.Check type="checkbox" label="News Feed Widget" />
      <Form.Check type="checkbox" label="Calendar Widget" />
      <Button variant="primary" type="submit">
        Save Widget Settings
      </Button>
    </Card.Body>
  </Card>
);

// Data Management
const YourDataSettings = () => (
  <Card>
    <Card.Header>Your Data</Card.Header>
    <Card.Body>
      <Button
        variant="primary"
        onClick={() =>
          console.log('Settings.jsx', 'YourDataSettings', 'User data requested')
        }
      >
        Download My Data
      </Button>
    </Card.Body>
  </Card>
);

// Account Deletion
const DeleteAccount = () => {
  const handleDelete = () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account permanently?',
      )
    ) {
      console.log(
        'Settings.jsx',
        'DeleteAccount',
        'Account deletion process started.',
      );
      // Implement deletion logic here
    }
  };

  return (
    <Card>
      <Card.Header>Delete Account</Card.Header>
      <Card.Body>
        <Button variant="danger" onClick={handleDelete}>
          Delete My Account
        </Button>
      </Card.Body>
    </Card>
  );
};

// Main Settings Component
const Settings = () => {
  const [activeSection, setActiveSection] = useState('Public Info');
  const [userData, setUserData] = useState({});
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const Helmet = useHelmet(); // Use the custom hook

  const fetchUserData = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get('/api/user-data', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUserData(response.data);
    } catch (error) {
      console.log(
        'Settings.jsx',
        'fetchUserData',
        'Failed to fetch user data:',
        error.message,
      );
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    fetchUserData();
  }, [isAuthenticated, getAccessTokenSilently, fetchUserData]);

  if (!Helmet) return null;

  return (
    <Container fluid>
      <Helmet title="Settings" />
      <h1 className="h3 mb-3">Settings</h1>
      <Row>
        <Col md={3}>
          <Navigation setActiveSection={setActiveSection} />
        </Col>
        <Col md={9}>
          {activeSection === 'Public Info' && (
            <PublicInfo userData={userData} setUserData={setUserData} />
          )}
          {activeSection === 'Private Info' && (
            <PrivateInfo userData={userData} />
          )}
          {activeSection === 'Password' && (
            <PasswordSettings
              isSocialLogin={user && user.sub.startsWith('google-oauth2|')}
            />
          )}
          {activeSection === 'Email Notifications' && (
            <NotificationSettings type="Email" />
          )}
          {activeSection === 'Web Notifications' && (
            <NotificationSettings type="Web" />
          )}
          {activeSection === 'Widgets' && <WidgetsSettings />}
          {activeSection === 'Your Data' && <YourDataSettings />}
          {activeSection === 'Delete Account' && <DeleteAccount />}
          {activeSection === 'League Preferences' && (
            <LeaguePreferences userData={userData} />
          )}
          {activeSection === 'Dashboard Customization' && (
            <DashboardCustomization userData={userData} />
          )}
          {activeSection === 'Player Tracking' && <PlayerTracking />}
          {activeSection === 'Integration Settings' && <IntegrationSettings />}
          {activeSection === 'Security Settings' && <SecuritySettings />}
          {activeSection === 'Social Sharing Options' && (
            <SocialSharingOptions />
          )}
          {activeSection === 'Accessibility Settings' && (
            <AccessibilitySettings />
          )}
          {activeSection === 'Subscription and Billing' && (
            <SubscriptionAndBilling />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
