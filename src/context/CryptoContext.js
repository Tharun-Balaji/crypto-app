/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";

// Create a new context Object
export const CryptoContext = createContext({});

// Create Provider Component
export function CryptoProvider({ children }) {
  // State for storing the data from the API
  const [CryptoData, setCryptoData] = useState();

  // State for storing the search results
  const [searchData, setSearchData] = useState();

  // State for storing the search query
  const [coinSearch, setCoinSearch] = useState("");
  // State for storing the currency
  const [currency, setCurrency] = useState("usd");
  // State for storing the sort by
  const [sortBy, setSortBy] = useState("market_cap_desc");
  // State for storing the page number
  const [page, setPage] = useState(1);
  // State for storing the total pages
  const [totalPages, setTotalPages] = useState(250);
  // State for storing the number of items per page
  const [perPage, setPerPage] = useState(10);

  // State for storing the coin data
  const [coinData, setCoinData] = useState();

  // State for storing the errors
  const [error, setError] = useState({ data: "", coinData: "", search: "" });

  // Function to get the data from the API
  async function getData() {
    setError({ ...error, data: "" });
    setCryptoData();
    setTotalPages(250);
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en&x_cg_demo_api_key=CG-xPTDuU1xWf9V99UybnaCu79t`
      )
        .then( async (res) => {
          if (res.ok) {
            return res.json();
          }
          const errorResponse = await res.json();
          setError({ ...error, data: errorResponse.error });
          throw new Error(errorResponse.error);
        })
        .then((json) => json)
        .catch((error) => console.log(error));

      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  }
  // Function to get the search results
  async function getSearchResult(query) {
    // console.log(query);
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      )
        .then((res) => res.json())
        .then((json) => json);

      setSearchData(data.coins);
      console.log(data.coins);
    } catch (error) {
      console.log(error);
    }
  }

  // Function to reset the state
  function resetFunction(){
    setPage(1);
    setCoinSearch("");
  }

  // Function to get the coin data
  async function getCoinData(coinId) {
    setCoinData();
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false&x_cg_demo_api_key=CG-xPTDuU1xWf9V99UybnaCu79t`
      )
        .then((res) => res.json())
        .then((json) => json);

      // console.log("CoinData", data);
      setCoinData(data);
    } catch (error) {
      console.log(error);
      
    }
  }

  // Use the useEffect hook to call the function to get the data when the component mounts
  useEffect(() => {
    getData();
  }, [coinSearch, currency, sortBy,page, perPage]);

  // Return the context provider with the states and functions
  return (
    <CryptoContext.Provider
      value={{
        CryptoData,
        searchData,
        getSearchResult,
        setSearchData,
        setCoinSearch,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        resetFunction,
        setPerPage,
        perPage,
        coinData,
        getCoinData,
        error
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}


