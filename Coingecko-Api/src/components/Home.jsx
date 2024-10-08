import React, { useEffect, useState } from 'react';
import Card from './Card';
import CardDetail from './CardDetail';

export default function Home() {
  const [loading, isLoading] = useState(true);
  const [coinData, setCoinData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null); // State for selected coin

  useEffect(() => {
    const fetchApi = async () => {
      isLoading(true);
      try {
        const response = await fetch('https://crypto-zearea-api.vercel.app/fetch-trending');
        const data = await response.json();
        setCoinData(data.coins);
        isLoading(false);
      } catch (error) {
        console.log('Error fetching data', error);
        isLoading(false);
      }
    };

    fetchApi();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-900">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Trending CryptoCoins</h1>
      <div className="flex flex-wrap justify-center w-full">
        {selectedCoin ? (
          <CardDetail coinId={selectedCoin} setSelectedCoin={setSelectedCoin} /> 
        ) : (
          coinData.map((coin) => (
            <Card key={coin.item.id} coin={coin} setSelectedCoin={setSelectedCoin} />
          ))
        )}
      </div>
    </div>
  );
}
