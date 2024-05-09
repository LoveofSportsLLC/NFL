import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Form,
  Badge,
} from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Briefcase, Home, MapPin, MessageSquare } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import avatar1 from "../../assets/img/avatars/avatar.jpg";
import avatar2 from "../../assets/img/avatars/avatar-2.jpg";
import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
import avatar5 from "../../assets/img/avatars/avatar-5.jpg";
import unsplash1 from "../../assets/img/photos/unsplash-1.jpg";
import unsplash2 from "../../assets/img/photos/unsplash-2.jpg";


const ProfileDetails = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    jobTitle: "",
    favoriteNFLTeam: "",
  });

useEffect(() => {
  const fetchProfile = async () => {
    if (!isAuthenticated) return;

    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        setProfile({
          jobTitle: response.data.jobTitle || "",
          favoriteNFLTeam: response.data.favoriteNFLTeam || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile details:", error);
    }
  };

  fetchProfile();
}, [isAuthenticated, getAccessTokenSilently]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    try {
      const token = await getAccessTokenSilently();
      await axios.post("/api/profile/update", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Profile updated successfully.");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };


  return (
    <Card>
      <Card.Header>
        <Card.Title className="mb-0">Profile Details</Card.Title>
        <Button variant="link" onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel" : "Edit"}
        </Button>
      </Card.Header>
      <Card.Body className="text-center">
        <img
          src={user.picture || "path_to_default_image"}
          alt={user.name}
          className="img-fluid rounded-circle mb-2"
          width="128"
          height="128"
        />
        <Card.Title className="mb-0">{user.name}</Card.Title>
        {editMode ? (
          <Form>
            <Form.Group>
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="jobTitle"
                value={profile.jobTitle}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Favorite NFL Team</Form.Label>
              <Form.Control
                type="text"
                name="favoriteNFLTeam"
                value={profile.favoriteNFLTeam}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={saveProfile}>
              Save Changes
            </Button>
          </Form>
        ) : (
          <div>
            <p className="text-muted mb-2">
              {profile.jobTitle || "No Job Title"}
            </p>
            <p className="text-muted">
              {profile.favoriteNFLTeam || "No Favorite NFL Team"}
            </p>
            <Button size="sm" variant="primary">
              <MessageSquare width={16} height={16} /> Message
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

const Activities = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchActivities = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("/api/activities", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Activities data:", response.data); // Log the response to see the structure
      if (response.data && Array.isArray(response.data)) {
        setActivities(response.data); // Set activities if the response is an array
      } else {
        setActivities([]); // Set an empty array if the data isn't in the expected format
        setError("Data format incorrect or no activities found.");
      }
    } catch (err) {
      console.error("Failed to fetch activities:", err);
      setError("Failed to fetch activities.");
    } finally {
      setLoading(false);
    }
  };

  fetchActivities();
}, [isAuthenticated, getAccessTokenSilently]);


  return (
    <Card>
      <Card.Header>
        <Card.Title className="mb-0">Activities</Card.Title>
      </Card.Header>
      <Card.Body>
        {loading && <div>Loading activities...</div>}
        {error && <div>Error: {error}</div>}
        {!loading &&
          !error &&
          activities.map((activity) => (
            <div key={activity.id} className="mb-2">
              {activity.text}
            </div>
          ))}
      </Card.Body>
    </Card>
  );
};

const Profile = () => (
  <React.Fragment>
    <Helmet title="Profile" />
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Profile</h1>

      <Row>
        <Col md="4" xl="3">
          <ProfileDetails />
        </Col>
        <Col md="8" xl="9">
          <Activities />
        </Col>
      </Row>
    </Container>
  </React.Fragment>
);

export default Profile;