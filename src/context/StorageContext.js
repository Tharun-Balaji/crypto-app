/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import { CryptoContext } from "./CryptoContext";

export const StorageContext = createContext({});

export function StorageProvider({ children }) {
  // State for storing the array of all coins saved by the user
  const [allCoins, setAllCoins] = useState([]);

  // State for storing the data of all saved coins
  const [savedData, setSavedData] = useState();

  // getting the currency and sort order from the CryptoContext
  const { currency, sortBy } = useContext(CryptoContext);

  // Function to save a new coin to the local storage and update the state
  const saveCoin = (coinId) => {
    // Get the current array of coins from local storage
    let oldCoins = JSON.parse(localStorage.getItem("coins"));

    // If the coin is already in the array, return null
    if (oldCoins.includes(coinId)) {
      return null;
    } else {
      // if the coin is not in the array, add it to the array and update the state and local storage
      let newCoin = [...oldCoins, coinId];
      setAllCoins(newCoin);
      localStorage.setItem("coins", JSON.stringify(newCoin));
    }
  };

  // Function to remove a coin from the local storage and update the state
  const removeCoin = (coinId) => {
    // Get the current array of coins from local storage
    let oldCoins = JSON.parse(localStorage.getItem("coins"));

    // Filter out the coin from the array and update the state and local storage
    let newCoin = oldCoins.filter((coin) => coin !== coinId);

    setAllCoins(newCoin);
    localStorage.setItem("coins", JSON.stringify(newCoin));
  };

  // Function to get the data of all saved coins from the API
  const getSavedData = async (totalCoins = allCoins) => {
    // Fetch the data from the API
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(",")}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&x_cg_demo_api_key=CG-xPTDuU1xWf9V99UybnaCu79t`
      )
        .then((res) => res.json())
        .then((json) => json);

      // Update the state with the data
      setSavedData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to reset the saved data to the original state
  const resetSavedResult = () => {
    getSavedData();
  };

  // useEffect hook to get the saved data when the component is mounted
  useEffect(() => {
    if (allCoins.length > 0) {
      getSavedData(allCoins);
    } else {
      setSavedData();
    }
  }, [allCoins]);

  // useLayoutEffect hook to set the local storage when the component is mounted
  useLayoutEffect(() => {
    let isThere = JSON.parse(localStorage.getItem("coins")) || false;

    if (!isThere) {
      //set the localstorage with empty array
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      //set the state with the current values from the local storage
      let totalCoins = JSON.parse(localStorage.getItem("coins"));
      setAllCoins(totalCoins);

      if (totalCoins.length > 0) {
        getSavedData(totalCoins);
      }
    }
  }, []);

  return (
    <StorageContext.Provider
      value={{
        allCoins,
        setAllCoins,
        saveCoin,
        removeCoin,
        savedData,
        resetSavedResult,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
