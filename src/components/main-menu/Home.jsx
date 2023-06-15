import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import SolarSystem from "./background/SolarSystem";
import Login from "../auth/Login";
import Navbar from "../../shared-components/Navbar_old";

const Home = () => {
    const [isLoginClicked, setIsLoginClicked] = useState(false);

    return (
        <Box className="m-auto py-4">
            <Box className="mx-auto mb-4">
                <Typography className="uppercase font-bold font-bebas text-6xl text-center text-white">
                    Astronomi dan Angkasa Luar
                </Typography>
            </Box>
            <Box className="mx-auto max-w-2xl">
                <Typography className="italic text-justify mb-2 text-white">
                    Two possibilities exist: either we are alone in the universe
                    or we are not. Both are equally terrifying.
                </Typography>
                <Typography className="italic font-bold text-white">
                    — Arthur C. Clark
                </Typography>
            </Box>
        </Box>
    );
};

export default Home;
