import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/main-menu/Home";
import SolarSystem from "./components/main-menu/background/SolarSystem";
import Eccentricity2 from "./components/animations/Eccentricity2";
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
		element: <Eccentricity2 />,
	},
	{
		path: "/ecc-real",
		element: <Eccentricity />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<CssBaseline />
		<RouterProvider router={router} />
	</React.StrictMode>
);
