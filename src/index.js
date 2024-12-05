import React from "react";

import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import reportWebVitals from "./reportWebVitals";

import CryptoDetails from "./Components/CryptoDetails";
import Crypto from "./pages/Crypto";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Trending from "./pages/Trending";

const router = createBrowserRouter([
  {
    // The root route, which matches the "/" path.
    path: "/",
    element: <Home />,
    children: [
      {
        // The route for the Crypto component, which matches the "/" path.
        // This route is also the parent of the :coinID route.
        path: "/",
        element: <Crypto />,
        children: [
          {
            // The route for the CryptoDetails component, which matches the /:coinID path.
            // This route is a child of the Crypto route.
            path: ":coinID",
            element: <CryptoDetails />,
          },
        ],
      },
      {
        // The route for the Trending component, which matches the "/trending" path.
        path: "/trending",
        element: <Trending />,
        children: [
          {
            // The route for the CryptoDetails component, which matches the "/trending/:coinId" path.
            // This route is a child of the Trending route.
            path:":coinId",
            element: <CryptoDetails />
          }
        ]
      },
      {
        // The route for the Saved component, which matches the "/saved" path.
        path: "/saved",
        element: <Saved />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
