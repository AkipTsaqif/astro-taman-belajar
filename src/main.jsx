import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/main-menu/Home";
import SolarSystem from "./components/animations/SolarSystem";
import Eccentricity2 from "./components/animations/Eccentricity2";
import Eccentricity from "./components/animations/Eccentricity";
import "./index.css";
import { CssBaseline } from "@mui/material";
import Chapter from "./components/chapter/Chapter";
import AnimationsMenu from "./components/animations/AnimationsMenu";
import Quiz from "./components/quiz/Quiz";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/tata-surya",
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
    {
        path: "/materi/nama-materi",
        element: <Chapter />,
    },
    {
        path: "/kuis",
        element: <Quiz />,
    },
    {
        path: "/animasi",
        element: <AnimationsMenu />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <CssBaseline />
        <RouterProvider router={router} />
    </React.StrictMode>
);
