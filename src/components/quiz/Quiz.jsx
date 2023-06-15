import { useEffect, useRef, useState } from "react";
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

const Quiz = ({ navbarHeight }) => {
    const [selectedChapter, setSelectedChapter] = useState("");
    const [chapterList, setChapterList] = useState([]);

    const navbarRef = useRef(null);

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
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (navbarRef.current) {
            // Access the height value from the ref and update the state
            setNavbarHeight(navbarRef.current.clientHeight);
        }
    }, [navbarRef.current]);

    return (
        <Box
            sx={{ pt: `${navbarHeight}px` }}
            className="absolute w-full h-full z-[10]"
        >
            <Typography className="mb-4 font-bold uppercase font-quantico text-3xl text-white">
                Kuis
            </Typography>
            <Box className="mx-auto flex flex-col items-center justify-center">
                <Typography className="font-bold font-quantico text-center text-xl mb-4 text-white">
                    Pilih Materi
                </Typography>
                <FormControl className="w-1/2">
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
                </FormControl>
                <button class="w-1/6 my-2 rounded-lg bg-transparent p-2 border-2 border-gray-500">
                    <Typography className="font-bold font-quantico text-white">
                        Mulai
                    </Typography>
                </button>
                {selectedChapter ? (
                    <Box className="w-3/4 h-max mt-12 flex flex-col justify-center items-center">
                        <Box className="w-1/2 border-t-2 border-x-2 border-gray-500 rounded-t-2xl flex justify-center">
                            <Typography className="font-bold font-quantico text-center flex flex-col justify-center text-white">
                                <Box>
                                    Papan Peringkat{" "}
                                    {selectedChapter
                                        ? chapterList[selectedChapter - 1]
                                              .chapterName
                                        : null}
                                </Box>
                            </Typography>
                        </Box>
                        {/* <Box className="w-full h-full">
                                <Box className=" w-full h-max bg-binus border-2 p-2 border-binus grid gap-y-1 grid-cols-2 rounded-2xl">
                                    {selectedChapter ? (
                                        <Score chapter={selectedChapter} />
                                    ) : null}
                                </Box>
                            </Box> */}
                    </Box>
                ) : null}
            </Box>
        </Box>
    );
};

export default Quiz;
