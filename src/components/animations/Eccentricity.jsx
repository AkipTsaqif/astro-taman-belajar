import { useEffect, useState } from "react";
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
		// if (ecc >= 0.01) {
		setRx(10 + 85 * ecc);
		setRy(10 + 50 * ecc);
		setCx(50 - 85 * ecc);
		// }
	}, [ecc]);

	useEffect(() => {
		const orbitRadiusX = rx + 1; // radius of the ellipse + radius of the circle
		const orbitRadiusY = ry + 1; // radius of the ellipse + radius of the circle

		// Calculate new coordinates for the orbiting object
		const newCx = 50 + orbitRadiusX * Math.cos(angle);
		const newCy = 50 + orbitRadiusY * Math.sin(angle);
		setAngle(angle + 0.01); // Increment the angle for the next frame

		// Update the cx and cy attributes of the orbiting object
		const orbitingObject = document.getElementById("orbiting-object");
		orbitingObject.setAttribute("cx", newCx);
		orbitingObject.setAttribute("cy", newCy);
	}, [angle, rx, ry]);

	useEffect(() => console.log({ ecc, cx, rx, ry }), [cx, rx, ry]);

	return (
		<div>
			<div style={{ width: "600px", height: "600px" }}>
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
					<ellipse
						cx="48"
						cy="50"
						rx="25"
						ry="23"
						stroke="black"
						strokeWidth="0.1"
						fill="none"
					/>
					<circle id="orbiting-object" r="1" fill="red" />
				</svg>
			</div>
			<div style={{ width: "50vw", margin: "auto" }}>
				<Typography>Eksentrisitas:</Typography>
				<Slider
					max={2}
					min={0}
					marks={marks}
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
