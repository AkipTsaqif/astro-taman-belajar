import { Canvas } from "@react-three/fiber";
import { Box } from "@mui/material";
import Sun from "./bodies/Sun";
import Planets from "./bodies/Planets";
import { OrbitControls } from "@react-three/drei";
import "./solarSystem.css";

const SolarSystem = () => {
    const planets = [
        {
            id: "mercury",
            pos: 55,
            size: [0.25, 32, 32],
            color: "gray",
            speed: 1,
            name: "Merkurius",
            offset: Math.random(0, Math.PI * 2),
        },
        {
            id: "venus",
            pos: 75,
            size: [1, 32, 32],
            color: "orange",
            speed: 0.85,
            name: "Venus",
            offset: Math.random(0, Math.PI * 2),
        },
        {
            id: "earth",
            pos: 100,
            size: [1, 32, 32],
            color: "#75a8fa",
            speed: 0.75,
            name: "Bumi",
            offset: Math.random(0, Math.PI * 2),
        },
        {
            id: "mars",
            pos: 140,
            size: [0.3, 32, 32],
            color: "red",
            speed: 0.55,
            name: "Mars",
            offset: Math.random(0, Math.PI * 2),
        },
        {
            id: "jupiter",
            pos: 230,
            size: [6, 32, 32],
            color: "brown",
            speed: 0.05,
            name: "Jupiter",
            offset: Math.random(0, Math.PI * 2),
        },
        {
            id: "saturn",
            pos: 310,
            size: [5, 32, 32],
            color: "yellow",
            speed: 0.01,
            name: "Saturnus",
            offset: Math.random(0, Math.PI * 2),
        },
        {
            id: "uranus",
            pos: 450,
            size: [5, 32, 32],
            color: "blue",
            speed: 0.001,
            name: "Uranus",
            offset: Math.random(0, Math.PI * 2),
        },
        {
            id: "neptune",
            pos: 650,
            size: [5, 32, 32],
            color: "yellow",
            speed: 0.0002,
            name: "Neptunus",
            offset: Math.random(0, Math.PI * 2),
        },
    ];

    return (
        <Box className="w-full h-full bg-black">
            <Canvas camera={{ position: [175, 25, 25], fov: 40 }}>
                <ambientLight />
                <pointLight position={[0, 0, 0]} />
                <Sun size={[32, 32, 32]} />
                {planets.map((planet) => (
                    <Planets
                        key={planet.id}
                        pos={[planet.pos, 0, 0]}
                        orbit={{
                            xRadius: planet.pos,
                            zRadius: planet.pos * 1.25,
                        }}
                        color={planet.color}
                        size={planet.size}
                        speed={planet.speed * 0.1}
                        name={planet.name}
                        offset={planet.offset}
                    />
                ))}
                <OrbitControls target={[5, -65, -155]} />
            </Canvas>
        </Box>
    );
};

export default SolarSystem;
