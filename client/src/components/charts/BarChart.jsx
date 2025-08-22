import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data, options }) => {
  if (!data) {
    return <p>Loading chart data...</p>;
  }

  return <Bar data={data} options={options} />;
};

export default BarChart;