import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Navbar, Nav, Form, InputGroup } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { audience } from '../../config';
import {
  AlertCircle,
  Bell,
  BellOff,
  Home,
  MessageCircle,
  UserPlus,
  Search,
} from 'react-feather';

import useSidebar from '../../hooks/useSidebar';

import NavbarDropdown from './NavbarDropdown';
import NavbarDropdownItem from './NavbarDropdownItem';
import NavbarLanguages from './NavbarLanguages';
import NavbarUser from './NavbarUser';

const initialMessages = [
  {
    name: 'Ashley Briggs',
    avatar: '/avatars/avatar-5.jpg',
    description: 'Nam pretium turpis et arcu. Duis arcu tortor.',
    time: '15m ago',
  },
  {
    name: 'Chris Wood',
    avatar: '/avatars/avatar.jpg',
    description: 'Curabitur ligula sapien euismod vitae.',
    time: '2h ago',
  },
  {
    name: 'Stacie Hall',
    avatar: '/avatars/avatar-4.jpg',
    description: 'Pellentesque auctor neque nec urna.',
    time: '4h ago',
  },
  {
    name: 'Bertha Martin',
    avatar: '/avatars/avatar-3.jpg',
    description: 'Aenean tellus metus, bibendum sed, posuere ac, mattis non.',
    time: '5h ago',
  },
];

const NavbarComponent = () => {
  const { t } = useTranslation();
  const { isOpen, setIsOpen } = useSidebar();
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const [notifications, setNotifications] = useState([]);
  const [inboxMessages, setInboxMessages] = useState([]);

  const getToken = useCallback(async () => {
    try {
      let token = sessionStorage.getItem('authToken'); // Changed to sessionStorage for better security
      if (!token) {
        token = await getAccessTokenSilently({
          authorizationParams: {
            audience: audience,
            scope: 'openid profile email',
          },
        });
        sessionStorage.setItem('authToken', token); // Changed to sessionStorage
      }
      return token;
    } catch (e) {
      if (e.error === 'consent_required') {
        //loginWithRedirect(); // Automatically redirect for consent
      } else {
        console.error('Error obtaining access token:', e);
      }
      return null;
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      if (token) {
        const fetchNotificationsPromise = fetch('/api/notifications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchMessagesPromise = fetch('/api/messages', {
          headers: { Authorization: `Bearer ${token}` },
        });

        try {
          const [notificationsResponse, messagesResponse] = await Promise.all([
            fetchNotificationsPromise,
            fetchMessagesPromise,
          ]);
          setNotifications(await notificationsResponse.json());
          setInboxMessages(await messagesResponse.json());
        } catch (e) {
          console.error('Error fetching data:', e);
        }
      }
    };

    fetchData();
  }, [getToken]);

  return (
    <Navbar variant="light" expand className="navbar-bg">
      <span
        className="sidebar-toggle d-flex"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <i className="hamburger align-self-center" />
      </span>

      <Form inline="true" className="d-none d-sm-inline-block">
        <InputGroup className="input-group-navbar">
          <Form.Control placeholder={t('Search')} aria-label="Search" />
          <Button variant="">
            <Search className="feather" />
          </Button>
        </InputGroup>
      </Form>

      <Navbar.Collapse>
        <Nav className="navbar-align">
          <NavbarDropdown
            header="New Messages"
            footer="Show all messages"
            icon={MessageCircle}
            count={inboxMessages.length}
            showBadge
          >
            {inboxMessages.map((message, index) => (
              <NavbarDropdownItem
                key={index}
                icon={
                  <img
                    className="avatar img-fluid rounded-circle"
                    src={message.avatar}
                    alt={message.name}
                  />
                }
                title={message.name}
                description={message.description}
                time={message.time}
                spacing
              />
            ))}
          </NavbarDropdown>

          <NavbarDropdown
            header="New Notifications"
            footer="Show all notifications"
            icon={BellOff}
            count={notifications.length}
          >
            {notifications.map((item, key) => {
              let icon = <Bell size={18} className="text-warning" />;

              if (item.type === 'important') {
                icon = <AlertCircle size={18} className="text-danger" />;
              }

              if (item.type === 'login') {
                icon = <Home size={18} className="text-primary" />;
              }

              if (item.type === 'request') {
                icon = <UserPlus size={18} className="text-success" />;
              }

              return (
                <NavbarDropdownItem
                  key={key}
                  icon={icon}
                  title={item.title}
                  description={item.description}
                  time={item.time}
                />
              );
            })}
          </NavbarDropdown>

          <NavbarLanguages />
          <NavbarUser />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
