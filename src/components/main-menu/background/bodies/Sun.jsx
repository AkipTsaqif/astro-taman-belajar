const Sun = ({ size }) => {
    return (
        <mesh>
            <sphereGeometry args={size}/>
            <meshStandardMaterial color="#E1DC59"/>
        </mesh>
    )
}

export default Sun;