import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Box,
    Breadcrumbs,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const Navbar_old = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [chaptersOpen, setChaptersOpen] = useState(false);

    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <Box className="fixed top-0 w-full bg-white z-10 ">
            <Box className="flex items-center px-2 pt-2 pb-2 border-b-2 border-binus">
                <IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <MenuIcon />
                </IconButton>
                <Box className="flex flex-col px-2">
                    <Typography
                        className="text-black text-2xl font-bold font-bebas"
                        variant="h6"
                    >
                        Astronomi dan Angkasa Luar
                    </Typography>
                    <Breadcrumbs
                        separator={<ArrowRightAltIcon fontSize="small" />}
                    >
                        <Link to="/" className="font-quantico">
                            Home
                        </Link>
                        {pathnames.map((name, index) => {
                            const routeTo = `/${pathnames
                                .slice(0, index + 1)
                                .join("/")}`;
                            const isLast = index === pathnames.length - 1;
                            return isLast ? (
                                <Typography
                                    className="font-bold font-quantico capitalize"
                                    key={name}
                                >
                                    {name}
                                </Typography>
                            ) : (
                                <Link
                                    to={routeTo}
                                    key={name}
                                    className="font-quantico capitalize"
                                >
                                    {name}
                                </Link>
                            );
                        })}
                    </Breadcrumbs>
                </Box>
            </Box>

            <Box className="flex">
                <Box
                    className={`w-48 fixed left-0 flex-shrink-0 bg-binus h-screen transition-all ease-in-out duration-500 ${
                        sidebarOpen
                            ? "transform translate-x-0"
                            : "transform -translate-x-48"
                    }`}
                >
                    <List component="nav">
                        <ListItemButton
                            onClick={() => setChaptersOpen(!chaptersOpen)}
                        >
                            <ListItemText>
                                <Typography className="text-white font-quantico font-bold">
                                    Materi
                                </Typography>
                            </ListItemText>
                            {chaptersOpen ? (
                                <ExpandLess className="text-white" />
                            ) : (
                                <ExpandMore className="text-white" />
                            )}
                        </ListItemButton>
                        <Collapse
                            in={chaptersOpen}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List component="div" disablePadding>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    component={Link}
                                    to="/materi/nama-materi"
                                >
                                    <ListItemText>
                                        <Typography className="text-white font-quantico">
                                            Materi 1
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    component={Link}
                                    to="/materi/2"
                                >
                                    <ListItemText>
                                        <Typography className="text-white font-quantico">
                                            Materi 2
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    component={Link}
                                    to="/materi/3"
                                >
                                    <ListItemText>
                                        <Typography className="text-white font-quantico">
                                            Materi 3
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                            </List>
                        </Collapse>

                        <ListItem component={Link} to="/kuis">
                            <ListItemText>
                                <Typography className="text-white font-quantico font-bold">
                                    Kuis
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem component={Link} to="/animasi">
                            <ListItemText>
                                <Typography className="text-white font-quantico font-bold">
                                    Kumpulan Animasi
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Box>
                <Box
                    className={`flex-1 h-screen w-screen transition-all ease-in-out duration-500 ${
                        sidebarOpen ? "transform ml-52" : "transform ml-4"
                    }`}
                >
                    <Box className="flex h-screen justify-between">
                        {props.children}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Navbar_old;
