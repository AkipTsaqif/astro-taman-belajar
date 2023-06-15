import { useEffect, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import Navbar from "../../../shared-components/Navbar";
import _ from "lodash";
import { Link, useNavigate } from "react-router-dom";

const Quiz_C = () => {
    const [selectedChapter, setSelectedChapter] = useState("");
    const [array, setarray] = useState([]);
    const navigate = useNavigate();

    async function getData() {
        const response = await fetch(
            "http://127.0.0.1:8000/api/chapters?message=all",
            { method: "POST" }
        )
            .then((resp) => {
                resp.json().then((data) => {
                    console.log(data);
                    setarray(data.chapterInfo);
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    const [array2, setarray2] = useState([]);

    async function getData2() {
        const response = await fetch(
            "http://127.0.0.1:8000/api/score?message=quiz",
            { method: "POST" }
        )
            .then((resp) => {
                resp.json().then((data) => {
                    console.log(data);
                    setarray2(data.scores);
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        getData2();
    }, []);

    function Score(props) {
        const chapter = props.chapter;

        if (chapter != "") {
            return array2[chapter - 1].scores.map((score, i) => {
                console.log(score);
                return (
                    <>
                        <Typography className="p-1 font-bold bg-white">
                            {i + 1} | {score.name}
                        </Typography>
                        <Typography className="text-right font-bold p-1 bg-white">
                            {score.score} | {score.finishTime.slice(3, 8)}
                        </Typography>
                    </>
                );
            });
        } else {
            return <Box>a</Box>;
        }
    }

    if (array.length === 0) {
        return <div></div>;
    }

    return (
        <Box className="bg-black">
            <Navbar />
            <Box>
                <img
                    src="/images/home.gif"
                    className="absolute inset-0 w-full h-full object-cover z-[-1]"
                />
                {/* <Box className="flex-1 mr-4 mt-4 overflow-y-auto max-h-screenoverflow-y-auto max-h-screen mb-20"></Box> */}
                <Box className="flex-1 mr-4 mt-4 mb-20">
                    <Typography className="mb-2 font-bold uppercase font-quantico text-3xl ml-10 text-white">
                        Kuis
                    </Typography>
                    {/* this is container */}
                    <Box className="mx-auto flex flex-row items-center justify-around w-full h-full p-10 gap-10">
                        {/* this is form */}
                        <Box className="mx-auto flex flex-col items-center justify-around bg-white w-1/2 h-1/2 rounded-lg drop-shadow-xl p-5 bg-slate-100">
                            <Typography className="font-bold font-quantico text-center text-xl mb-4">
                                Pilih Materi
                            </Typography>
                            <FormControl className="w-1/2">
                                <InputLabel id="demo-simple-select-label">
                                    Materi
                                </InputLabel>
                                <Select
                                    value={selectedChapter}
                                    label="Materi"
                                    onChange={(e) => {
                                        setSelectedChapter(e.target.value),
                                            console.log(e.target.value);
                                    }}
                                >
                                    {array.map((chapter, i) => {
                                        console.log(chapter);
                                        return (
                                            <MenuItem value={chapter.chapterId}>
                                                {chapter.chapterName}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <div
                                className="rounded-lg bg-binus p-2 border-2 w-36 mt-2 mb-2 border-binus"
                                onClick={() => {
                                    if (selectedChapter === "") {
                                        alert(
                                            "Anda perlu memilih materi yang ingin dilakukan sebelum memulai kuis"
                                        );
                                        return;
                                    }
                                    navigate("/kuistest", {
                                        state: { selectedChapter },
                                    });
                                }}
                            >
                                <Typography className="font-bold font-quantico text-white text-center">
                                    Mulai
                                </Typography>
                            </div>
                            {selectedChapter ? (
                                <Box className="w-full h-2/5 bg-binus border-2 border-binus rounded-lg justify-center flex flex-row">
                                    <img
                                        src={
                                            array[selectedChapter - 1]
                                                .chapterPreviewLink
                                        }
                                        className=" w-full h-full object-cover"
                                    />
                                </Box>
                            ) : null}
                        </Box>
                        {/* this is score */}
                        {selectedChapter ? (
                            <Box className="w-3/4 h-max flex flex-col justify-center items-center">
                                <Box className="w-1/2 border-t-2 border-x-2 bg-binus border-binus rounded-t-2xl flex justify-center">
                                    <Typography className="font-bold font-quantico text-center flex flex-col justify-center text-white">
                                        <Box>
                                            Papan Peringkat{" "}
                                            {selectedChapter
                                                ? array[selectedChapter - 1]
                                                      .chapterName
                                                : null}
                                        </Box>
                                    </Typography>
                                </Box>
                                <Box className="w-full h-full">
                                    <Box className=" w-full h-max bg-binus border-2 p-2 border-binus grid gap-y-1 grid-cols-2 rounded-2xl">
                                        {selectedChapter ? (
                                            <Score chapter={selectedChapter} />
                                        ) : null}
                                    </Box>
                                </Box>
                            </Box>
                        ) : null}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Quiz_C;
