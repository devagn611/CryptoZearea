import { useEffect, useState } from "react";
import Card from "./Card";

export default function Searchcoin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [coinData, setCoinData] = useState([]);
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      if (!searchQuery) return;
      isLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/search-coin?query=${searchQuery}`
        );
        const data = await response.json();
        setCoinData(data.coins);
        isLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
        isLoading(false);
      }
    };

    fetchApi();
  }, [searchQuery]);

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center p-6 min-h-screen bg-gray-900"> {/* Full screen height */}
        <h1 className="text-3xl font-bold text-white mb-4">Search CyptoCoins</h1>
        <input
          type="text"
          placeholder="Search Coin"
          className="p-2 w-64 rounded-lg border border-gray-700 bg-gray-800 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="btn bg-gray-700 text-white rounded-md mt-[10px] p-[6px]"
        >
          Submit
        </button>

        <div className="flex flex-wrap justify-center w-full mt-6">
          {coinData?.map((coin) => (
            <Card coin={coin} coinid={coin.id}/>
          ))}
        </div>
      </div>
    </>
  );
}
