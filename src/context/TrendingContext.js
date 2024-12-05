import { createContext, useEffect, useState } from "react";


// Create a context for the trending data
export const TrendingContext = createContext({});

// Create a provider component for the context
export function TrendingProvider({children}){
    // State for storing the trending data
    const [trendData, setTrendData] = useState();

    // Function to get the trending data from the API
    async function getTrendData() {
      try {
        // Fetch the data from the API
        const data = await fetch(
          "https://api.coingecko.com/api/v3/search/trending"
        )
          // Convert the response to JSON
          .then((res) => res.json())
          // Get the coins from the response
          .then((json) => json);

        // Update the state with the data
        setTrendData(data.coins);
      } catch (error) {
        // Log any errors to the console
        console.log(error);
      }
    }

    // Function to reset the trending data
    function resetTrendingResults() {
        // Call the function to get the trending data
        getTrendData()
    }

    // Use the useEffect hook to call the function to get the trending data when the component mounts
    useEffect(() => {getTrendData()},[])

    // Return the context provider with the trending data and reset function
    return (
        <TrendingContext.Provider value={{trendData, resetTrendingResults}}>
            {children}
        </TrendingContext.Provider>
    )

}
