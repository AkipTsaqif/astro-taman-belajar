import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { forwardRef } from "react";

const Navbar = forwardRef((props, ref) => {
    return (
        <Box ref={ref} className="fixed top-0 w-full bg-transparent z-[2]">
            <Box id="topbar" className="flex flex-col p-3">
                <Typography
                    className="text-white text-2xl font-bold font-bebas"
                    variant="h6"
                >
                    Astronomi dan Angkasa Luar
                </Typography>
                <Box className="flex w-2/3">
                    <Link
                        to="/"
                        key="sol"
                        className="font-quantico capitalize font-bold text-white w-1/12"
                    >
                        Home
                    </Link>
                    <Link
                        to="/kuis"
                        key="kuis"
                        className="font-quantico capitalize font-bold text-white w-1/12"
                    >
                        Kuis
                    </Link>
                </Box>
            </Box>
        </Box>
    );
});

export default Navbar;
