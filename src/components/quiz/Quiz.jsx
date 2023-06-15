import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import Navbar from "../../shared-components/Navbar";
import { Link, useLocation } from "react-router-dom";
import Questions from "./Questions";

const Quiz = React.memo(({ navbarHeight }) => {
    const [selectedChapter, setSelectedChapter] = useState("");
    const [chapterList, setChapterList] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [scores, setScores] = useState([]);

    const navbarRef = useRef(null);
    const location = useLocation();

    async function getData() {
        const response = await fetch(
            "http://127.0.0.1:8000/api/chapters?message=all",
            { method: "POST" }
        )
            .then((resp) => {
                resp.json().then((data) => {
                    setChapterList(data.chapterInfo);
                });
            })
            .catch((e) => {
                console.log(e);
            });

        await fetch("http://127.0.0.1:8000/api/score?message=home", {
            method: "POST",
        })
            .then((resp) => {
                resp.json().then((data) => {
                    console.log(data.scores);
                    setScores(data.scores);
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const getQuestions = async () => {
        await fetch(
            `http://127.0.0.1:8000/api/quiz?message=${selectedChapter}`,
            {
                method: "POST",
            }
        )
            .then((resp) => {
                resp.json().then((data) => {
                    let q = data.questions;
                    setQuestions(q);
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getQuestions();
    }, [selectedChapter]);

    useEffect(() => {
        if (navbarRef.current) {
            // Access the height value from the ref and update the state
            setNavbarHeight(navbarRef.current.clientHeight);
        }
    }, [navbarRef.current]);

    return (
        <Box
            sx={{ top: `${navbarHeight}px` }}
            className="absolute w-full h-full z-[10]"
        >
            {location.pathname === "/kuis" && (
                <Box className="mx-auto flex flex-col items-center justify-center">
                    <Typography className="font-bold font-quantico text-center text-xl mb-2 text-white">
                        Pilih Materi
                    </Typography>
                    {/* <FormControl className="w-1/2">
                    <InputLabel id="demo-simple-select-label">
                        Materi
                    </InputLabel>
                    <Select
                        value={selectedChapter}
                        label="Materi"
                        onChange={(e) => setSelectedChapter(e.target.value)}
                    >
                        {chapterList.map((chapter, i) => (
                            <MenuItem value={chapter.chapterId}>
                                {chapter.chapterName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl> */}
                    <Box className="flex flex-col w-1/4">
                        <label className="text-white text-left font-quantico font-bold text-sm">
                            Daftar Materi Tersedia:
                        </label>
                        <select
                            onChange={(e) => setSelectedChapter(e.target.value)}
                            className="w-full p-2 border-2 bg-black/50 border-gray-500 rounded-lg text-lg font-quantico font-bold text-white"
                        >
                            <option key={null} value={null} selected>
                                ...
                            </option>
                            {chapterList.map((chapter, i) => (
                                <option
                                    key={chapter.chapterId}
                                    value={chapter.chapterId}
                                >
                                    {chapter.chapterName}
                                </option>
                            ))}
                        </select>
                    </Box>
                    {console.log("ini jalan")}
                    <Link
                        to="/kuis/mulai"
                        class="w-1/6 my-6 rounded-lg bg-transparent p-2 border-2 border-gray-500"
                    >
                        <Typography className="font-bold font-quantico text-white text-center">
                            Mulai
                        </Typography>
                    </Link>
                    <hr className="border-2 border-gray-500 w-full" />
                    <Box className="flex flex-col justify-center mt-4 w-full">
                        <Typography className="font-quantico font-bold mb-4 text-xl text-white text-center">
                            Papan Peringkat
                        </Typography>
                        <Box className="grid grid-cols-3 gap-4 px-16">
                            {scores.map((chapter, i) => (
                                <Box>
                                    <Box className="border-gray-500 rounded-t-2xl bg-black border-2">
                                        <Typography className="font-bold font-quantico text-white text-center">
                                            {chapter.chapterName}
                                        </Typography>
                                    </Box>
                                    {/*Note: this are records */}
                                    <Box className="border-2 p-3 bg-gray-700/50 border-gray-500 grid grid-cols-2 rounded-b-lg h-max">
                                        {chapter.scores.map((score, i) => (
                                            <>
                                                <Typography className=" p-1 text-white font-quantico">
                                                    {i + 1} | {score.name}
                                                </Typography>
                                                <Typography className="text-right p-1 text-white font-quantico">
                                                    {score.score} |{" "}
                                                    {score.finishTime.slice(
                                                        3,
                                                        8
                                                    )}
                                                </Typography>
                                            </>
                                        ))}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            )}
            {console.log(location.pathname === "/kuis/mulai")}

            {location.pathname === "/kuis/mulai" && (
                <Box className="mx-auto w-full h-full bg-black/50">
                    {console.log("ini nongol")}
                    <Questions questions={questions} />
                </Box>
            )}
        </Box>
    );
});

export default Quiz;
