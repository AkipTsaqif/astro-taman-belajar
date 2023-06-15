import { Box, Typography } from "@mui/material";
import svgs from "../../../assets/";

const PlanetAnnotation = ({ details, isSun, subjectSelect }) => {
    return (
        <Box>
            <Typography className="text-white text-center text-xl font-bold font-quantico mb-2">
                {details?.details.name}
            </Typography>
            {details && (
                <img
                    src={svgs[details?.details.name]}
                    width="75%"
                    className="mx-auto my-4"
                />
            )}
            <Box className="flex">
                <Typography className="text-white font-quantico w-1/2">
                    Diameter:
                </Typography>
                <Typography className="text-white font-quantico w-1/2 text-right">
                    {details?.details.diameter}
                </Typography>
            </Box>
            {!isSun && (
                <Box className="flex">
                    <Typography className="text-white font-quantico w-1/2">
                        Jarak dari Matahari:
                    </Typography>
                    <Typography className="text-white font-quantico w-1/2 text-right">
                        {details?.details.distance}
                    </Typography>
                </Box>
            )}
            <Box className="flex">
                <Typography className="text-white font-quantico w-1/2">
                    Suhu rata-rata:
                </Typography>
                <Typography className="text-white font-quantico w-1/2 text-right">
                    {details?.details.temp.avg}
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
            {!isSun && (
                <Box className="flex">
                    <Typography className="text-white font-quantico w-1/2">
                        Periode revolusi:
                    </Typography>
                    <Typography className="text-white font-quantico w-1/2 text-right">
                        {details?.details.revolutionPeriod}
                    </Typography>
                </Box>
            )}
            {!isSun && (
                <Box className="flex">
                    <Typography className="text-white font-quantico w-1/2">
                        Jumlah bulan:
                    </Typography>
                    <Typography className="text-white font-quantico w-1/2 text-right">
                        {details?.details.moons}
                    </Typography>
                </Box>
            )}
            <Box className="flex justify-center">
                <button className="mt-2" onClick={subjectSelect}>
                    <Typography className="text-white font-quantico cursor-pointer hover:underline">
                        Klik di sini untuk info lebih detail
                    </Typography>
                </button>
            </Box>
        </Box>
    );
};

export default PlanetAnnotation;
