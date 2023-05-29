import { useEffect, useRef, useState } from "react";
import { Slider, Typography } from "@mui/material";
import useDidMountEffect from "../../hooks/useDidMountEffect";

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

const Eccentricity = () => {
    const [ecc, setEcc] = useState(0);
    const [cx, setCx] = useState(50);
    const [rx, setRx] = useState(10);
    const [ry, setRy] = useState(10);
    const [angle, setAngle] = useState(0);

    const now = Date.now() / 1000;

    useEffect(() => {
        setRx(10 + 85 * ecc); // 85 = scaling factor
        setRy(10 + 50 * ecc); // 50 = scaling factor
        setCx(50 - 85 * ecc);
    }, [ecc]);

    useEffect(() => {
        const orbitRadiusX = 10 + 85 * ecc; // radius of the ellipse + radius of the circle
        const orbitRadiusY = 10 + 50 * ecc; // radius of the ellipse + radius of the circle
        const ncx = 50 - 85 * ecc;

        // Calculate new coordinates for the orbiting object
        const newCx = ncx + orbitRadiusX * Math.cos(angle);
        const newCy = 50 + orbitRadiusY * Math.sin(angle);
        setAngle(angle - 0.0005); // Increment the angle for the next frame

        // Update the cx and cy attributes of the orbiting object
        const orbitingObject = document.getElementById("orbiting-object");
        orbitingObject.setAttribute("cx", newCx);
        orbitingObject.setAttribute("cy", newCy);
    }, [angle, ecc]);

    useEffect(() => console.log({ ecc, cx, rx, ry }), [cx, rx, ry]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div style={{ width: "100%", height: "100%" }}>
                <svg viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="3"
                        stroke="grey"
                        strokeWidth="0.01"
                        fill="yellow"
                    />
                    <ellipse
                        id="inner-planet"
                        cx={cx}
                        cy="50"
                        rx={rx}
                        ry={ry}
                        stroke="black"
                        strokeWidth="0.1"
                        fill="none"
                    />
                    <circle id="orbiting-object" r="1" fill="red" />
                </svg>
            </div>
            <div style={{ width: "100%", margin: "auto", marginLeft: "auto" }}>
                <Slider
                    max={2}
                    min={0}
                    size="small"
                    marks={marks.map((mark) => ({
                        ...mark,
                        label: (
                            <Typography className="text-xs">
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
        </div>
    );
};

export default Eccentricity;
