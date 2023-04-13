import * as THREE from 'three';

const Orbit = ({ xRadius = 1, zRadius = 1 }) => {
	const points = [];
	const totalVertices = 512;

	for (let i = 0; i < totalVertices; i++) {
		const angle = (i / totalVertices) * 2 * Math.PI;
		const x = xRadius * Math.cos(angle);
		const z = zRadius * Math.sin(angle);
		points.push(new THREE.Vector3(x, 0, z));
	}

	points.push(points[0]);

	const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

	return (
		<line geometry={lineGeometry}>
			<lineBasicMaterial attach='material' color='#BFBBDA' linewidth={10} />
		</line>
	);
};

export default Orbit;
