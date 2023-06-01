import { Box, Typography } from "@mui/material";
import Navbar from "../../shared-components/Navbar";
import Eccentricity from "./Eccentricity";

const AnimationMenu = (props) => {
    const animationsPlaceholder = ["Eksentrisitas", "Tata Surya"];

    return (
        <Navbar>
            <Box className="flex-1 mr-4 mt-4 overflow-y-auto max-h-screen">
                <Typography className="mb-4 font-bold uppercase font-quantico text-3xl">
                    Kumpulan Animasi
                </Typography>
                <Box className="flex flex-col">
                    {animationsPlaceholder.map((anim, i) => {
                        return (
                            <>
                                <Box className="w-1/4 px-8 py-1 border-t-2 border-x-2 border-binus rounded-t-full">
                                    <Typography className="font-bold font-quantico">
                                        {anim}
                                    </Typography>
                                </Box>
                                <Box className="relative w-full h-36 border-2 border-binus mb-4">
                                    <img
                                        src="/images/ecc-prev.png"
                                        className="absolute inset-0 w-full h-full object-contain"
                                    />
                                </Box>
                            </>
                        );
                    })}
                </Box>
            </Box>
        </Navbar>
    );
};

export default AnimationMenu;
