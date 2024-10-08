import React, { useEffect, useState } from "react";
import CardChart from "./CardChart";
import {
  FaCaretUp,
  FaCaretDown,
  FaRegClock,
  FaChartLine,
  FaCoins,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function CardDetail({ coinId }) {
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `https://crypto-zearea-api.vercel.app/fetch-all-details?ids=${coinId}`
        );
        const data = await response.json();
        setCoinData(data[0]); // Assuming data returns an array
      } catch (error) {
        console.error("Error fetching coin details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/fetch-chart-data?coin=${coinId}`
        );
        const data = await response.json();
        setChartData(data); // Store the chart data
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchCoinData();
    fetchChartData();
  }, [coinId]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg max-w-7xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => window.location.reload()} 
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
      >
        Back to Home
      </button>

      <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        {/* Coin Section */}
        <div className="flex-1 p-6 bg-opacity-80 backdrop-filter backdrop-blur-lg">
          <h2 className="text-3xl font-bold text-white mb-2">
            {coinData.name}{" "}
            <span className="text-gray-400">
              ({coinData.symbol.toUpperCase()})
            </span>
          </h2>
          <img
            src={coinData.image}
            alt={coinData.name}
            className="w-32 h-32 mb-4 mx-auto"
          />
          <div className="flex flex-col space-y-2">
            <p className="flex items-center text-gray-400 text-sm md:text-base">
              <FaCoins className="mr-2 text-green-400" />
              Current Price:{" "}
              <span className="text-white">${coinData.current_price}</span>
            </p>
            <p className="flex items-center text-gray-400 text-sm md:text-base">
              <FaChartLine className="mr-2 text-blue-400" />
              Market Cap:{" "}
              <span className="text-white">${coinData.market_cap}</span>
            </p>
            <p className="flex items-center text-gray-400 text-sm md:text-base">
              <span className="mr-2">Rank:</span>
              <span className="text-white">{coinData.market_cap_rank}</span>
            </p>
            <p className="flex items-center text-gray-400 text-sm md:text-base">
              <FaCaretUp className="mr-2 text-red-400" />
              24h High: <span className="text-white">${coinData.high_24h}</span>
            </p>
            <p className="flex items-center text-gray-400 text-sm md:text-base">
              <FaCaretDown className="mr-2 text-green-400" />
              24h Low: <span className="text-white">${coinData.low_24h}</span>
            </p>
            <p className="flex items-center text-gray-400 text-sm md:text-base">
              Circulating Supply:{" "}
              <span className="text-white">{coinData.circulating_supply}</span>
            </p>
            <p className="flex items-center text-gray-400 text-sm md:text-base">
              Total Supply:{" "}
              <span className="text-white">{coinData.total_supply}</span>
            </p>
            <p className="flex items-center text-gray-400 text-sm md:text-base">
              <FaRegClock className="mr-2" />
              Last Updated:{" "}
              <span className="text-white">
                {new Date(coinData.last_updated).toLocaleString()}
              </span>
            </p>
          </div>
        </div>

        <div className="flex-1">
          <CardChart data={chartData} />
        </div>
      </div>
    </div>
  );
}
