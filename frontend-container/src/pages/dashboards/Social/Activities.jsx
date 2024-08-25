// src/pages/dashboards/Social/Activities.jsx
import React from 'react';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { MoreHorizontal } from 'react-feather';

const Activities = () => (
  <Card className="flex-fill mb-3">
    <Card.Header>
      <div className="card-actions float-end">
        <Dropdown align="end">
          <Dropdown.Toggle as="a" bsPrefix="-">
            <MoreHorizontal />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another Action</Dropdown.Item>
            <Dropdown.Item>Something else here</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Card.Title className="mb-0">Activities</Card.Title>
    </Card.Header>
    <Card.Body>
      <div className="d-flex">
        <img
          src="/avatars/avatar-5.jpg"
          width="36"
          height="36"
          className="rounded-circle me-2"
          alt="Ashley Briggs"
        />
        <div className="flex-grow-1 ms-3">
          <small className="float-end text-navy">5m ago</small>
          <strong>Ashley Briggs</strong> started following{' '}
          <strong>Stacie Hall</strong>
          <br />
          <small className="text-muted">Today 7:51 pm</small>
          <br />
        </div>
      </div>

      <hr />
      <div className="d-flex">
        <img
          src="/avatars/avatar.jpg"
          width="36"
          height="36"
          className="rounded-circle me-2"
          alt="Chris Wood"
        />
        <div className="flex-grow-1 ms-3">
          <small className="float-end text-navy">30m ago</small>
          <strong>Chris Wood</strong> posted something on{' '}
          <strong>Stacie Hall&rsquo;s</strong> timeline
          <br />
          <small className="text-muted">Today 7:21 pm</small>
          <div className="border text-sm text-muted p-2 mt-1">
            Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem
            quam..
          </div>
        </div>
      </div>

      <hr />
      <div className="d-flex">
        <img
          src="/avatars/avatar-4.jpg"
          width="36"
          height="36"
          className="rounded-circle me-2"
          alt="Stacie Hall"
        />
        <div className="flex-grow-1 ms-3">
          <small className="float-end text-navy">1h ago</small>
          <strong>Stacie Hall</strong> posted a new blog
          <br />
          <small className="text-muted">Today 6:35 pm</small>
        </div>
      </div>

      <hr />
      <div className="d-flex">
        <img
          src="/avatars/avatar-2.jpg"
          width="36"
          height="36"
          className="rounded-circle me-2"
          alt="Carl Jenkins"
        />
        <div className="flex-grow-1 ms-3">
          <small className="float-end text-navy">3h ago</small>
          <strong>Carl Jenkins</strong> posted two photos on{' '}
          <strong>Stacie Hall&rsquo;s</strong> timeline
          <br />
          <small className="text-muted">Today 5:12 pm</small>
          <div className="row no-gutters mt-1">
            <div className="col-6 col-md-4 col-lg-4 col-xl-3">
              <img
                src="/photos/unsplash-1.jpg"
                className="img-fluid pe-2"
                alt="Unsplash"
              />
            </div>
            <div className="col-6 col-md-4 col-lg-4 col-xl-3">
              <img
                src="/photos/unsplash-2.jpg"
                className="img-fluid pe-2"
                alt="Unsplash"
              />
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="d-flex">
        <img
          src="/avatars/avatar-4.jpg"
          width="36"
          height="36"
          className="rounded-circle me-2"
          alt="Stacie Hall"
        />
        <div className="flex-grow-1 ms-3">
          <small className="float-end text-navy">1d ago</small>
          <strong>Stacie Hall</strong> posted a new blog
          <br />
          <small className="text-muted">Yesterday 2:43 pm</small>
        </div>
      </div>

      <hr />
      <div className="d-flex">
        <img
          src="/avatars/avatar.jpg"
          width="36"
          height="36"
          className="rounded-circle me-2"
          alt="Chris Wood"
        />
        <div className="flex-grow-1 ms-3">
          <small className="float-end text-navy">1d ago</small>
          <strong>Chris Wood</strong> started following{' '}
          <strong>Stacie Hall</strong>
          <br />
          <small className="text-muted">Yesterdag 1:51 pm</small>
        </div>
      </div>

      <hr />
      <div className="d-grid">
        <Button variant="primary">Load more</Button>
      </div>
    </Card.Body>
  </Card>
);

export default Activities;
