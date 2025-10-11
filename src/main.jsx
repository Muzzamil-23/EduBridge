import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import HeroSection from "./components/HeroSection.jsx";
import ExploreUniversities from "./pages/ExploreUniversities.jsx";
import UniDetails from "./pages/UniDetails.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HeroSection />
      },
      {
        path: '/home',
        element: <HeroSection/>
      },
      {
        path: '/explore',
        element: <ExploreUniversities />
      },
      {
        path: '/university-details/',
        element: <UniDetails />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
