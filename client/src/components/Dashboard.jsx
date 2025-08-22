import React, { useState, useEffect } from 'react';

// *** CHANGE: Import Chart.js and registration here, as this is the main container ***
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement,
  LineElement, Filler, Title, Tooltip, Legend, ArcElement,
} from 'chart.js';

// *** CHANGE: Import the new, separate chart components ***
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';
import AreaChart from './charts/AreaChart';

// Register Chart.js components once in the main container
ChartJS.register(
  CategoryScale, LinearScale, BarElement, PointElement, LineElement,
  Filler, Title, Tooltip, Legend, ArcElement
);

// Helper function (no change)
const formatGdpValue = (value) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)} Trillion`;
    return `$${(value / 1e9).toFixed(2)} Billion`;
};

const Dashboard = () => {
  // All state management remains here
  const [country, setCountry] = useState('IN');
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [areaChartData, setAreaChartData] = useState(null);
  const [countryName, setCountryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const countries = [
    { code: 'IN', name: 'India' }, { code: 'US', name: 'United States' },
    { code: 'CN', name: 'China' }, { code: 'JP', name: 'Japan' },
    { code: 'DE', name: 'Germany' }, { code: 'GB', name: 'United Kingdom' },
    { code: 'BR', name: 'Brazil' }, { code: 'NG', name: 'Nigeria' },
  ];

  // All data fetching logic remains here
 // Replace your existing useEffect with this corrected version
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setBarChartData(null);
      setPieChartData(null);
      setAreaChartData(null);

      const url = `https://api.worldbank.org/v2/country/${country}/indicator/NY.GDP.MKTP.CD?format=json`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok.');
        const data = await response.json();

        if (!data || !data[1] || data[1].length === 0) {
          throw new Error('No data available for this country.');
        }

        const validData = data[1].filter(item => item.value !== null);
        setCountryName(validData[0]?.country.value || 'Selected Country');

        // *** FIX: This is the correct spelling for the variable ***
        const reversedData = [...validData].reverse();

        // --- 1. Bar Chart Data (Last 10 Years) ---
        // Ensure you are using 'reversedData' here
        const last10YearsData = reversedData.slice(-10);
        setBarChartData({
          labels: last10YearsData.map(item => item.date),
          datasets: [{
              label: `GDP (current US$)`,
              data: last10YearsData.map(item => item.value),
              backgroundColor: 'rgba(54, 162, 235, 0.7)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              borderRadius: 5,
            }],
        });
        
        // --- 2. Pie Chart Data (Last 7 Years) ---
        // Ensure you are using 'reversedData' here
        const recentDataForPie = reversedData.slice(-7);
        setPieChartData({
            labels: recentDataForPie.map(item => item.date),
            datasets: [{
                label: 'GDP Distribution',
                data: recentDataForPie.map(item => item.value),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#4D5360'],
            }]
        });

        // --- 3. Area Chart Data (Last 15 Years) ---
        // Ensure you are using 'reversedData' here
        const last15YearsData = reversedData.slice(-15);
        setAreaChartData({
            labels: last15YearsData.map(item => item.date),
            datasets: [{
                fill: true,
                label: `GDP (current US$)`,
                data: last15YearsData.map(item => item.value),
                backgroundColor: 'rgba(75, 192, 192, 0.3)',
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.3
            }]
        });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [country]);

  // All chart options objects remain here
  const commonOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#555', font: { size: 14, family: 'Inter' }}},
      title: { display: true, color: '#333', font: { size: 20, family: 'Inter', weight: 'bold' }},
      tooltip: { enabled: true, backgroundColor: 'rgba(0,0,0,0.8)', titleFont: { size: 16, family: 'Inter', weight: 'bold' }, bodyFont: { size: 14, family: 'Inter' }, padding: 10, cornerRadius: 5, callbacks: { label: (context) => ` ${formatGdpValue(context.parsed.y || context.parsed)}` }}
    },
    animation: { duration: 1000, easing: 'easeInOutCubic' }
  };
 const barOptions = { 
  ...commonOptions,
  plugins: { 
    ...commonOptions.plugins,
    title: { 
      ...commonOptions.plugins.title, 
      text: `Last 10 Years of GDP for ${countryName}` 
    }
  },
  scales: { 
    y: { 
      ticks: { 
        color: '#555', 
        font: { family: 'Inter' }, 
        callback: (value) => `${value / 1e9}B` 
      }, 
      grid: { color: '#e0e0e0' } 
    },
    x: { 
      ticks: { color: '#555', font: { family: 'Inter' }}, 
      grid: { display: false } 
    }
  }
};

  const pieOptions = { ...commonOptions, plugins: { ...commonOptions.plugins, title: { ...commonOptions.plugins.title, text: `GDP Share (Last 7 Years) in ${countryName}` }}};
 const areaOptions = { 
  ...commonOptions,
  plugins: { 
    ...commonOptions.plugins,
    title: { 
      ...commonOptions.plugins.title, 
      text: `Full Historical GDP Trend for ${countryName}` 
    }
  },
  scales: { 
    y: { 
      ticks: { 
        color: '#555', 
        font: { family: 'Inter' }, 
        callback: (value) => formatGdpValue(value) 
      }, 
      grid: { color: '#e0e0e0' } 
    },
    x: { 
      ticks: { color: '#555', font: { family: 'Inter' }}, 
      grid: { display: false } 
    }
  }
};

  // The JSX and Styling remains here
  return (
    <>
      <style>{`
        :root { --bg-color: #f8f9fa; --card-bg-color: #ffffff; --text-color: #343a40; --primary-color: #007bff; --shadow-color: rgba(0, 0, 0, 0.08); --font-family: 'Inter', sans-serif; }
        body { background-color: var(--bg-color); font-family: var(--font-family); color: var(--text-color); }
        .dashboard-container { padding: 2rem; max-width: 1600px; margin: auto; }
        .header { text-align: center; margin-bottom: 2.5rem; }
        .header h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem; }
        .filter-container { margin-top: 1.5rem; display: flex; justify-content: center; align-items: center; gap: 1rem; }
        .filter-container label { font-size: 1.1rem; font-weight: 500; }
        .country-select { padding: 0.75rem 1rem; font-size: 1rem; font-family: var(--font-family); border-radius: 8px; border: 1px solid #ced4da; background-color: var(--card-bg-color); cursor: pointer; transition: border-color 0.2s, box-shadow 0.2s; }
        .country-select:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25); }
        .top-charts-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 2rem; }
        .chart-container-full-width { margin-top: 2rem; }
        .chart-container { position: relative; height: 550px; background-color: var(--card-bg-color); padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 6px var(--shadow-color); transition: transform 0.3s ease, box-shadow 0.3s ease; display: flex; align-items: center; justify-content: center; }
        .chart-container:hover { transform: translateY(-5px); box-shadow: 0 12px 16px var(--shadow-color); }
        .message { text-align: center; font-size: 1.2rem; padding: 2rem; }
        .message-error { color: #dc3545; }
        @media (max-width: 500px) { .top-charts-container { grid-template-columns: 1fr; } }
      `}</style>

      <div className="dashboard-container">
        <header className="header">
          <h1>Global GDP Explorer</h1>
          <div className="filter-container">
            <label htmlFor="country-select">Viewing Data For:</label>
            <select id="country-select" value={country} onChange={(e) => setCountry(e.target.value)} className="country-select">
              {countries.map((c) => (<option key={c.code} value={c.code}>{c.name}</option>))}
            </select>
          </div>
        </header>

        <main>
          {loading && <p className="message">Fetching latest data...</p>}
          {error && <p className="message message-error">Failed to load data: {error}</p>}
          
          {!loading && !error && (
            <>
              <div className="top-charts-container">
                <div className="chart-container">
                  {/* *** CHANGE: Use the new BarChart component and pass props *** */}
                  <BarChart data={barChartData} options={barOptions} />
                </div>
                <div className="chart-container">
                  {/* *** CHANGE: Use the new PieChart component and pass props *** */}
                  <PieChart data={pieChartData} options={pieOptions} />
                </div>
              </div>

              <div className="chart-container chart-container-full-width">
                {/* *** CHANGE: Use the new AreaChart component and pass props *** */}
                <AreaChart data={areaChartData} options={areaOptions} />
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;