import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
    Box,
    Breadcrumbs,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    Slider,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import _ from "lodash";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import Navbar from "../../shared-components/Navbar";
import AnimationControls from "../../shared-components/AnimationControls";
import PlanetAnnotation from "./extra-components/PlanetAnnotation";
import randomize from "../../utilities/randomize";

const planetData = [
    {
        id: "mercury-orbit",
        sma: 11,
        smi: 10,
        startPos: randomize(0, 360),
        orbitSpeed: 0.004,
        details: {
            name: "Merkurius",
            distance: "57.9 juta km",
            eccentricity: "0.2056",
            diameter: "4,879 km",
            rotationPeriod: "58.6 hari",
            revolutionPeriod: "88 hari",
            moons: 0,
            discovered: "- (diketahui sejak dahulu)",
        },
    },
    {
        id: "venus-orbit",
        sma: 18,
        smi: 17,
        startPos: randomize(0, 360),
        orbitSpeed: 0.001,
        details: {
            name: "Venus",
            distance: "108.2 juta km",
            eccentricity: "0.0068",
            diameter: "12,104 km",
            rotationPeriod: "243 hari",
            revolutionPeriod: "225 hari",
            moons: 0,
            discovered: "- (diketahui sejak dahulu)",
        },
    },
    {
        id: "earth-orbit",
        sma: 27,
        smi: 26,
        startPos: randomize(0, 360),
        orbitSpeed: 0.0005,
        details: {
            name: "Bumi",
            distance: "149.6 juta km",
            eccentricity: "0.0167",
            diameter: "12,742 km",
            rotationPeriod: "24 jam",
            revolutionPeriod: "365.25 hari",
            moons: 1,
            discovered: "- (diketahui sejak dahulu)",
        },
    },
    {
        id: "mars-orbit",
        sma: 45,
        smi: 43,
        startPos: randomize(0, 360),
        orbitSpeed: 0.0001,
        details: {
            name: "Mars",
            distance: "227.9 juta km",
            eccentricity: "0.0934",
            diameter: "6,779 km",
            rotationPeriod: "24.6 jam",
            revolutionPeriod: "687 hari",
            moons: 2,
            discovered: "- (diketahui sejak dahulu)",
        },
    },
    {
        id: "jupiter-orbit",
        sma: 100,
        smi: 97,
        startPos: randomize(0, 360),
        orbitSpeed: 0.00001,
        details: {
            name: "Jupiter",
            distance: "778.6 juta km",
            eccentricity: "0.0484",
            diameter: "139,820 km",
            rotationPeriod: "9.9 jam",
            revolutionPeriod: "11.9 tahun",
            moons: 79,
            discovered: "- (diketahui sejak dahulu)",
        },
    },
    {
        id: "saturn-orbit",
        sma: 199,
        smi: 197,
        startPos: randomize(0, 360),
        orbitSpeed: 0.000003,
        details: {
            name: "Saturnus",
            distance: "1.4 milyar km",
            eccentricity: "0.0556",
            diameter: "116,460 km",
            rotationPeriod: "10.7 jam",
            revolutionPeriod: "29.5 tahun",
            moons: 82,
            discovered: "- (diketahui sejak dahulu)",
        },
    },
    {
        id: "uranus-orbit",
        sma: 400,
        smi: 395,
        startPos: randomize(0, 360),
        orbitSpeed: 0.0000006,
        details: {
            name: "Uranus",
            distance: "2.9 milyar km",
            eccentricity: "0.0444",
            diameter: "50,724 km",
            rotationPeriod: "17.2 jam",
            revolutionPeriod: "84 tahun",
            moons: 27,
            discovered: "1781",
        },
    },
    {
        id: "neptune-orbit",
        sma: 600,
        smi: 595,
        startPos: randomize(0, 360),
        orbitSpeed: 0.0000001,
        details: {
            name: "Neptunus",
            distance: "4.5 milyar km",
            eccentricity: "0.0112",
            diameter: "49,244 km",
            rotationPeriod: "16.1 jam",
            revolutionPeriod: "165 tahun",
            moons: 14,
            discovered: "1846",
        },
    },
];

const marks = [
    {
        value: 0,
        label: "Lingkaran",
    },
    {
        value: 1,
        label: "Parabola",
    },
    {
        value: 2,
        label: "Hiperbola",
    },
];

const SolarSystem = (props) => {
    const [player, setPlayer] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isPanning, setIsPanning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const pathnames = location.pathname.split("/").filter((x) => x);

    const [overlay, setOverlay] = useState(true);
    const [zoom, setZoom] = useState(1);
    const [zoomClicked, setZoomClicked] = useState(false);
    const [panClicked, setPanClicked] = useState(false);
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [selectedPlanetDetails, setSelectedPlanetDetails] = useState(null);
    const [selectedPlanetCoords, setSelectedPlanetCoords] = useState({
        x: 0,
        y: 0,
    });
    const [centerOffset, setCenterOffset] = useState({
        offsetX: 0,
        offsetY: 0,
    });
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });

    const [ecc, setEcc] = useState(0);
    const [starRadius, setStarRadius] = useState(700);
    const [starTemp, setStarTemp] = useState(5772);
    const [starMass, setStarMass] = useState(1);

    const [modeChecked, setModeChecked] = useState(false);
    const [selectedMode, setSelectedMode] = useState();
    const [eccChecked, setEccChecked] = useState(false);
    const [starChecked, setStarChecked] = useState(false);

    var viewBox = { x: 0, y: 0, w: 1400, h: 1400 };
    const factor = { x: 85, y: 50 };

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

    useLayoutEffect(() => {
        if (!isPaused) {
            let anim;

            const animate = () => {
                setPlayer((p) => p + 1);
                setElapsedTime(
                    (prevElapsedTime) => prevElapsedTime + 25 / (zoom * 4)
                );

                anim = requestAnimationFrame(animate);
            };

            anim = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(anim);
        }
    }, [isPaused]);

    useEffect(() => {
        if (!eccChecked) {
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
        } else {
            const updatedStartPos =
                selectedPlanetDetails?.startPos -
                selectedPlanetDetails?.orbitSpeed * elapsedTime;

            const xPos =
                700 -
                factor.x * ecc +
                (selectedPlanetDetails?.sma + factor.x * ecc) *
                    Math.cos(updatedStartPos);
            const yPos =
                700 +
                (selectedPlanetDetails?.smi + factor.y * ecc) *
                    Math.sin(updatedStartPos);

            const orbitingPlanet = document.getElementById("earth");
            orbitingPlanet.setAttribute("cx", xPos);
            orbitingPlanet.setAttribute("cy", yPos);
        }
    }, [player, ecc]);

    const getPlanetLocation = (id) => {
        setSelectedPlanetDetails(
            _.find(planetData, {
                id: id,
            })
        );
        const planetName = id.replace("-orbit", "");
        const circleElement = document.getElementById(planetName);
        const svgElement = document.getElementById("svgContainer");

        if (circleElement && svgElement) {
            const svgWidth = svgElement.clientWidth;
            const svgHeight = svgElement.clientHeight;
            const circleRect = circleElement.getBoundingClientRect();
            const offsetX =
                circleRect.left + circleRect.width / 2 - svgWidth / 2;
            const offsetY =
                circleRect.top + circleRect.height / 2 - svgHeight / 2;

            setCenterOffset({ offsetX, offsetY });
            setSelectedPlanetCoords({
                x: circleRect.left + circleRect.width / 2,
                y: circleRect.top + circleRect.height / 2,
            });
        }
    };

    const calculateViewBox = () => {
        const viewBoxSize = 1400 / zoom; // Calculate the adjusted viewBox size
        // const viewBoxOffsetX =
        //     (1400 - viewBoxSize) / 1.55 - centerOffset.offsetX / 36; // Calculate the offset to center the viewBox
        // const viewBoxOffsetY =
        //     (1400 - viewBoxSize) / 1.55 - centerOffset.offsetY / 36;

        let viewBoxOffsetY;
        let viewBoxOffsetX; // Calculate the offset to center the viewBox
        // 2 = 1.7
        // 3 = 1.58
        // 4 = 1.62
        // 5 = 1.67
        if (zoom === 1) {
            viewBoxOffsetX = 1400 - viewBoxSize;
            viewBoxOffsetY = 1400 - viewBoxSize;
        }
        if (zoom === 2) {
            viewBoxOffsetX = (1400 - viewBoxSize) / 1.67;
            viewBoxOffsetY = (1400 - viewBoxSize) / 1.35;
        }
        if (zoom === 3) {
            viewBoxOffsetX = (1400 - viewBoxSize) / 1.58;
            viewBoxOffsetY = (1400 - viewBoxSize) / 1.5;
        }
        if (zoom === 4) {
            viewBoxOffsetX = (1400 - viewBoxSize) / 1.62;
            viewBoxOffsetY = (1400 - viewBoxSize) / 1.6;
        }
        if (zoom === 5) {
            viewBoxOffsetX = (1400 - viewBoxSize) / 1.67;
            viewBoxOffsetY = (1400 - viewBoxSize) / 1.667;
        }

        viewBox = {
            x: viewBoxOffsetX,
            y: viewBoxOffsetY,
            w: viewBoxSize,
            h: viewBoxSize,
        };

        return `${viewBoxOffsetX} ${viewBoxOffsetY} ${viewBoxSize} ${viewBoxSize}`;
    };

    const sliderLabelPlacement = (index) => {
        if (index === 0) return "ml-8";
        if (index === marks.length - 1) return "mr-8";
        return "";
    };

    useEffect(() => {
        if (selectedPlanet) {
            getPlanetLocation(selectedPlanet);
            calculateViewBox();
        }
    }, [selectedPlanet, player]);

    useEffect(() => {
        if (eccChecked) {
            setZoom(4);
            setZoomClicked(true);
            setSelectedPlanetDetails(
                _.find(planetData, {
                    id: "earth-orbit",
                })
            );
            console.log(
                _.find(planetData, {
                    id: "earth-orbit",
                })
            );
        }
    }, [eccChecked]);

    const showSolarSystem = () => {
        if (eccChecked)
            return (
                <React.Fragment>
                    <ellipse
                        id="earth-orbit"
                        cx={700 - factor.x * ecc}
                        cy="700"
                        rx={selectedPlanetDetails?.sma + factor.x * ecc}
                        ry={selectedPlanetDetails?.smi + factor.y * ecc}
                        stroke="gray"
                        strokeWidth={1 / zoom}
                        fill="none"
                    />
                    <circle id="earth" r={2 / (zoom / 1.5)} fill="red" />
                </React.Fragment>
            );
        else
            return planetData.map(({ id, sma, smi }) => (
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
                        onClick={() => {
                            setSelectedPlanet(id);
                            setIsPaused(true);
                        }}
                    />
                </React.Fragment>
            ));
    };

    const svgOnMouseDown = (e) => {
        setIsPanning(true);
        setStartPoint({ x: e.clientX, y: e.clientY });
    };

    const svgOnMouseMove = (e) => {
        let svg = document.getElementById("svgContainer");

        if (isPanning) {
            let endPoint = { x: e.clientX, y: e.clientY };
            let dx = startPoint.x - endPoint.x;
            let dy = startPoint.y - endPoint.y;
            let movedVB = {
                x: viewBox.x + dx,
                y: viewBox.y + dy,
                w: viewBox.w,
                h: viewBox.h,
            };

            svg.setAttribute(
                "viewBox",
                `${movedVB.x} ${movedVB.y} ${movedVB.w} ${movedVB.h}`
            );
        }
    };

    const svgOnMouseUp = (e) => {
        let svg = document.getElementById("svgContainer");

        if (isPanning) {
            let endPoint = { x: e.clientX, y: e.clientY };
            let dx = startPoint.x - endPoint.x;
            let dy = startPoint.y - endPoint.y;
            let movedVB = {
                x: viewBox.x + dx,
                y: viewBox.y + dy,
                w: viewBox.w,
                h: viewBox.h,
            };
            svg.setAttribute(
                "viewBox",
                `${movedVB.x} ${movedVB.y} ${movedVB.w} ${movedVB.h}`
            );
        }

        setIsPanning(false);
    };

    // const handleChangeCheckbox = (pos) => {
    //     const updatedState = selectedMode.map((mode, i) => i === pos ? !mode : mode);
    //     setSelectedMode(updatedState)
    // }

    return (
        <>
            <Box className="fixed top-0 w-full bg-transparent z-10">
                <Box id="topbar" className="flex flex-col p-3">
                    <Typography
                        className="text-white text-2xl font-bold font-bebas"
                        variant="h6"
                    >
                        Astronomi dan Angkasa Luar
                    </Typography>
                    <Box className="flex w-2/3">
                        <Link
                            to="/tata-surya"
                            key="sol"
                            className="font-quantico capitalize font-bold text-white w-1/12"
                        >
                            Home
                        </Link>
                        <Link
                            to="/tata-surya"
                            key="kuis"
                            className="font-quantico capitalize font-bold text-white w-1/12"
                        >
                            Kuis
                        </Link>
                    </Box>

                    {/* <Breadcrumbs
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
                    </Breadcrumbs> */}
                </Box>
            </Box>
            <Box
                id="svg"
                className="relative overflow-y-hidden max-h-screen bg-black"
            >
                {modeChecked && (
                    <Box className="absolute w-7/12 top-[85%] right-[25%] bg-black/50 p-2 border-2 z-[1000] border-gray-500">
                        {selectedMode === "Eksentrisitas" && (
                            <div className="m-auto w-5/6 py-4">
                                <Slider
                                    max={2}
                                    min={0}
                                    marks={marks.map((mark, i) => ({
                                        ...mark,
                                        label: (
                                            <Typography
                                                className={`text-xl text-white font-quantico font-bold ${sliderLabelPlacement(
                                                    i
                                                )}`}
                                            >
                                                {mark.label}
                                            </Typography>
                                        ),
                                    }))}
                                    step={0.01}
                                    value={ecc}
                                    valueLabelDisplay="auto"
                                    onChange={(e, val) => {
                                        setEcc(val);
                                    }}
                                />
                            </div>
                        )}
                        {selectedMode === "Bintang" && (
                            <div className="m-auto w-5/6">
                                <Slider
                                    size="small"
                                    step={0.01}
                                    value={starMass}
                                    onChange={(e, val) => {
                                        setStarMass(val);
                                    }}
                                />
                            </div>
                        )}
                    </Box>
                )}
                <div>
                    <div
                        // onMouseOver={() => setIsHovered(true)}
                        // onMouseOut={() => setIsHovered(false)}
                        className={`relative overflow-hidden`}
                    >
                        <svg
                            id="svgContainer"
                            viewBox={
                                zoomClicked
                                    ? calculateViewBox()
                                    : "0 0 1400 1400"
                            }
                            width={`${60 * zoom}vw`}
                            height={`${100 * zoom}vh`}
                            className={`mx-auto ${
                                isPanning ? "cursor-grabbing" : "cursor-grab"
                            }`}
                            onMouseDown={(e) => svgOnMouseDown(e)}
                            onMouseMove={(e) => svgOnMouseMove(e)}
                            onMouseUp={(e) => svgOnMouseUp(e)}
                        >
                            <circle
                                cx="700"
                                cy="700"
                                r="5"
                                stroke="yellow"
                                strokeWidth="0.1"
                                fill="yellow"
                            />
                            {showSolarSystem()}
                        </svg>

                        {selectedPlanet && (
                            <Box
                                // className={`absolute top-[${
                                //     selectedPlanetCoords.y - 50
                                // }px] left-[${
                                //     selectedPlanetCoords.x + 20
                                // }px] bg-white p-[10px]`}
                                className="absolute w-96 top-8 right-[22%] bg-black/50 p-2 border-2 border-gray-500"
                            >
                                <PlanetAnnotation
                                    details={selectedPlanetDetails}
                                />
                                <IconButton
                                    className="absolute top-0 right-0 z-50 p-2"
                                    size="small"
                                    onClick={() => {
                                        setIsPaused(false);
                                        setSelectedPlanet(null);
                                        setSelectedPlanetDetails(null);
                                    }}
                                >
                                    <CloseIcon className="text-white" />
                                </IconButton>
                            </Box>
                        )}

                        <Box
                            id="right-sidebar"
                            className={`absolute transform ${
                                overlay ? "translate-x-0" : "translate-x-3/4"
                            } w-1/4 top-0 right-0 h-90vh bg-transparent flex transition-transform duration-300 z-40`}
                        >
                            <Box className="w-1/4 h-full bg-transparent">
                                <div className="flex justify-center items-center h-screen">
                                    <div
                                        className="flex origin-center ml-16 -rotate-90 justify-around items-center border-2 border-gray-500 px-8 rounded-t-2xl text-center transform"
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
                                <Box className="flex items-center justify-center mb-2">
                                    <Typography className="uppercase font-bold font-quantico text-white text-center rounded-b-xl border-b-2 border-x-2 border-gray-500 py-1 w-5/12">
                                        Kontrol
                                    </Typography>
                                </Box>
                                <Box>
                                    <button
                                        onClick={() => {
                                            setZoom((prev) => prev + 1);
                                            if (zoom > 4) setZoom(5);
                                            setZoomClicked(true);
                                        }}
                                        className="rounded-lg bg-transparent mt-2 mx-2 p-2 border-2 border-gray-500"
                                    >
                                        <Typography className="font-bold font-quantico text-white">
                                            Perbesar
                                        </Typography>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setZoom((prev) => prev - 1);
                                            if (eccChecked && zoom === 3)
                                                setZoom(3);
                                            if (zoom < 2) setZoom(1);
                                            setZoomClicked(true);
                                        }}
                                        className="rounded-lg bg-transparent p-2 border-2 border-gray-500"
                                    >
                                        <Typography className="font-bold font-quantico text-white">
                                            Perkecil
                                        </Typography>
                                    </button>
                                    <button
                                        onClick={() => setIsPaused(!isPaused)}
                                        className="rounded-lg bg-transparent p-2 border-2 mt-2 mx-2 border-gray-500"
                                    >
                                        <Typography className="font-bold font-quantico text-white">
                                            Pause/Play
                                        </Typography>
                                    </button>
                                </Box>
                                <hr className="mt-6" />
                                <Box className="flex items-center justify-center">
                                    <Typography className="uppercase font-bold font-quantico text-white text-center rounded-b-xl border-b-2 border-x-2 border-gray-500 py-1 w-5/12">
                                        Mode
                                    </Typography>
                                </Box>
                                <Box className="flex flex-col gap-0">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="Eksentrisitas"
                                            className="m-4 w-5 h-5"
                                            onChange={(e) => {
                                                if (
                                                    selectedMode !==
                                                    "Eksentrisitas"
                                                ) {
                                                    setZoom(4);
                                                    setZoomClicked(true);
                                                }
                                                setSelectedMode((prev) => {
                                                    if (prev === e.target.value)
                                                        return null;
                                                    return e.target.value;
                                                });
                                                setModeChecked(!modeChecked);
                                            }}
                                            checked={
                                                selectedMode === "Eksentrisitas"
                                            }
                                        />
                                        <label className="text-white font-quantico font-bold">
                                            Eksentrisitas
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="Bintang"
                                            className="m-4 w-5 h-5"
                                            onChange={(e) => {
                                                if (
                                                    selectedMode !== "Bintang"
                                                ) {
                                                    setZoom(2);
                                                    setZoomClicked(true);
                                                }
                                                setSelectedMode((prev) => {
                                                    if (prev === e.target.value)
                                                        return null;
                                                    return e.target.value;
                                                });
                                                setModeChecked(!modeChecked);
                                            }}
                                            checked={selectedMode === "Bintang"}
                                        />
                                        <label className="text-white font-quantico font-bold">
                                            Bintang
                                        </label>
                                    </div>
                                </Box>
                            </div>
                        </Box>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default SolarSystem;
