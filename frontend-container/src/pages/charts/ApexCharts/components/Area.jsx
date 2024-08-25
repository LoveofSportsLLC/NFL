import React, { useState, Suspense } from 'react';
import { Card, Button } from 'react-bootstrap';
import usePalette from '../../../../hooks/usePalette';
import ReactApexChart from 'react-apexcharts';

const AreaChart = () => {
  const [series, setSeries] = useState([
    { name: 'series1', data: [31, 40, 28, 51, 42, 109, 100] },
    { name: 'series2', data: [11, 32, 45, 32, 34, 52, 41] },
  ]);
  const palette = usePalette();

  const options = {
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00',
        '2018-09-19T01:30:00',
        '2018-09-19T02:30:00',
        '2018-09-19T03:30:00',
        '2018-09-19T04:30:00',
        '2018-09-19T05:30:00',
        '2018-09-19T06:30:00',
      ],
    },
    tooltip: { x: { format: 'dd/MM/yy HH:mm' } },
    colors: [
      palette.primary,
      palette.success,
      palette.warning,
      palette.danger,
      palette.info,
    ],
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Area Chart</Card.Title>
        <h6 className="card-subtitle text-muted">
          Area charts are used to represent quantitative variations.
        </h6>
      </Card.Header>
      <Card.Body>
        <div className="chart">
          <Suspense fallback={<div>Loading Chart...</div>}>
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height="350"
            />
          </Suspense>
        </div>
        <Button
          variant="primary"
          onClick={() =>
            setSeries([
              { name: 'series1', data: [0, 15, 25, 20, 60, 20, 120] },
              { name: 'series2', data: [20, 10, 30, 40, 50, 80, 70] },
            ])
          }
        >
          Update Data
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AreaChart;
