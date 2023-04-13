import { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import useDidMountEffect from "../../hooks/useDidMountEffect";

const Eccentricity = () => {
	const [ecc, setEcc] = useState(1);
	const [cx, setCx] = useState(50);
	const [rx, setRx] = useState(10);
	const [ry, setRy] = useState(10);

	useEffect(() => {
		if (ecc >= 0.01) {
			setRx(1 / (ecc / 10) + (2 - ecc * 2) * 36);
			setRy(1 / (ecc / 10) + (2 - ecc * 2) * 6);
			setCx(ecc * 50 - (50 - ecc * 50) / 1.5);
		}
	}, [ecc]);

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
					{/* <path
						d="M 100,50 A 10,10 100 1,1 10,50"
						fill="none"
						stroke="black"
					/>
					<path d="M 125,75 a180,50 100 0,0 100,50" /> */}
					<ellipse
						cx={ecc === 1 ? "50" : cx}
						cy="50"
						rx={ecc === 1 ? "10" : rx}
						ry={ecc === 1 ? "10" : ry}
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
				</svg>
			</div>
			<div style={{ width: "50vw", margin: "auto" }}>
				<Slider
					max={1}
					min={0}
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
