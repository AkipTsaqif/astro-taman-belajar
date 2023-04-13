import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/main-menu/Home";
import SolarSystem from "./components/main-menu/background/SolarSystem";
import Eccentricity from "./components/animations/Eccentricity";
import "./index.css";
import { CssBaseline } from "@mui/material";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/solar-system",
		element: <SolarSystem />,
	},
	{
		path: "/ecc",
		element: <Eccentricity />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<CssBaseline />
		<RouterProvider router={router} />
	</React.StrictMode>
);
