import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import HeroSection from "./components/HeroSection.jsx";
import ExploreUniversities from "./pages/ExploreUniversities.jsx";
import UniDetails from "./pages/UniDetails.jsx";
import Signup from "./components/Signup.jsx";

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
        path: '/university-details/:id',
        element: <UniDetails />
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
