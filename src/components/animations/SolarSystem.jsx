import React, { useEffect, useRef, useState } from "react";
import { Box, Breadcrumbs, Button, Slider, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import Navbar from "../../shared-components/Navbar";
import AnimationControls from "../../shared-components/AnimationControls";
import randomize from "../../utilities/randomize";
import { Link } from "react-router-dom";

const planetData = [
    {
        id: "mercury-orbit",
        sma: 11,
        smi: 10,
        startPos: randomize(0, 360),
        orbitSpeed: 0.004,
    },
    {
        id: "venus-orbit",
        sma: 18,
        smi: 17,
        startPos: randomize(0, 360),
        orbitSpeed: 0.001,
    },
    {
        id: "earth-orbit",
        sma: 27,
        smi: 26,
        startPos: randomize(0, 360),
        orbitSpeed: 0.0005,
    },
    {
        id: "mars-orbit",
        sma: 45,
        smi: 43,
        startPos: randomize(0, 360),
        orbitSpeed: 0.0001,
    },
    {
        id: "jupiter-orbit",
        sma: 100,
        smi: 97,
        startPos: randomize(0, 360),
        orbitSpeed: 0.00001,
    },
    {
        id: "saturn-orbit",
        sma: 199,
        smi: 197,
        startPos: randomize(0, 360),
        orbitSpeed: 0.000003,
    },
    {
        id: "uranus-orbit",
        sma: 400,
        smi: 395,
        startPos: randomize(0, 360),
        orbitSpeed: 0.0000006,
    },
    {
        id: "neptune-orbit",
        sma: 600,
        smi: 595,
        startPos: randomize(0, 360),
        orbitSpeed: 0.0000001,
    },
];

const SolarSystem = (props) => {
    const [player, setPlayer] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isPanning, setIsPanning] = useState(false);

    const pathnames = location.pathname.split("/").filter((x) => x);

    const [overlay, setOverlay] = useState(true);
    const [zoom, setZoom] = useState(1);
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [centerOffset, setCenterOffset] = useState({
        offsetX: 0,
        offsetY: 0,
    });
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });

    // useEffect(() => {
    //     const animate = setInterval(() => {
    //         setPlayer(player + 1);
    //         setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);

    //         planetData.map(({ id, sma, smi, orbitSpeed, startPos }) => {
    //             const updatedStartPos = startPos - orbitSpeed * elapsedTime; // Calculate updated startPos using elapsed time

    //             const xPos = 700 + sma * Math.cos(updatedStartPos);
    //             const yPos = 700 + smi * Math.sin(updatedStartPos);

    //             const orbitingPlanet = document.getElementById(
    //                 id.replace("-orbit", "")
    //             );
    //             orbitingPlanet.setAttribute("cx", xPos);
    //             orbitingPlanet.setAttribute("cy", yPos);
    //         });
    //     }, 50);

    //     return () => {
    //         clearInterval(animate);
    //     };
    // }, [player]);

    const animate = () => {
        setPlayer(player + 1);
        setElapsedTime(
            (prevElapsedTime) => prevElapsedTime + 0.05 / (zoom * 4)
        );

        planetData.map(({ id, sma, smi, orbitSpeed, startPos }, i) => {
            const updatedStartPos = startPos - orbitSpeed * elapsedTime;

            const xPos = 700 + sma * Math.cos(updatedStartPos);
            const yPos = 700 + smi * Math.sin(updatedStartPos);

            const orbitingPlanet = document.getElementById(
                id.replace("-orbit", "")
            );
            orbitingPlanet.setAttribute("cx", xPos);
            orbitingPlanet.setAttribute("cy", yPos);
        });

        requestAnimationFrame(animate);
    };

    useEffect(() => {
        const animation = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animation);
        };
    }, [player]);

    const getPlanetLocation = (id) => {
        const circleElement = document.getElementById(id);
        const svgElement = document.getElementById("svgContainer");

        if (circleElement && svgElement) {
            const svgWidth = svgElement.clientWidth;
            const svgHeight = svgElement.clientHeight;
            const circleRect = circleElement.getBoundingClientRect();
            const offsetX =
                circleRect.left + circleRect.width / 2 - svgWidth / 2;
            const offsetY =
                circleRect.top + circleRect.height / 2 - svgHeight / 2;

            // console.log(offsetX);
            setCenterOffset({ offsetX, offsetY });
        }
    };

    const calculateViewBox = () => {
        const viewBoxSize = 1400 / zoom; // Calculate the adjusted viewBox size
        const viewBoxOffsetX =
            (1400 - viewBoxSize) / 1.55 - centerOffset.offsetX / 36; // Calculate the offset to center the viewBox
        console.log(1400 - viewBoxSize);
        const viewBoxOffsetY =
            (1400 - viewBoxSize) / 1.55 - centerOffset.offsetY / 36;
        return `${viewBoxOffsetX} ${viewBoxOffsetY} ${viewBoxSize} ${viewBoxSize}`;
    };

    useEffect(() => {
        if (selectedPlanet) {
            getPlanetLocation(selectedPlanet);
            calculateViewBox();
            console.log("ini jalan");
        }
    }, [selectedPlanet, player]);

    const svgOnMouseDown = (e) => {
        setIsPanning(true);
        setStartPoint({ x: e.x, y: e.y });
    };

    const svgOnMouseMove = (e) => {
        if (isPanning) {
            setEndPoint({ x: e.x, y: e.y });
            let dx = startPoint.x - endPoint;
        }
    };

    // useEffect(() => {
    //     if (isPlay) setAngle(angle - 0.001);
    // }, [angle, isPlay]);
    return (
        <>
            <Box className="fixed top-0 w-full bg-transparent z-10">
                <Box id="topbar" className="flex flex-col px-2">
                    <Typography
                        className="text-white text-2xl font-bold font-bebas"
                        variant="h6"
                    >
                        Astronomi dan Angkasa Luar
                    </Typography>
                    <Breadcrumbs
                        separator={
                            <ArrowRightAltIcon fontSize="small" color="white" />
                        }
                    >
                        <Link to="/" className="font-quantico text-white">
                            Home
                        </Link>
                        {pathnames.map((name, index) => {
                            const routeTo = `/${pathnames
                                .slice(0, index + 1)
                                .join("/")}`;
                            const isLast = index === pathnames.length - 1;
                            return isLast ? (
                                <Typography
                                    className="font-bold font-quantico capitalize text-white"
                                    key={name}
                                >
                                    {name}
                                </Typography>
                            ) : (
                                <Link
                                    to={routeTo}
                                    key={name}
                                    className="font-quantico capitalize text-white"
                                >
                                    {name}
                                </Link>
                            );
                        })}
                    </Breadcrumbs>
                </Box>
            </Box>
            <Box id="svg" className="overflow-y-hidden max-h-screen bg-black">
                <div>
                    <div
                        // onMouseOver={() => setIsHovered(true)}
                        // onMouseOut={() => setIsHovered(false)}
                        className={`relative overflow-hidden`}
                    >
                        <svg
                            id="svgContainer"
                            viewBox={calculateViewBox()}
                            width={`${60 * zoom}vw`}
                            height={`${100 * zoom}vh`}
                            className="mx-auto"
                            onMouseDown={(e) => svgOnMouseDown(e)}
                            onMouseMove={(e) => svgOnMouseMove(e)}
                        >
                            <circle
                                cx="700"
                                cy="700"
                                r="5"
                                stroke="yellow"
                                strokeWidth="0.1"
                                fill="yellow"
                            />
                            {planetData.map(({ id, sma, smi }) => (
                                <React.Fragment key={id}>
                                    <ellipse
                                        id={id}
                                        cx="700"
                                        cy="700"
                                        rx={sma}
                                        ry={smi}
                                        stroke="gray"
                                        strokeWidth={1 / zoom}
                                        fill="none"
                                    />
                                    <circle
                                        id={id.replace("-orbit", "")}
                                        r={2 / (zoom / 1.5)}
                                        fill="red"
                                        onClick={() =>
                                            setSelectedPlanet(
                                                id.replace("-orbit", "")
                                            )
                                        }
                                    />
                                </React.Fragment>
                            ))}
                        </svg>
                        <Box
                            id="right-sidebar"
                            className={`absolute transform ${
                                overlay ? "translate-x-0" : "translate-x-3/4"
                            } w-1/4 top-0 right-0 h-full bg-transparent flex transition-transform duration-300`}
                        >
                            <Box className="w-1/4 h-full bg-transparent rounded-l-full">
                                <div className="flex justify-start items-center h-screen">
                                    <div
                                        className="flex justify-around items-center -ml-[11px] border-2 border-gray-500 px-8 rounded-t-2xl text-center transform -rotate-90"
                                        onClick={() => setOverlay(!overlay)}
                                    >
                                        <Typography className="text-white font-quantico px-2">
                                            Options
                                        </Typography>
                                        <SettingsIcon
                                            fontSize="small"
                                            className="text-white"
                                        />
                                    </div>
                                </div>
                            </Box>
                            <div className="w-3/4 bg-transparent border-l-2 border-y-2 my-6 border-gray-500">
                                <Button
                                    variant="filled"
                                    onClick={() => setZoom((prev) => prev + 1)}
                                    className="text-white"
                                >
                                    Zoom IN
                                </Button>
                                <Button
                                    variant="filled"
                                    onClick={() => setZoom((prev) => prev - 1)}
                                    className="text-white"
                                >
                                    Zoom OUT
                                </Button>
                            </div>
                        </Box>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default SolarSystem;
