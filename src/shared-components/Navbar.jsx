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
import { Transition } from "@headlessui/react";

const Navbar = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [chaptersOpen, setChaptersOpen] = useState(false);
    const [quizOpen, setQuizOpen] = useState(false);

    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <Box className="fixed top-0 w-full bg-white z-10 ">
            <Box className="flex items-center px-2 pt-2 pb-2">
                <IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <MenuIcon />
                </IconButton>
                <Box className="flex flex-col px-2">
                    <Typography
                        className="text-black text-2xl font-bold font-bebas"
                        variant="h6"
                    >
                        Space & Astronomy
                    </Typography>
                    <Breadcrumbs>
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
                                    className="font-bold font-quantico"
                                    key={name}
                                >
                                    {name}
                                </Typography>
                            ) : (
                                <Link
                                    to={routeTo}
                                    key={name}
                                    className="font-quantico"
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
                    className={`w-48 flex-shrink-0 bg-binus h-screen transition-all ease-in-out duration-500 ${
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
                                    Chapters
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
                                    to="/chapter/nama-chapter"
                                >
                                    <ListItemText>
                                        <Typography className="text-white font-quantico">
                                            Chapter 1
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    component={Link}
                                    to="/chapters/2"
                                >
                                    <ListItemText>
                                        <Typography className="text-white font-quantico">
                                            Chapter 2
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    component={Link}
                                    to="/chapters/3"
                                >
                                    <ListItemText>
                                        <Typography className="text-white font-quantico">
                                            Chapter 3
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                            </List>
                        </Collapse>

                        <ListItemButton onClick={() => setQuizOpen(!quizOpen)}>
                            <ListItemText>
                                <Typography className="text-white font-quantico font-bold">
                                    Quiz
                                </Typography>
                            </ListItemText>
                            {quizOpen ? (
                                <ExpandLess className="text-white" />
                            ) : (
                                <ExpandMore className="text-white" />
                            )}
                        </ListItemButton>
                        <Collapse in={quizOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    component={Link}
                                    to="/quiz"
                                >
                                    <ListItemText>
                                        <Typography className="text-white font-quantico">
                                            Take quiz
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    component={Link}
                                    to="/quiz/highscores"
                                >
                                    <ListItemText>
                                        <Typography className="text-white font-quantico">
                                            View high scores
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                            </List>
                        </Collapse>
                        <ListItem component={Link} to="/animations">
                            <ListItemText>
                                <Typography className="text-white font-quantico font-bold">
                                    Animations
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Box>
                <Box
                    className={`flex-1 m-4 transition-all ease-in-out duration-500 ${
                        sidebarOpen
                            ? "transform translate-x-0"
                            : "transform -translate-x-48"
                    }`}
                >
                    {props.children}
                </Box>
            </Box>
        </Box>
    );
};

export default Navbar;
