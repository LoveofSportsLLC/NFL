import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import useHelmet from '../../utils/HelmetLoader'; // Import the utility module
import {
  Button,
  Card,
  Col,
  Container,
  InputGroup,
  Form,
  Row,
} from 'react-bootstrap';

// ChatMessage component with prop types validation
const ChatMessage = ({ position, avatar, name, children, time }) => (
  <div className={`chat-message-${position} pb-4`}>
    <div>
      <img
        src={avatar || '/avatars/avatar.jpg'}
        className="rounded-circle me-1"
        alt={name}
        width="40"
        height="40"
      />
      <div className="text-muted small text-nowrap mt-2">{time}</div>
    </div>
    <div
      className={`flex-shrink-1 bg-light rounded py-2 px-3 ${
        position === 'right' ? 'me-3' : 'ms-3'
      }`}
    >
      <div className="fw-bold mb-1">{name}</div>
      {children}
    </div>
  </div>
);

// Adding PropTypes validation to ChatMessage component
ChatMessage.propTypes = {
  position: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  time: PropTypes.string.isRequired,
};

const Chat = () => {
  const { user } = useAuth0();
  const Helmet = useHelmet();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`/api/messages?userId=${user.sub}`)
      .then((response) => response.json())
      .then((data) => setMessages(data));
  }, [user.sub]);

  if (!Helmet) {
    return null; // Or a loading spinner, if desired
  }

  return (
    <React.Fragment>
      <Helmet title="Chat" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Messages</h1>

        <Card>
          <Row className="g-0">
            <Col lg={5} xl={3} className="border-end list-group">
              {/* Left sidebar with contacts */}
            </Col>
            <Col lg={7} xl={9}>
              <div className="py-2 px-4 border-bottom d-none d-lg-block">
                {/* Header for the chat */}
              </div>

              <div className="position-relative">
                <div className="chat-messages p-4">
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={index}
                      position={message.position}
                      avatar={message.avatar}
                      name={message.name}
                      time={message.time}
                    >
                      {message.text}
                    </ChatMessage>
                  ))}
                </div>
              </div>

              <div className="flex-grow-0 py-3 px-4 border-top">
                <InputGroup>
                  <Form.Control type="text" placeholder="Type your message" />
                  <Button variant="primary">Send</Button>
                </InputGroup>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Chat;
