import { useEffect, useRef, useState } from "react";
import { Box, Slider, Typography } from "@mui/material";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import AnimationControls from "../../shared-components/AnimationControls";

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

const Eccentricity = (props) => {
    const [ecc, setEcc] = useState(0);
    const [cx, setCx] = useState(50);
    const [rx, setRx] = useState(10);
    const [ry, setRy] = useState(10);
    const [angle, setAngle] = useState(0);

    const [isHovered, setIsHovered] = useState(false);
    const [isPlay, setIsPlay] = useState(true);

    const now = Date.now() / 1000;

    // useEffect(() => {
    //     setRx(10 + 85 * ecc); // 85 = scaling factor
    //     setRy(10 + 50 * ecc); // 50 = scaling factor
    //     setCx(50 - 85 * ecc);
    // }, [ecc]);

    useEffect(() => {
        const orbitRadiusX = 10 + 85 * ecc; // radius of the ellipse + radius of the circle
        const orbitRadiusY = 10 + 50 * ecc; // radius of the ellipse + radius of the circle
        const ncx = 50 - 85 * ecc;

        setRx(orbitRadiusX);
        setRy(orbitRadiusY);
        setCx(ncx);

        // Calculate new coordinates for the orbiting object
        const newCx = ncx + orbitRadiusX * Math.cos(angle);
        const newCy = 50 + orbitRadiusY * Math.sin(angle);

        // Update the cx and cy attributes of the orbiting object
        const orbitingObject = document.getElementById("orbiting-object");
        orbitingObject.setAttribute("cx", newCx);
        orbitingObject.setAttribute("cy", newCy);
    }, [angle, ecc]);

    useEffect(() => {
        if (isPlay) setAngle(angle - 0.001);
    }, [angle, isPlay]);

    const sliderLabelPlacement = (index) => {
        if (index === 0) return "ml-8";
        if (index === marks.length - 1) return "mr-8";
        return "";
    };

    const style = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };

    const previewStyle = {
        // position: "absolute",
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        transform: "scale(0.25)",
    };

    const mergedStyle = {
        ...style,
        ...(props?.preview && previewStyle),
    };

    return (
        <div style={mergedStyle}>
            {console.log(mergedStyle)}
            <div
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
                className={`w-full h-full ${
                    props?.preview ? "" : "border-solid border-2 border-binus"
                }`}
            >
                <svg viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="3.5"
                        stroke="grey"
                        strokeWidth="0.1"
                        fill="yellow"
                    />
                    <ellipse
                        id="inner-planet"
                        cx={cx}
                        cy="50"
                        rx={rx}
                        ry={ry}
                        stroke="black"
                        strokeWidth="0.4"
                        fill="none"
                    />
                    <circle id="orbiting-object" r="1" fill="red" />
                </svg>
                <Box
                    className={`absolute right-4 -mt-11 mr-1 transition-opacity ease-in-out duration-500 ${
                        isHovered ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <AnimationControls
                        isPlay={isPlay}
                        onControlClick={() => setIsPlay(!isPlay)}
                        onFullscreenClick={() => ""}
                    />
                </Box>
            </div>
            (
            <div style={{ width: "100%", margin: "auto" }}>
                <Slider
                    max={2}
                    min={0}
                    size="small"
                    marks={marks.map((mark, i) => ({
                        ...mark,
                        label: (
                            <Typography
                                className={`text-[12px] font-quantico font-bold -m-2 ${sliderLabelPlacement(
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
            )
        </div>
    );
};

export default Eccentricity;
