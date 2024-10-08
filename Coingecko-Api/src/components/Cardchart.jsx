import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  CategoryScale,
} from 'chart.js';

// Register the necessary components including CategoryScale
Chart.register(LinearScale, LineElement, PointElement, Title, CategoryScale);

export default function CardChart({ data }) {
  const [chartType, setChartType] = useState('prices');

  if (!data) {
    return <div className="text-gray-400 text-center">No chart data available</div>;
  }

  // Prepare the labels and values based on the selected chart type
  const labels = data[chartType].map(item => new Date(item[0]).toLocaleTimeString());
  const values = data[chartType].map(item => item[1]);

  const chartData = {
    labels,
    datasets: [
      {
        label: chartType === 'prices' ? 'Price in USD' : chartType === 'market_caps' ? 'Market Cap' : 'Total Volume',
        data: values,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        fill: true,
        tension: 0.3, // Smooth curve
        pointRadius: 2, // Smaller points
        pointHoverRadius: 5, // Larger points on hover
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: chartType === 'prices' ? 'Price in USD' : chartType === 'market_caps' ? 'Market Cap' : 'Total Volume',
          color: '#fff',
          font: {
            size: 14,
          },
        },
        ticks: {
          color: '#fff',
        },
      },
      x: {
        type: 'category', // Use category scale
        title: {
          display: true,
          text: 'Time',
          color: '#fff',
          font: {
            size: 14,
          },
        },
        ticks: {
          color: '#fff',
        },
      },
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
      legend: {
        labels: {
          color: '#fff',
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-white mb-4">Price Chart</h3>
      
      <div className="mb-4">
        <label htmlFor="chart-type" className="text-white mr-2">Select Chart Type:</label>
        <select
          id="chart-type"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="bg-gray-700 text-white rounded p-2"
        >
          <option value="prices">Price</option>
          <option value="market_caps">Market Cap</option>
          <option value="total_volumes">Total Volume</option>
        </select>
      </div>

      <div style={{ position: 'relative', height: '400px', width: '100%' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
