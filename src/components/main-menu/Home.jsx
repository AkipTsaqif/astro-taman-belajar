import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import SolarSystem from "./background/SolarSystem";
import Login from "../auth/Login";
import Navbar from "../../shared-components/Navbar";

const Home = () => {
    const [isLoginClicked, setIsLoginClicked] = useState(false);

    return (
        <Navbar>
            <Box className="m-auto">
                <Box className="mx-auto mb-4">
                    <Typography className="uppercase font-bold font-bebas text-6xl text-center">
                        Astronomi dan Angkasa Luar
                    </Typography>
                </Box>
                <Box className="mx-auto max-w-2xl">
                    <Typography className="italic text-justify mb-2">
                        Two possibilities exist: either we are alone in the
                        universe or we are not. Both are equally terrifying.
                    </Typography>
                    <Typography className="italic font-bold">
                        — Arthur C. Clark
                    </Typography>
                </Box>
            </Box>
            {/* <SolarSystem /> */}
            {/* <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: "100vw",
                            backgroundColor: "rgba(44, 44, 44, 0.8)",
                            padding: "16px",
                            borderRadius: "4px",
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{ color: "white", mt: "8px" }}
                        >
                            SELAMAT DATANG
                        </Typography>
                        <Typography variant="h4" sx={{ color: "white" }}>
                            di Media Pembelajaran Astronomi
                        </Typography>
                        <Box marginY="24px">
                            <Button
                                variant="contained"
                                sx={{
                                    fontSize: "24px",
                                    mr: "8px",
                                    backgroundColor: "#5788AD",
                                }}
                                onClick={() => setIsLoginClicked(true)}
                            >
                                Masuk
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    fontSize: "24px",
                                    ml: "8px",
                                    backgroundColor: "#5788AD",
                                }}
                            >
                                Daftar
                            </Button>
                        </Box>

                        {isLoginClicked ? <Login /> : null}
                    </Box>
                </Box> */}
        </Navbar>
    );
};

export default Home;
