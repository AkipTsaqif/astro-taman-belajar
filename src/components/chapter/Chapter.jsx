import { Box, Typography } from "@mui/material";
import Eccentricity from "../animations/Eccentricity";
import Navbar from "../../shared-components/Navbar";
import AnimationPane from "../../shared-components/AnimationPane";

const Chapter = (props) => {
    return (
        <Navbar>
            <Box className="flex-1 mr-4 mt-4 overflow-y-auto max-h-screen">
                <Typography className="mb-4 font-bold font-quantico text-3xl">
                    NAMA MATERI
                </Typography>
                <Box>
                    <img
                        src="/images/susunan-tata-surya-1.jpg"
                        width="400px"
                        className="float-left mr-4 mb-2"
                    />
                    <Typography className="text-justify indent-12 mb-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </Typography>
                    <Typography className="text-justify indent-12">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </Typography>
                </Box>
            </Box>

            <Box className="border-l-2 border-solid border-binus">
                <AnimationPane className="mt-4" kind={<Eccentricity />} />
            </Box>
        </Navbar>
    );
};

export default Chapter;
