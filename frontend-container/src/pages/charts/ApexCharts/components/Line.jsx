import React, { Suspense } from 'react';
import { Card } from 'react-bootstrap';
import usePalette from '../../../../hooks/usePalette';
import Chart from 'react-apexcharts';

const LineChart = () => {
  const palette = usePalette();

  const data = [
    {
      name: 'Session Duration',
      data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
    },
    {
      name: 'Page Views',
      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
    },
    {
      name: 'Total Visits',
      data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
    },
  ];

  const options = {
    chart: { zoom: { enabled: false } },
    dataLabels: { enabled: false },
    stroke: { width: [5, 7, 5], curve: 'straight', dashArray: [0, 8, 5] },
    markers: { size: 0, style: 'hollow' },
    xaxis: {
      categories: [
        '01 Jan',
        '02 Jan',
        '03 Jan',
        '04 Jan',
        '05 Jan',
        '06 Jan',
        '07 Jan',
        '08 Jan',
        '09 Jan',
        '10 Jan',
        '11 Jan',
        '12 Jan',
      ],
    },
    tooltip: {
      y: [
        { title: { formatter: (val) => val + ' (mins)' } },
        { title: { formatter: (val) => val + ' per session' } },
        { title: { formatter: (val) => val } },
      ],
    },
    grid: { borderColor: '#f1f1f1' },
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
        <Card.Title>Line Chart</Card.Title>
        <h6 className="card-subtitle text-muted">
          Line charts are a typical pictorial representation that depicts
          behaviors over time.
        </h6>
      </Card.Header>
      <Card.Body>
        <div className="chart">
          <Suspense fallback={<div>Loading Chart...</div>}>
            <Chart options={options} series={data} type="line" height="350" />
          </Suspense>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LineChart;
