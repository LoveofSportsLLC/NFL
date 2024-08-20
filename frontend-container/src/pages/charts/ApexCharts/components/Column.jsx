import React, { Suspense } from 'react';
import { Card } from 'react-bootstrap';
import usePalette from '../../../../hooks/usePalette';
import Chart from 'react-apexcharts';

const ColumnChart = () => {
  const palette = usePalette();

  const data = [
    { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
    { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
    { name: 'Free Cash Flow', data: [35, 41, 36, 26, 45, 48, 52, 53, 41] },
  ];

  const options = {
    plotOptions: {
      bar: { horizontal: false, endingShape: 'rounded', columnWidth: '55%' },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: {
      categories: [
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
      ],
    },
    yaxis: { title: { text: '$ (thousands)' } },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (val) => '$ ' + val + ' thousands' } },
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
        <Card.Title>Column Chart</Card.Title>
        <h6 className="card-subtitle text-muted">
          A column chart uses vertical bars to display data and is used to
          compare values across categories.
        </h6>
      </Card.Header>
      <Card.Body>
        <div className="chart">
          <Suspense fallback={<div>Loading Chart...</div>}>
            <Chart options={options} series={data} type="bar" height="350" />
          </Suspense>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ColumnChart;
