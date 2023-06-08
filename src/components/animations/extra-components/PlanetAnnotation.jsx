import { Box, Typography } from "@mui/material";

const PlanetAnnotation = ({ details }) => {
    // console.log(details.details.name);
    return (
        <Box>
            <Typography className="text-white text-center text-xl font-bold font-quantico mb-2">
                {details?.details.name}
            </Typography>
            <Box className="flex">
                <Typography className="text-white font-quantico w-1/2">
                    Diameter:
                </Typography>
                <Typography className="text-white font-quantico w-1/2 text-right">
                    {details?.details.diameter}
                </Typography>
            </Box>
            <Box className="flex">
                <Typography className="text-white font-quantico w-1/2">
                    Jarak dari Matahari:
                </Typography>
                <Typography className="text-white font-quantico w-1/2 text-right">
                    {details?.details.distance}
                </Typography>
            </Box>
            <Box className="flex">
                <Typography className="text-white font-quantico w-1/2">
                    Periode rotasi:
                </Typography>
                <Typography className="text-white font-quantico w-1/2 text-right">
                    {details?.details.rotationPeriod}
                </Typography>
            </Box>
            <Box className="flex">
                <Typography className="text-white font-quantico w-1/2">
                    Periode revolusi:
                </Typography>
                <Typography className="text-white font-quantico w-1/2 text-right">
                    {details?.details.revolutionPeriod}
                </Typography>
            </Box>
            <Box className="flex">
                <Typography className="text-white font-quantico w-1/2">
                    Jumlah bulan:
                </Typography>
                <Typography className="text-white font-quantico w-1/2 text-right">
                    {details?.details.moons}
                </Typography>
            </Box>
        </Box>
    );
};

export default PlanetAnnotation;
