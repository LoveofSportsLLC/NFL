import React from 'react';
import { Form } from 'react-bootstrap';
import { TEAMS } from '../constants';

const FilterComponent = ({ filter, team, onFilterChange, onTeamChange }) => (
  <div className="text-left mb-4">
    <Form.Group className="d-inline-block mr-4">
      <Form.Label>Filter by time range:</Form.Label>
      <Form.Control
        as="select"
        value={filter}
        onChange={onFilterChange}
        className="w-auto d-inline-block ml-2"
      >
        <option value="24hrs">Last 24 Hours</option>
        <option value="2days">Last 2 Days</option>
        <option value="7days">Last 7 Days</option>
        <option value="1month">Last 1 Month</option>
        <option value="2months">Last 2 Months</option>
      </Form.Control>
    </Form.Group>
    <Form.Group className="d-inline-block ml-4">
      <Form.Label>Filter by team:</Form.Label>
      <Form.Control
        as="select"
        value={team}
        onChange={onTeamChange}
        className="w-auto d-inline-block ml-2"
      >
        <option value="all">All Teams</option>
        {Object.keys(TEAMS).map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  </div>
);

export default FilterComponent;
