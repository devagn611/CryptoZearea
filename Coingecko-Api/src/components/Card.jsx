import React from 'react';

export default function Card({ coin, setSelectedCoin }) {
  const handleClick = () => {
    setSelectedCoin(coin.item?.id || coin.id);
  };

  return (
    <div 
      onClick={handleClick} 
      className="bg-gray-800 border border-gray-700 shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden transition-transform transform hover:scale-105 mx-2 my-2 cursor-pointer"
    >
      <div className="flex gap-1 items-center p-4 flex-none w-full md:w-auto">
        <img
          className="w-20 h-20 md:w-24 md:h-24 rounded-md object-cover"
          src={coin.item?.large || coin.large}
          alt={coin.item?.name || coin.id}
        />
        <div className="ml-2 md:ml-4">
          <h2 className="text-lg md:text-xl font-bold text-white">
            {coin.item?.name || coin.id}
            {coin.item?.symbol && ` (${coin.item.symbol.toUpperCase()})`}
          </h2>
          {coin.item?.market_cap_rank && (
            <p className="text-gray-400 text-sm md:text-base">
              Market Cap Rank: {coin.item.market_cap_rank}
            </p>
          )}
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center items-end p-4 text-right">
        {coin.item?.price_btc ? (
          <p className="text-lg font-bold text-green-400">
            Price: {coin.item.price_btc} BTC
          </p>
        ) : (
          <p className="text-lg font-bold text-blue-400">Details</p>
        )}
        {coin.item?.data?.market_cap !== undefined ? (
          <p className="text-lg text-gray-200">
            Market Cap: {coin.item.data.market_cap} BTC
          </p>
        ) : null}
      </div>
    </div>
  );
}
