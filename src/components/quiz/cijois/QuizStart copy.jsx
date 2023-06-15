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

const Quiz = () => {
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [points, setPoints] = useState(0);
    const [number, setNumber] = useState(1);

    const [question, setQuestion] = useState("");
    const [media, setMedia] = useState("");
    const [choice1, setChoice1] = useState("");
    const [choice2, setChoice2] = useState("");
    const [choice3, setChoice3] = useState("");
    const [choice4, setChoice4] = useState("");

    const [array, setarray] = useState([]);

    async function getData() {
        const response = await fetch(
            "http://127.0.0.1:8000/api/quiz?message=1",
            { method: "POST" }
        )
            .then((resp) => {
                resp.json().then((data) => {
                    console.log(data);
                    setarray(data.questions);
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    function randomizeChoices(props) {
        const number = props.number;
        const rand = 1 + Math.random() * (4 - 1);
        const question = array[number];
        const choice1 = question.choices[1];

        setChoice1();
        setChoice2();
        setChoice3();
        setChoice4();
    }

    useEffect(() => {
        getData();
        const question = array[0];
        setQuestion(question.question);
        setMedia(question.mediaLink);
        randomizeChoices(0);
    }, []);

    return (
        <Navbar>
            {array ? (
                <Box className="w-full h-full bg-slate-200 flex flex-col justify-center">
                    {/* This is Question */}
                    <Box className="w-full h-full bg-slate-300 p-3 flex flex-row justify-center">
                        <Box className="w-5/6 h-full bg-binus p-3 rounded-xl flex flex-col justify-around gap-3">
                            <Box className="w-max bg-white rounded-xl flex flex-col justify-center">
                                <Box className="p-2">Question: {number}/10</Box>
                            </Box>
                            <Box className="w-full h-full bg-white p-5 rounded-xl flex flex-col justify-around gap-2 items-center">
                                <Box className="w-full  bg-red-100 ">
                                    {question}
                                </Box>
                                {media ? (
                                    <Box className="w-fit h-64 bg-slate-100 flex flex-col justify-around mt-5">
                                        <img
                                            src={media}
                                            alt=""
                                            className="object-cover w-full h-full"
                                        />
                                    </Box>
                                ) : null}
                            </Box>
                        </Box>
                    </Box>
                    {/* This is Answer */}
                    {{ number } ? (
                        <Box className="w-full h-full bg-slate-200 flex flex-col mb-24 items-center ">
                            <Box className="w-2/3 h-full bg-slate-100 flex flex-row justify-around mb-5 gap-10">
                                <Box className="w-full h-full bg-red-300 flex flex-col justify-center">
                                    {choice1}
                                </Box>
                                <Box className="w-full h-full bg-red-200 flex flex-col justify-around">
                                    {choice2}
                                </Box>
                            </Box>
                            <Box className="w-2/3 h-full bg-red-100 flex flex-row justify-around gap-10">
                                <Box className="w-full h-full bg-red-200 flex flex-col justify-around">
                                    {choice3}
                                </Box>
                                <Box className="w-full h-full bg-red-300 flex flex-col justify-center">
                                    {choice4}
                                </Box>
                            </Box>
                            <Box className="w-2/3 h-2/3 bg-white-100 flex flex-row justify-end mt-5">
                                <Button className="w-1/3 h-full bg-binus">
                                    Next
                                </Button>
                            </Box>
                        </Box>
                    ) : null}
                </Box>
            ) : null}
        </Navbar>
    );
};

export default Quiz;
