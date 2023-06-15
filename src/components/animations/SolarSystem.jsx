import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
    Box,
    Breadcrumbs,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    Slider,
    Tooltip,
    Typography,
} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import _ from "lodash";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import Navbar from "../../shared-components/Navbar";
import AnimationControls from "../../shared-components/AnimationControls";
import PlanetAnnotation from "./extra-components/PlanetAnnotation";
import randomize from "../../utilities/randomize";
import Home from "../main-menu/Home";
import Chapter from "../chapter/Chapter";
import Quiz from "../quiz/Quiz";

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
            temp: {
                cold: "-173 °C",
                hot: "427 °C",
                avg: "167 °C",
            },
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
            temp: {
                cold: "462 °C",
                hot: "462 °C",
                avg: "462 °C",
            },
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
            temp: {
                cold: "-89 °C",
                hot: "58 °C",
                avg: "14 °C",
            },
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
            temp: {
                cold: "-153 °C",
                hot: "20 °C",
                avg: "-63 °C",
            },
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
            temp: {
                cold: "-145 °C",
                hot: "-108 °C",
                avg: "-145 °C",
            },
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
            temp: {
                cold: "-178 °C",
                hot: "-138 °C",
                avg: "-160 °C",
            },
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
            temp: {
                cold: "-224 °C",
                hot: "-197 °C",
                avg: "-220 °C",
            },
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
            temp: {
                cold: "-223 °C",
                hot: "-201 °C",
                avg: "-220 °C",
            },
            eccentricity: "0.0112",
            diameter: "49,244 km",
            rotationPeriod: "16.1 jam",
            revolutionPeriod: "165 tahun",
            moons: 14,
            discovered: "1846",
        },
    },
];

const sunData = {
    id: "sun",
    details: {
        name: "Matahari",
        diameter: "1,391,000 km",
        rotationPeriod: "58.6 hari",
        age: "4.6 milyar tahun",
        temp: {
            avg: "5772 °C",
        },
    },
};

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

const starTempMarks = [
    {
        value: 500,
        label: "Katai Coklat (Brown Dwarf)",
    },
    {
        value: 1505,
        label: "Katai Merah (Red Dwarf)",
    },
    {
        value: 2505,
        label: "Kelas M",
    },
    {
        value: 4005,
        label: "Kelas K",
    },
    {
        value: 5410,
        label: "Kelas G",
    },
    {
        value: 6205,
        label: "Kelas F",
    },
    {
        value: 8020,
        label: "Kelas A",
    },
    {
        value: 15050,
        label: "Kelas B",
    },
    {
        value: 34050,
        label: "Kelas O",
    },
];

const SolarSystem = (props) => {
    const [homeClosed, setHomeClosed] = useState(false);
    const [player, setPlayer] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isPanning, setIsPanning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [moreInfo, setMoreInfo] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState(0);

    const navbarRef = useRef(null);
    const location = useLocation();

    const [overlay, setOverlay] = useState(true);
    const [zoom, setZoom] = useState(1);
    const [zoomClicked, setZoomClicked] = useState(false);
    const [sunSelected, setSunSelected] = useState(false);
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
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const [ecc, setEcc] = useState(0);
    const [starRadius, setStarRadius] = useState(4);
    const [starTemp, setStarTemp] = useState(5772);
    const [starMass, setStarMass] = useState(1);

    const [modeChecked, setModeChecked] = useState(false);
    const [selectedMode, setSelectedMode] = useState();
    const [massSliderChanged, setMassSliderChanged] = useState(false);

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
        if (selectedMode !== "Eksentrisitas") {
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

    useEffect(
        () => console.log(selectedPlanetDetails),
        [selectedPlanetDetails]
    );

    useEffect(() => {
        if (selectedMode === "Eksentrisitas") {
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
    }, [selectedMode]);

    const showSolarSystem = () => {
        if (selectedMode === "Eksentrisitas")
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
        else {
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
                            setSunSelected(false);
                        }}
                    />
                </React.Fragment>
            ));
        }
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

    const starColorChanger = (temp) => {
        if (temp >= 500 && temp < 1500) return "#951915";
        if (temp >= 1500 && temp < 2500) return "#FF932C";
        if (temp >= 2500 && temp <= 3000) return "#FFA651";
        if (temp > 3000 && temp <= 3500) return "#FFB770";
        if (temp > 3500 && temp <= 4200) return "#FFCB96";
        if (temp > 4200 && temp <= 4900) return "#FFD9B4";
        if (temp > 4900 && temp <= 5400) return "#FFE8D6";
        if (temp > 5400 && temp <= 6200) return "#FFF0E9";
        if (temp > 6200 && temp <= 6900) return "#FFFFFF";
        if (temp > 6900 && temp <= 8000) return "#EDEFFF";
        if (temp > 8000 && temp <= 10000) return "#D6E1FF";
        if (temp > 10000 && temp <= 15000) return "#C1D4FF";
        if (temp > 15000 && temp <= 27000) return "#A9C5FF";
        if (temp > 27000 && temp <= 40000) return "#99B9FF";
        if (temp > 40000) return "#2F6FF5";
    };

    useEffect(
        () => setNavbarHeight(navbarRef.current.clientHeight),
        [navbarRef.current]
    );

    const showQuiz = () => {
        if (location.pathname === "/kuis") {
            // setOverlay(false);
            // setMoreInfo(false);
            // setSelectedPlanet(null);
            // setSelectedPlanetDetails(null);
            // setZoom(1);

            return <Quiz navbarHeight={navbarHeight} />;
        }
    };

    return (
        <>
            <Navbar ref={navbarRef} />
            <Box
                id="svg"
                className="relative overflow-y-hidden max-h-screen bg-black"
            >
                <Outlet />
                {!homeClosed && (
                    <Box className="w-2/3 flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%] my-auto bg-black z-[2] p-2 border-2 border-gray-500">
                        <Home />
                        <button
                            onClick={() => {
                                setHomeClosed(true);
                            }}
                            className="w-1/4 my-2 rounded-lg bg-transparent p-2 border-2 border-gray-500"
                        >
                            <Typography className="font-bold font-quantico text-white">
                                Mulai
                            </Typography>
                        </button>
                    </Box>
                )}
                {moreInfo && (
                    <Box
                        sx={{ mt: `${navbarRef.current.clientHeight}px` }}
                        className={`absolute w-2/3 bg-black/50 z-[2] p-2 border-2 border-gray-500`}
                    >
                        <Chapter
                            subject={
                                sunSelected ? sunData : selectedPlanetDetails
                            }
                            isSun={sunSelected}
                        />
                    </Box>
                )}
                {selectedMode !== null && selectedMode !== undefined && (
                    <Box className="flex flex-col-reverse absolute w-7/12 top-[80%] right-[25%] bg-black/50 p-2 border-2 z-[3] border-gray-500">
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
                            <Box>
                                <div className="flex m-auto w-5/6">
                                    <Typography className="mr-6 font-bold font-quantico text-white">
                                        Suhu:
                                    </Typography>
                                    <Slider
                                        size="small"
                                        min={500}
                                        max={50000}
                                        step={1000}
                                        value={starTemp}
                                        valueLabelDisplay="auto"
                                        onChange={(e, val) => {
                                            setStarTemp(val);
                                        }}
                                    />
                                </div>
                                <div className="flex m-auto w-5/6">
                                    <Typography className="mr-6 font-bold font-quantico text-white">
                                        Massa:
                                    </Typography>
                                    <Slider
                                        size="small"
                                        min={1}
                                        max={250}
                                        step={1}
                                        value={starMass}
                                        valueLabelDisplay="auto"
                                        onChange={(e, val) => {
                                            setMassSliderChanged(true);
                                            setStarMass(val);
                                            let r =
                                                0.003 + 0.724 * Math.log(val);
                                            setStarRadius(
                                                3 + Math.pow(val, 0.55)
                                            );
                                        }}
                                    />
                                </div>
                                {massSliderChanged && (
                                    <div className="w-full flex justify-end">
                                        <Tooltip
                                            placement="top"
                                            title={
                                                <>
                                                    <Typography className="text-xs">
                                                        Karena massa dan radius
                                                        bintang saling
                                                        mempengaruhi.
                                                    </Typography>
                                                    <br />
                                                    <Typography className="text-xs">
                                                        Rumus kasar untuk
                                                        menentukan radius dari
                                                        perubahan massa adalah
                                                    </Typography>
                                                    <br />
                                                    <Typography className="text-xs font-jetbrains">
                                                        R = M
                                                        <sup className="font-jetbrains">
                                                            0.8
                                                        </sup>
                                                    </Typography>
                                                </>
                                            }
                                        >
                                            <Typography className="text-[10px] text-right text-white">
                                                Kenapa radius ikut membesar?
                                            </Typography>
                                        </Tooltip>
                                    </div>
                                )}
                            </Box>
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
                            {showSolarSystem()}
                            <circle
                                cx="700"
                                cy="700"
                                r={starRadius}
                                stroke={starColorChanger(starTemp)}
                                strokeWidth="0.1"
                                fill={starColorChanger(starTemp)}
                                onClick={() => setSunSelected(true)}
                            />
                        </svg>

                        {(selectedPlanet || sunSelected) && (
                            <Box
                                sx={{
                                    top: navbarRef.current.clientHeight / 3,
                                    right: overlay ? "22%" : "4%",
                                }}
                                className={`absolute w-96 transition-all z-[4] transform duration-300 bg-black/50 p-2 border-2 border-gray-500`}
                            >
                                <PlanetAnnotation
                                    details={
                                        sunSelected
                                            ? sunData
                                            : selectedPlanetDetails
                                    }
                                    isSun={sunSelected}
                                    subjectSelect={() => {
                                        setMoreInfo(true);
                                        setOverlay(false);
                                    }}
                                />
                                <IconButton
                                    className="absolute top-0 right-0  p-2"
                                    size="small"
                                    onClick={() => {
                                        setIsPaused(false);
                                        setSunSelected(false);
                                        setMoreInfo(false);
                                        setSelectedPlanet(null);
                                        setSelectedPlanetDetails(null);
                                    }}
                                >
                                    <CloseIcon className="text-white" />
                                </IconButton>
                            </Box>
                        )}
                        {homeClosed && location.pathname === "/" && (
                            <Box
                                id="right-sidebar"
                                className={`absolute transform ${
                                    overlay
                                        ? "translate-x-0"
                                        : "translate-x-3/4"
                                } w-1/4 top-0 right-0 h-90vh bg-transparent flex transition-transform duration-300`}
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
                                                if (
                                                    selectedMode ===
                                                        "Eksentrisitas" &&
                                                    zoom === 3
                                                )
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
                                            onClick={() =>
                                                setIsPaused(!isPaused)
                                            }
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
                                                        if (
                                                            prev ===
                                                            e.target.value
                                                        )
                                                            return null;
                                                        return e.target.value;
                                                    });
                                                }}
                                                checked={
                                                    selectedMode ===
                                                    "Eksentrisitas"
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
                                                        selectedMode !==
                                                        "Bintang"
                                                    ) {
                                                        setZoomClicked(true);
                                                    }
                                                    setSelectedMode((prev) => {
                                                        if (
                                                            prev ===
                                                            e.target.value
                                                        )
                                                            return null;
                                                        return e.target.value;
                                                    });
                                                }}
                                                checked={
                                                    selectedMode === "Bintang"
                                                }
                                            />
                                            <label className="text-white font-quantico font-bold">
                                                Karakteristik Bintang
                                            </label>
                                            {console.log(modeChecked)}
                                        </div>
                                    </Box>
                                </div>
                            </Box>
                        )}
                    </div>
                    {homeClosed && location.pathname.startsWith("/kuis") && (
                        <Quiz navbarHeight={navbarHeight} />
                    )}
                </div>
            </Box>
        </>
    );
};

export default SolarSystem;
