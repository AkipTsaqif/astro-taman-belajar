import React, { useState, useEffect } from "react";
import { Slider } from "@mui/material";

const Eccentricity2 = () => {
	const [eccentricity, setEccentricity] = useState(0.5); // Initial eccentricity state
	const semiMajorAxis = 100;
	const semiMinorAxis =
		eccentricity === 1
			? Infinity
			: semiMajorAxis *
			  Math.sqrt(Math.abs(1 - eccentricity * eccentricity));
	const focalDistance = semiMajorAxis * eccentricity;
	const cx = focalDistance; // Set the cx value to the focal distance
	const cy = 200; // Set the cy value to the vertical center of the SVG
	const parentStarX =
		eccentricity === 1 ? cx + semiMajorAxis : cx - focalDistance; // Set the parent star's x value to the correct focal point

	useEffect(() => {
		// Update the orbiting object's position based on the current eccentricity state
		const updateOrbitPosition = () => {
			const now = Date.now() / 1000;
			const x = cx + semiMajorAxis * Math.cos((now * Math.PI) / 2);
			const y = cy + semiMinorAxis * Math.sin((now * Math.PI) / 2);
			const orbitingObject = document.getElementById("orbiting-object");
			orbitingObject.setAttribute("cx", x);
			orbitingObject.setAttribute("cy", y);
		};

		updateOrbitPosition();
	}, [eccentricity, cx, cy, semiMajorAxis, semiMinorAxis]);

	const handleEccentricityChange = (event, newEccentricity) => {
		setEccentricity(newEccentricity);
	};

	return (
		<div>
			{/* Use Slider component from MUI to adjust the orbit eccentricity */}
			<Slider
				min={0}
				max={2}
				step={0.01}
				value={eccentricity}
				onChange={handleEccentricityChange}
				style={{ width: "360px" }}
			/>

			{/* Update the viewBox and preserveAspectRatio attributes of the SVG */}
			<svg
				width="100%"
				height="400"
				viewBox="0 0 400 400"
				preserveAspectRatio="xMidYMid meet"
			>
				{/* Define the orbit path as an ellipse with cx based on the focal distance and cy as the vertical center */}
				{eccentricity <= 1 ? (
					<ellipse
						cx={cx}
						cy={cy}
						rx={semiMajorAxis}
						ry={semiMinorAxis}
						fill="none"
						stroke="black"
					/>
				) : (
					<path
						d={`M${
							cx - semiMajorAxis
						} ${cy} A${semiMajorAxis} ${semiMinorAxis} 0 1 0 ${
							cx + semiMajorAxis
						} ${cy}`}
						fill="none"
						stroke="black"
					/>
				)}

				{/* Define the parent star as a circle at the correct focal point */}
				<circle cx={parentStarX} cy={cy} r="5" fill="yellow" />

				{/* Define the orbiting object as a circle */}
				<circle id="orbiting-object" r="10" fill="blue" />
			</svg>
		</div>
	);
};

export default Eccentricity2;
