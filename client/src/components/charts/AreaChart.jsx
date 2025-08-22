import React from 'react';
import { Line } from 'react-chartjs-2'; // Area charts are a type of Line chart

const AreaChart = ({ data, options }) => {
  if (!data) {
    return <p>Loading chart data...</p>;
  }

  return <Line data={data} options={options} />;
};

export default AreaChart;