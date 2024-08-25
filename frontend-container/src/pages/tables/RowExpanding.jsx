import React from 'react';
import PropTypes from 'prop-types';
import useHelmet from '../../utils/HelmetLoader'; // Import the utility module
import { useTable, useRowSelect } from 'react-table';
import { Card, Container, Table } from 'react-bootstrap';
import { tableData, tableColumns } from './data.js';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  },
);

// Adding a displayName for better debugging and DevTools support
IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';

// Prop types validation for IndeterminateCheckbox
IndeterminateCheckbox.propTypes = {
  indeterminate: PropTypes.bool.isRequired,
};

// Define HeaderCell component
const HeaderCell = ({ getToggleAllRowsSelectedProps }) => (
  <div>
    <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
  </div>
);

HeaderCell.propTypes = {
  getToggleAllRowsSelectedProps: PropTypes.func.isRequired,
};

// Define RowCell component
const RowCell = ({ row }) => (
  <div>
    <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
  </div>
);

RowCell.propTypes = {
  row: PropTypes.shape({
    getToggleRowSelectedProps: PropTypes.func.isRequired,
  }).isRequired,
};

const RowSelectionTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((columns) => [
          {
            id: 'selection',
            Header: HeaderCell,
            Cell: RowCell,
          },
          ...columns,
        ]);
      },
    );

  return (
    <Card>
      <Card.Header>
        <Card.Title>Row Selection</Card.Title>
        <h6 className="card-subtitle text-muted">
          Row selection by react-table
        </h6>
      </Card.Header>
      <Card.Body>
        <Table striped bordered {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, headerGroupIndex) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <th {...column.getHeaderProps()} key={columnIndex}>
                    {column.render('Header')}
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
                  {row.cells.map((cell, cellIndex) => (
                    <td {...cell.getCellProps()} key={cellIndex}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

// Prop types validation for RowSelectionTable
RowSelectionTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
        .isRequired,
      accessor: PropTypes.string.isRequired,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      getRowProps: PropTypes.func.isRequired,
      cells: PropTypes.arrayOf(
        PropTypes.shape({
          getCellProps: PropTypes.func.isRequired,
          render: PropTypes.func.isRequired,
        }),
      ).isRequired,
      getToggleRowSelectedProps: PropTypes.func.isRequired,
    }),
  ).isRequired,
  prepareRow: PropTypes.func.isRequired,
  headerGroups: PropTypes.arrayOf(
    PropTypes.shape({
      getHeaderGroupProps: PropTypes.func.isRequired,
      headers: PropTypes.arrayOf(
        PropTypes.shape({
          getHeaderProps: PropTypes.func.isRequired,
          render: PropTypes.func.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

const RowSelection = () => {
  const { Helmet } = useHelmet(); // Use the custom hook for HelmetLoader

  return (
    <React.Fragment>
      <Helmet title="Row Selection" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Row Selection</h1>

        <RowSelectionTable
          columns={tableColumns}
          data={tableData.slice(0, 10)}
        />
      </Container>
    </React.Fragment>
  );
};

export default RowSelection;
