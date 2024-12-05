# 🚀 Crypto Screener React Application

## 📝 Project Overview

This Crypto Screener is a comprehensive React application designed for beginners and intermediate React learners. The project demonstrates various React concepts and provides a feature-rich cryptocurrency information platform.

![crypto screener](image.png)
![crypto details](image-1.png)
![trending page](image-2.png)
![saved page](image-3.png)
![mobile view](image-5.png)
![mobile view trending page](image-4.png)
![mobile view crypto details page](image-6.png)

## 🌟 Key Features

- **Real-time Cryptocurrency Data**: Fetch and display up-to-date cryptocurrency information
- **Search Functionality**: Easily find specific cryptocurrencies
- **Sorting and Filtering**: Organize cryptocurrencies by various metrics
- **Currency Conversion**: View prices in different local currencies
- **Bookmarking**: Save and track your favorite cryptocurrencies
- **Trending Coins**: Discover currently popular cryptocurrencies
- **Interactive Charts**: Visualize cryptocurrency performance
- **Mobile Responsive**: Fully responsive design for all device types

## 🛠 Technologies and Libraries Used

- **React JS** (Create React App)
- **Tailwind CSS** for styling
- **React Context API** for state management
- **React Router** for navigation
- **Recharts** for interactive charts
- **CoinGecko API** for cryptocurrency data

## 📂 Project Structure

```
src/
├── Pages/
│   ├── Crypto.jsx
│   ├── Home.jsx
│   │   ├── Logo.jsx
│   │   ├── Navigation.jsx
│   │   └── Outlet.jsx
│   ├── Saved.jsx
│   │   ├── SaveButton.jsx
│   │   └── Outlet.jsx
│   └── Trending.jsx
│       ├── TrendingCoin.jsx
│       └── Outlet.jsx
└── Context/
    ├── CryptoContext.js
    ├── StorageContext.js
    └── TrendingContext.js
```

## 🔑 Key React Concepts Demonstrated

### Context API Implementation

#### CryptoContext.js
A comprehensive example of using React Context for global state management:

```javascript
import { createContext, useEffect, useState } from "react";

export const CryptoContext = createContext({});

export function CryptoProvider({ children }) {
  // State management for crypto data
  const [CryptoData, setCryptoData] = useState();
  const [searchData, setSearchData] = useState();
  const [coinSearch, setCoinSearch] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);

  // Async function to fetch cryptocurrency data
  async function getData() {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en&x_cg_demo_api_key=CG-xPTDuU1xWf9V99UybnaCu79t`
      ).then((res) => res.json());

      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect to trigger data fetching
  useEffect(() => {
    getData();
  }, [coinSearch, currency, sortBy, page, perPage]);

  return (
    <CryptoContext.Provider
      value={{
        CryptoData,
        searchData,
        currency,
        setCurrency,
        // ... other context values
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}
```

#### StorageContext.js
Demonstrating local storage integration:

```javascript
import { createContext, useContext, useLayoutEffect, useState, useEffect } from "react";
import { CryptoContext } from "./CryptoContext";

export const StorageContext = createContext({});

export function StorageProvider({ children }) {
  const [allCoins, setAllCoins] = useState([]);
  const [savedData, setSavedData] = useState();

  const { currency, sortBy } = useContext(CryptoContext);

  // Function to save a coin to local storage
  const saveCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));
    
    if (oldCoins.includes(coinId)) {
      return null;
    } else {
      let newCoin = [...oldCoins, coinId];
      setAllCoins(newCoin);
      localStorage.setItem("coins", JSON.stringify(newCoin));
    }
  };

  // useLayoutEffect to initialize local storage
  useLayoutEffect(() => {
    let isThere = JSON.parse(localStorage.getItem("coins")) || false;

    if (!isThere) {
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      let totalCoins = JSON.parse(localStorage.getItem("coins"));
      setAllCoins(totalCoins);
    }
  }, []);

  return (
    <StorageContext.Provider
      value={{
        allCoins,
        saveCoin,
        savedData,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
```

### Routing Configuration

```javascript
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Crypto />,
        children: [
          {
            path: ":coinID",
            element: <CryptoDetails />,
          },
        ],
      },
      {
        path: "/trending",
        element: <Trending />,
        children: [
          {
            path: ":coinId",
            element: <CryptoDetails />
          }
        ]
      },
      {
        path: "/saved",
        element: <Saved />,
      },
    ],
  },
]);
```

## 🌐 Live Demo

Check out the live application: [Crypto Screener Demo](https://ephemeral-clafoutis-a06fc8.netlify.app/)

## 🛡️ API Integration

Uses CoinGecko's free API with a demo API key for:
- Cryptocurrency market data
- Trending coins
- Coin details
- Search functionality

## 📦 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Tharun-Balaji/React.js.git
   ```

2. Navigate to the project directory
   ```bash
   cd React-Projects/crypto-app
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Start the development server
   ```bash
   npm start
   ```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Tharun-Balaji/React.js/issues).

## 📄 License

This project is open source. Please check the original repository for specific licensing information.

## 👨‍💻 Author

Tharun Balaji

## 🙏 Acknowledgements

- [CoinGecko API](https://www.coingecko.com/en/api/documentation)
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)