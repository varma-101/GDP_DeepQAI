import React, { useState, useEffect } from 'react';
import './Dashboard.css';

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

        const reversedData = [...validData].reverse();

        // --- 1. Bar Chart Data (Last 10 Years) ---
        const last10YearsData = reversedData.slice(-10);
        setBarChartData({
          labels: last10YearsData.map(item => item.date),
          datasets: [{
              label: `GDP (current US$)`,
              data: last10YearsData.map(item => item.value),
              backgroundColor: 'rgba(30, 64, 175, 0.8)',
              borderColor: 'rgba(30, 64, 175, 1)',
              borderWidth: 2,
              borderRadius: 8,
            }],
        });
        
        // --- 2. Pie Chart Data (Last 7 Years) ---
        const recentDataForPie = reversedData.slice(-7);
        setPieChartData({
            labels: recentDataForPie.map(item => item.date),
            datasets: [{
                label: 'GDP Distribution',
                data: recentDataForPie.map(item => item.value),
                backgroundColor: [
                  '#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', 
                  '#dbeafe', '#fbbf24', '#f59e0b'
                ],
                borderWidth: 0,
            }]
        });

        // --- 3. Area Chart Data (Last 15 Years) ---
        const last15YearsData = reversedData.slice(-15);
        setAreaChartData({
            labels: last15YearsData.map(item => item.date),
            datasets: [{
                fill: true,
                label: `GDP (current US$)`,
                data: last15YearsData.map(item => item.value),
                backgroundColor: 'rgba(30, 64, 175, 0.2)',
                borderColor: '#1e40af',
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: '#1e40af',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8,
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

  // Enhanced chart options
  const commonOptions = {
    responsive: true, 
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        labels: { 
          color: '#374151', 
          font: { size: 14, family: 'Inter', weight: '500' },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: { 
        display: true, 
        color: '#1f2937', 
        font: { size: 18, family: 'Inter', weight: '700' },
        padding: { top: 10, bottom: 30 }
      },
      tooltip: { 
        enabled: true, 
        backgroundColor: 'rgba(31, 41, 55, 0.95)', 
        titleFont: { size: 16, family: 'Inter', weight: 'bold' }, 
        bodyFont: { size: 14, family: 'Inter' }, 
        padding: 12, 
        cornerRadius: 8,
        borderColor: '#1e40af',
        borderWidth: 1,
        callbacks: { 
          label: (context) => ` ${formatGdpValue(context.parsed.y || context.parsed)}` 
        }
      }
    },
    animation: { 
      duration: 1200, 
      easing: 'easeInOutCubic' 
    }
  };

  const barOptions = { 
    ...commonOptions,
    plugins: { 
      ...commonOptions.plugins,
      title: { 
        ...commonOptions.plugins.title, 
        text: `GDP Growth Trend - Last 10 Years`
      }
    },
    scales: { 
      y: { 
        beginAtZero: false,
        ticks: { 
          color: '#6b7280', 
          font: { family: 'Inter', size: 12 }, 
          callback: (value) => `${(value / 1e9).toFixed(0)}B` 
        }, 
        grid: { 
          color: 'rgba(229, 231, 235, 0.5)',
          lineWidth: 1
        },
        border: { display: false }
      },
      x: { 
        ticks: { 
          color: '#6b7280', 
          font: { family: 'Inter', size: 12 }
        }, 
        grid: { display: false },
        border: { display: false }
      }
    }
  };

  const pieOptions = { 
    ...commonOptions, 
    plugins: { 
      ...commonOptions.plugins, 
      title: { 
        ...commonOptions.plugins.title, 
        text: `GDP Distribution - Recent Years`
      },
      legend: {
        ...commonOptions.plugins.legend,
        position: 'bottom',
        labels: {
          ...commonOptions.plugins.legend.labels,
          padding: 15
        }
      }
    }
  };

  const areaOptions = { 
    ...commonOptions,
    plugins: { 
      ...commonOptions.plugins,
      title: { 
        ...commonOptions.plugins.title, 
        text: `Historical GDP Trend - 15 Year Overview`
      }
    },
    scales: { 
      y: { 
        beginAtZero: false,
        ticks: { 
          color: '#6b7280', 
          font: { family: 'Inter', size: 12 }, 
          callback: (value) => formatGdpValue(value) 
        }, 
        grid: { 
          color: 'rgba(229, 231, 235, 0.5)',
          lineWidth: 1
        },
        border: { display: false }
      },
      x: { 
        ticks: { 
          color: '#6b7280', 
          font: { family: 'Inter', size: 12 }
        }, 
        grid: { display: false },
        border: { display: false }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="dashboard-title">
              Global GDP <span className="title-highlight">Analytics</span>
            </h1>
            <p className="dashboard-subtitle">
              Explore comprehensive economic data and trends from the World Bank
            </p>
          </div>
          
          <div className="country-selector-container">
            <label htmlFor="country-select" className="selector-label">
              📊 Analyzing Data For:
            </label>
            <div className="selector-wrapper">
              <select 
                id="country-select" 
                value={country} 
                onChange={(e) => setCountry(e.target.value)} 
                className="country-selector"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {countryName && !loading && (
          <div className="country-info">
            <h2 className="country-name">{countryName}</h2>
            <p className="country-description">Economic Performance Dashboard</p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Fetching latest economic data...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3 className="error-title">Data Loading Error</h3>
            <p className="error-message">{error}</p>
            <button 
              className="retry-button" 
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}
        
        {!loading && !error && (
          <>
            {/* Charts Grid */}
            <div className="charts-grid">
              <div className="chart-card">
                <div className="chart-header">
                  <div className="chart-icon">📈</div>
                  <div>
                    <h3 className="chart-title">Annual GDP Growth</h3>
                    <p className="chart-description">Yearly economic performance</p>
                  </div>
                </div>
                <div className="chart-wrapper">
                  <BarChart data={barChartData} options={barOptions} />
                </div>
              </div>

              <div className="chart-card">
                <div className="chart-header">
                  <div className="chart-icon">🥧</div>
                  <div>
                    <h3 className="chart-title">GDP Distribution</h3>
                    <p className="chart-description">Economic composition overview</p>
                  </div>
                </div>
                <div className="chart-wrapper">
                  <PieChart data={pieChartData} options={pieOptions} />
                </div>
              </div>
            </div>

            {/* Full Width Area Chart */}
            <div className="chart-card chart-card-wide">
              <div className="chart-header">
                <div className="chart-icon">📊</div>
                <div>
                  <h3 className="chart-title">Long-term Economic Trend</h3>
                  <p className="chart-description">Historical GDP progression analysis</p>
                </div>
              </div>
              <div className="chart-wrapper chart-wrapper-large">
                <AreaChart data={areaChartData} options={areaOptions} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;