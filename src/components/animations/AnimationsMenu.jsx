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
                    {animationsPlaceholder.map((anim) => {
                        return (
                            <>
                                <Box className="border-2 border-binus w-1/4 px-2">
                                    {anim}
                                </Box>
                                <Box className="w-full h-36 border-2 border-binus mb-2">
                                    <Eccentricity preview={true} />
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
