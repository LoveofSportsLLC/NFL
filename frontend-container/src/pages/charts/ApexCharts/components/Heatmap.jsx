import React, { Suspense } from 'react';
import { Card } from 'react-bootstrap';
import usePalette from '../../../../hooks/usePalette';
import Chart from 'react-apexcharts';

const HeatmapChart = () => {
  const palette = usePalette();

  const generateData = (count, yrange) => {
    let series = [];
    for (let i = 0; i < count; i++) {
      series.push({
        x: (i + 1).toString(),
        y:
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
          yrange.min,
      });
    }
    return series;
  };

  const data = [
    { name: 'Metric1', data: generateData(20, { min: 0, max: 90 }) },
    { name: 'Metric2', data: generateData(20, { min: 0, max: 90 }) },
    { name: 'Metric9', data: generateData(20, { min: 0, max: 90 }) },
  ];

  const options = {
    dataLabels: { enabled: false },
    colors: ['#008FFB'],
    xaxis: { type: 'category' },
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Heatmap Chart</Card.Title>
        <h6 className="card-subtitle text-muted">
          Heatmap is a visualization tool that employs color the way a bar
          employs height and width in representing data.
        </h6>
      </Card.Header>
      <Card.Body>
        <div className="chart">
          <Suspense fallback={<div>Loading Chart...</div>}>
            <Chart
              options={options}
              series={data}
              type="heatmap"
              height="350"
            />
          </Suspense>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HeatmapChart;
