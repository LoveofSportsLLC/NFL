import React, { Suspense } from 'react';
import { Card } from 'react-bootstrap';
import usePalette from '../../../../hooks/usePalette';

import Chart from 'react-apexcharts';

const BarChart = () => {
  const palette = usePalette();

  const data = [
    { name: 'Marine Sprite', data: [44, 55, 41, 37, 22, 43, 21] },
    { name: 'Striking Calf', data: [53, 32, 33, 52, 13, 43, 32] },
    { name: 'Tank Picture', data: [12, 17, 11, 9, 15, 11, 20] },
    { name: 'Bucket Slope', data: [9, 7, 5, 8, 6, 9, 4] },
    { name: 'Reborn Kid', data: [25, 12, 19, 32, 25, 24, 10] },
  ];

  const options = {
    chart: { stacked: true },
    plotOptions: { bar: { horizontal: true } },
    stroke: { width: 1, colors: ['#fff'] },
    xaxis: {
      categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
      labels: { formatter: (val) => val + 'K' },
    },
    yaxis: { title: { text: undefined } },
    tooltip: { y: { formatter: (val) => val + 'K' } },
    fill: { opacity: 1 },
    legend: { position: 'top', horizontalAlign: 'left', offsetX: 40 },
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
        <Card.Title>Bar Chart</Card.Title>
        <h6 className="card-subtitle text-muted">
          A bar chart is the best tool for displaying comparisons between
          categories of data.
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

export default BarChart;
