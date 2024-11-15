import React from 'react';
import useHelmet from '../../utils/HelmetLoader'; // Import the utility module
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from 'react-table';
import { Card, Container, Table, Form } from 'react-bootstrap';
import { tableData } from './data.js';

const FilterWrapper = ({ shouldRender, children }) => {
  if (!shouldRender) return null;
  return children;
};

/**
 * A custom filter component for number range filtering.
 * @param {Object} props - The component props.
 * @param {Array} props.filterValue - The current filter value.
 * @param {Array} props.preFilteredRows - The rows before filtering.
 * @param {Function} props.setFilter - The function to set the filter value.
 * @param {String} props.id - The unique identifier for the column.
 * @returns {JSX.Element} - The NumberRangeColumnFilter component.
 */
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  let minValue = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
  let maxValue = preFilteredRows.length
    ? preFilteredRows[preFilteredRows.length - 1].values[id]
    : 0;

  preFilteredRows.forEach((row) => {
    minValue = Math.min(row.values[id], minValue);
    maxValue = Math.max(row.values[id], maxValue);
  });

  return (
    <FilterWrapper shouldRender={preFilteredRows.length > 0}>
      <div className="d-flex mt-2">
        <Form.Control
          value={filterValue[0] || ''}
          type="number"
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old = []) => [
              val !== '' ? parseInt(val, 10) : undefined,
              filterValue[1],
            ]);
          }}
          placeholder={`Min (${minValue})`}
          style={{
            width: '110px',
          }}
        />
        <span className="mx-2 mt-1">to</span>
        <Form.Control
          value={filterValue[1] || ''}
          type="number"
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old = []) => [
              filterValue[0],
              val !== '' ? parseInt(val, 10) : undefined,
            ]);
          }}
          placeholder={`Max (${maxValue})`}
          style={{
            width: '110px',
          }}
        />
      </div>
    </FilterWrapper>
  );
}

/**
 * A custom filter component for selecting options.
 * @param {Object} props - The component props.
 * @param {Array} props.filterValue - The current filter value.
 * @param {Array} props.preFilteredRows - The rows before filtering.
 * @param {Function} props.setFilter - The function to set the filter value.
 * @param {String} props.id - The unique identifier for the column.
 * @returns {JSX.Element} - The SelectColumnFilter component.
 */
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = preFilteredRows.map((row) => row.values[id]);

  return (
    <FilterWrapper shouldRender={preFilteredRows.length > 0}>
      <Form.Select
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
    </FilterWrapper>
  );
}

/**
 * A custom filter component for default filtering.
 * @param {Object} props - The component props.
 * @param {Array} props.filterValue - The current filter value.
 * @param {Array} props.preFilteredRows - The rows before filtering.
 * @param {Function} props.setFilter - The function to set the filter value.
 * @param {String} props.id - The unique identifier for the column.
 * @returns {JSX.Element} - The DefaultColumnFilter component.
 */
function DefaultColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const uniqueValues = new Set();
  preFilteredRows.forEach((row) => {
    uniqueValues.add(row.values[id]);
  });
  const options = [...uniqueValues.values()];

  const handleSelectChange = (e) => {
    setSelectedOptions(e.target.value);
    setFilter(selectedOptions);
  };

  return (
    <FilterWrapper shouldRender={true}>
      <Form.Control
        as="select"
        value={selectedOptions}
        onChange={handleSelectChange}
        multiple
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </Form.Control>
    </FilterWrapper>
  );
}

/**
 * A custom table component with column filtering, sorting, and pagination.
 * @param {Object} props - The component props.
 * @param {Array} props.columns - The table columns.
 * @param {Array} props.data - The table data.
 * @returns {JSX.Element} - The ColumnFilteringTable component.
 */
const ColumnFilteringTable = ({ columns, data }) => {
  const filterTypes = {
    text: (rows, id, filterValue) => {
      if (filterValue === null) return rows; // Add this check
      return rows.filter((row) => {
        const rowValue = row.values[id];
        return rowValue !== undefined
          ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
          : true;
      });
    },
  };

  const defaultColumn = {
    Filter: DefaultColumnFilter,
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, filters },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  return (
    <Card>
      <Card.Header>
        <Card.Title>Column Filtering</Card.Title>
        <h6 className="card-subtitle text-muted">
          Column filtering by react-table
        </h6>
      </Card.Header>
      <Card.Body>
        <Table striped bordered {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {column.canFilter ? column.render('Filter') : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between mt-3">
          <div>
            Showing {pageIndex * pageSize + 1} to{' '}
            {Math.min((pageIndex + 1) * pageSize, rows.length)} of {rows.length}{' '}
            entries
          </div>
          <div>
            <Form.Control
              as="select"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </Form.Control>
          </div>
          <div>
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="btn btn-sm btn-primary mr-1"
            >
              First
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="btn btn-sm btn-primary mr-1"
            >
              Previous
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="btn btn-sm btn-primary mr-1"
            >
              Next
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="btn btn-sm btn-primary"
            >
              Last
            </button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

const tableColumns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Position',
    accessor: 'position',
    Filter: SelectColumnFilter,
    filter: 'includes',
  },
  {
    Header: 'Office',
    accessor: 'office',
    Filter: SelectColumnFilter,
    filter: 'includes',
  },
  {
    Header: 'Age',
    accessor: 'age',
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  {
    Header: 'Start Date',
    accessor: 'startDate',
  },
  {
    Header: 'Salary',
    accessor: 'salary',
    Filter: false,
  },
];

const ColumnFiltering = () => {
  const { Helmet } = useHelmet(); // Use the custom hook for HelmetLoader

  return (
    <React.Fragment>
      <Helmet title="Column Filtering" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Column Filtering</h1>
        <ColumnFilteringTable
          columns={tableColumns}
          data={tableData.slice(0, 15)}
        />
      </Container>
    </React.Fragment>
  );
};

export default ColumnFiltering;
