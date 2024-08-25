import React from 'react';
import PropTypes from 'prop-types';
import useHelmet from '../../utils/HelmetLoader'; // Import the utility module
import { useTable, useSortBy } from 'react-table';
import { Card, Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import { tableData, tableColumns } from './data.js';

const ColumnSortingTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy,
    );

  return (
    <Card>
      <Card.Header>
        <Card.Title>Column Sorting</Card.Title>
        <h6 className="card-subtitle text-muted">
          Column sorting by react-table
        </h6>
      </Card.Header>
      <Card.Body>
        <Table striped bordered {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, headerGroupIndex) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                {headerGroup.headers.map((column, columnIndex) => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={columnIndex}
                  >
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FontAwesomeIcon icon={faSortUp} className="ms-2" />
                        ) : (
                          <FontAwesomeIcon icon={faSortDown} className="ms-2" />
                        )
                      ) : (
                        <FontAwesomeIcon icon={faSort} className="ms-2" />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={rowIndex}>
                  {row.cells.map((cell, cellIndex) => {
                    return (
                      <td {...cell.getCellProps()} key={cellIndex}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

// Add PropTypes validation
ColumnSortingTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
        .isRequired,
      accessor: PropTypes.string.isRequired,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ColumnSorting = () => {
  const { Helmet } = useHelmet(); // Use the custom hook for HelmetLoader

  return (
    <React.Fragment>
      <Helmet title="Column Sorting" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Column Sorting</h1>

        <ColumnSortingTable
          columns={tableColumns}
          data={tableData.slice(0, 15)}
        />
      </Container>
    </React.Fragment>
  );
};

export default ColumnSorting;
