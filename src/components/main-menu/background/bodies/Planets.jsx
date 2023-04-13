import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Orbit from '../utils/Orbit';

const Planets = ({ name, orbit, color, size, speed, offset }) => {
	const planetRef = useRef();
	const loc = useLocation();

	useFrame(({ clock }) => {
		const t = clock.getElapsedTime() * speed + offset + 19.5;
		const x = orbit?.xRadius * Math.sin(t);
		const z = orbit?.zRadius * Math.cos(t);

		planetRef.current.position.x = x;
		planetRef.current.position.z = z;
	});

	return (
		<>
			<mesh ref={planetRef}>
				<sphereGeometry args={size} />
				<meshStandardMaterial color={color} />
				{loc.pathname === '/' ? null : (
					<Html distanceFactor={35}>
						<div className='annotation'>{name}</div>
					</Html>
				)}
			</mesh>
			<Orbit xRadius={orbit?.xRadius} zRadius={orbit?.zRadius} />
		</>
	);
};

export default Planets;
