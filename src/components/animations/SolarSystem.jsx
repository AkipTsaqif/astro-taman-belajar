import React, { useEffect, useRef, useState } from "react";
import { Box, Slider, Typography } from "@mui/material";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import Navbar from "../../shared-components/Navbar";
import AnimationControls from "../../shared-components/AnimationControls";
import randomize from "../../utilities/randomize";

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

    const [overlay, setOverlay] = useState(true);

    useEffect(() => {
        const animate = setInterval(() => {
            setPlayer(player + 1);
            setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);

            planetData.map(({ id, sma, smi, orbitSpeed, startPos }) => {
                const updatedStartPos = startPos - orbitSpeed * elapsedTime; // Calculate updated startPos using elapsed time

                const xPos = 700 + sma * Math.cos(updatedStartPos);
                const yPos = 700 + smi * Math.sin(updatedStartPos);

                console.log(updatedStartPos);

                const orbitingPlanet = document.getElementById(
                    id.replace("-orbit", "")
                );
                orbitingPlanet.setAttribute("cx", xPos);
                orbitingPlanet.setAttribute("cy", yPos);
            });
        }, 50);

        return () => {
            clearInterval(animate);
        };
    }, [player]);

    // useEffect(() => {
    //     if (isPlay) setAngle(angle - 0.001);
    // }, [angle, isPlay]);
    return (
        <Navbar>
            <Box className="flex-1 overflow-y-auto max-h-screen">
                <div>
                    <div
                        // onMouseOver={() => setIsHovered(true)}
                        // onMouseOut={() => setIsHovered(false)}
                        className={`relative scale-[1.1] border-2 border-binus`}
                    >
                        <svg
                            viewBox="0 0 1400 1400"
                            width="60vw"
                            height="90vh"
                            className="bg-black"
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
                                        strokeWidth="1"
                                        fill="none"
                                    />
                                    <circle
                                        id={id.replace("-orbit", "")}
                                        r="4"
                                        fill="red"
                                    />
                                </React.Fragment>
                            ))}
                        </svg>
                        {overlay && (
                            <Box
                                className="absolute top-0 right-0 h-full bg-black opacity-50"
                                style={{ width: "30%", pointerEvents: "none" }}
                            />
                        )}
                    </div>
                </div>
            </Box>
        </Navbar>
    );
};

export default SolarSystem;
