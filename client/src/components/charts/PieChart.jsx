import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data, options }) => {
  if (!data) {
    return <p>Loading chart data...</p>;
  }

  return <Pie data={data} options={options} />;
};

export default PieChart;