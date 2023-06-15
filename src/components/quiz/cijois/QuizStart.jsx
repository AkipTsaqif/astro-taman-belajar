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
import { Link, useLocation } from "react-router-dom";

const Quiz = (props) => {
    const loc = useLocation();
    //form submit
    const [name, setName] = useState("");
    const [isSubmitted, toggleSubmit] = useState(false);
    const [chapter, setChapter] = useState("");
    const [finalTime, setfinalTime] = useState("");
    //score
    const [points, setPoints] = useState(0);
    const [number, setNumber] = useState(1);
    //set random choices
    const [notRandomized, setNotRandomized] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [choice1, setChoice1] = useState(0);
    const [choice2, setChoice2] = useState(1);
    const [choice3, setChoice3] = useState(2);
    const [choice4, setChoice4] = useState(3);
    // API CALL
    const [array, setarray] = useState([]);
    const [array2, setarray2] = useState([]);
    //timer
    const [sec, setSecond] = useState(0);
    const [min, setMinute] = useState(0);
    //set final time
    const [finsec, setFinSecond] = useState(0);
    const [finmin, setFinMinute] = useState(0);

    var timer;

    useEffect(() => {
        timer = setInterval(() => {
            setSecond(sec + 1);
            if (sec === 59) {
                setMinute(min + 1);
                setSecond(0);
            }
            if (min === 59 && sec === 59) {
                location.reload(true);
            }
        }, 1000);
        return () => clearInterval(timer);
    });

    async function submitData(chapter, name, score, finishTime) {
        const response = await fetch(
            `http://127.0.0.1:8000/api/insertScore?chapterId=${chapter}&name=${name}&score=${score}&finishTime=${finishTime}`,
            { method: "POST" }
        );
    }

    async function getData(chapter) {
        const response = await fetch(
            `http://127.0.0.1:8000/api/quiz?message=${chapter}`,
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

    async function getData2(chapter) {
        const response = await fetch(
            `http://127.0.0.1:8000/api/score?message=${chapter}`,
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

    function randomizeChoices() {
        const rand = Math.floor(Math.random() * 4);

        setChoice1(0);
        setChoice2(1);
        setChoice3(2);
        setChoice4(3);

        switch (rand) {
            case 0:
                setChoice1(5);
                break;
            case 1:
                setChoice2(5);
                break;
            case 2:
                setChoice3(5);
                break;
            case 3:
                setChoice4(5);
                break;
            default:
                break;
        }
        setNotRandomized(false);
    }

    useEffect(() => {
        randomizeChoices();
        getData(loc.state.selectedChapter);
        setChapter(loc.state.selectedChapter);
    }, []);

    if (array.length === 0 || notRandomized) {
        return <div></div>;
    }

    return (
        <Navbar>
            {number != 11 ? (
                <Box className="w-full h-full flex flex-col justify- gap-3 mb-24">
                    {/* This is Question */}
                    <Box className="w-full h-fit pt-5 flex flex-row justify-center">
                        <Box className="w-5/6 h-full bg-binus p-3 rounded-xl flex flex-col justify-around gap-3">
                            <Box className="w-full flex flex-row justify-between">
                                <Box className="p-2 bg-white rounded-xl ">
                                    Question: {number}/10
                                </Box>
                                <Box className="p-2 bg-white rounded-xl">
                                    Time: {min < 10 ? "0" + min : min}:
                                    {sec < 10 ? "0" + sec : sec}
                                </Box>
                            </Box>
                            <Box className="w-full h-full bg-white p-5 rounded-xl flex flex-col gap-2 items-center">
                                <Box className="w-full h-fit">
                                    {array[number - 1].question}
                                </Box>
                                {array[number - 1].mediaLink ? (
                                    <Box className="w-fit h-32 bg-slate-100 flex flex-col justify-around">
                                        <img
                                            src={array[number - 1].mediaLink}
                                            alt=""
                                            className="object-cover w-full h-full"
                                        />
                                    </Box>
                                ) : null}
                            </Box>
                        </Box>
                    </Box>
                    <Box className="w-full flex-row flex justify-center">
                        <Typography className="font-bold font-quantico pl-2 w-5/6">
                            Select Answer:
                        </Typography>
                    </Box>
                    {/* This is Answer */}
                    {array[number - 1].type === "text" ? (
                        //    this is text
                        <Box className="w-full h-1/2 flex flex-col items-center justify-center gap-2 text-white">
                            <Box className="w-5/6 h-full flex flex-col justify-center">
                                {choice1 == 0 ? (
                                    <label className="w-full h-full bg-binus border-2 border-binus rounded-lg flex flex-row">
                                        <input
                                            type="radio"
                                            value={
                                                array[number - 1].choices[
                                                    choice1
                                                ].choice
                                            }
                                            className="h-full bg-binus invisible hidden peer"
                                            name="quiz"
                                            onChange={(e) =>
                                                setSelectedAnswer(
                                                    e.target.value
                                                )
                                            }
                                        ></input>
                                        <Box className="w-full h-full  justify-center flex flex-col bg-binus rounded-lg pl-5 peer-checked:bg-binuso">
                                            A.{" "}
                                            {
                                                array[number - 1].choices[
                                                    choice1
                                                ].choice
                                            }
                                        </Box>
                                    </label>
                                ) : (
                                    <label className="w-full h-full bg-binus border-2 border-binus rounded-lg flex flex-row">
                                        <input
                                            type="radio"
                                            value={array[number - 1].answer}
                                            className="h-full bg-binus invisible hidden peer"
                                            name="quiz"
                                            onChange={(e) =>
                                                setSelectedAnswer(
                                                    e.target.value
                                                )
                                            }
                                        ></input>
                                        <Box className="w-full h-full  justify-center flex flex-col bg-binus rounded-lg pl-5 peer-checked:bg-binuso">
                                            A. {array[number - 1].answer}
                                        </Box>
                                    </label>
                                )}
                            </Box>
                            <Box className="w-5/6 h-full flex flex-col justify-center">
                                {choice2 == 1 ? (
                                    <label className="w-full h-full bg-binus border-2 border-binus rounded-lg flex flex-row">
                                        <input
                                            type="radio"
                                            value={
                                                array[number - 1].choices[
                                                    choice2
                                                ].choice
                                            }
                                            className="h-full bg-binus invisible hidden peer"
                                            name="quiz"
                                            onChange={(e) =>
                                                setSelectedAnswer(
                                                    e.target.value
                                                )
                                            }
                                        ></input>
                                        <Box className="w-full h-full  justify-center flex flex-col bg-binus rounded-lg pl-5 peer-checked:bg-binuso">
                                            B.{" "}
                                            {
                                                array[number - 1].choices[
                                                    choice2
                                                ].choice
                                            }
                                        </Box>
                                    </label>
                                ) : (
                                    <label className="w-full h-full bg-binus border-2 border-binus rounded-lg flex flex-row">
                                        <input
                                            type="radio"
                                            value={array[number - 1].answer}
                                            className="h-full bg-binus invisible hidden peer"
                                            name="quiz"
                                            onChange={(e) =>
                                                setSelectedAnswer(
                                                    e.target.value
                                                )
                                            }
                                        ></input>
                                        <Box className="w-full h-full  justify-center flex flex-col bg-binus rounded-lg pl-5 peer-checked:bg-binuso">
                                            B. {array[number - 1].answer}
                                        </Box>
                                    </label>
                                )}
                            </Box>
                            <Box className="w-5/6 h-full  flex flex-col justify-center">
                                {choice3 == 2 ? (
                                    <label className="w-full h-full bg-binus border-2 border-binus rounded-lg flex flex-row">
                                        <input
                                            type="radio"
                                            value={
                                                array[number - 1].choices[
                                                    choice3
                                                ].choice
                                            }
                                            className="h-full bg-binus invisible hidden peer"
                                            name="quiz"
                                            onChange={(e) =>
                                                setSelectedAnswer(
                                                    e.target.value
                                                )
                                            }
                                        ></input>
                                        <Box className="w-full h-full  justify-center flex flex-col bg-binus rounded-lg pl-5 peer-checked:bg-binuso">
                                            C.{" "}
                                            {
                                                array[number - 1].choices[
                                                    choice3
                                                ].choice
                                            }
                                        </Box>
                                    </label>
                                ) : (
                                    <label className="w-full h-full bg-binus border-2 border-binus rounded-lg flex flex-row">
                                        <input
                                            type="radio"
                                            value={array[number - 1].answer}
                                            className="h-full bg-binus invisible hidden peer"
                                            name="quiz"
                                            onChange={(e) =>
                                                setSelectedAnswer(
                                                    e.target.value
                                                )
                                            }
                                        ></input>
                                        <Box className="w-full h-full  justify-center flex flex-col bg-binus rounded-lg pl-5 peer-checked:bg-binuso">
                                            C. {array[number - 1].answer}
                                        </Box>
                                    </label>
                                )}
                            </Box>
                            <Box className="w-5/6 h-full  flex flex-col justify-center">
                                {choice4 == 3 ? (
                                    <label className="w-full h-full bg-binus border-2 border-binus rounded-lg flex flex-row">
                                        <input
                                            type="radio"
                                            value={
                                                array[number - 1].choices[
                                                    choice4
                                                ].choice
                                            }
                                            className="h-full bg-binus invisible hidden peer"
                                            name="quiz"
                                            onChange={(e) =>
                                                setSelectedAnswer(
                                                    e.target.value
                                                )
                                            }
                                        ></input>
                                        <Box className="w-full h-full  justify-center flex flex-col bg-binus rounded-lg pl-5 peer-checked:bg-binuso">
                                            D.{" "}
                                            {
                                                array[number - 1].choices[
                                                    choice4
                                                ].choice
                                            }
                                        </Box>
                                    </label>
                                ) : (
                                    <label className="w-full h-full bg-binus border-2 border-binus rounded-lg flex flex-row">
                                        <input
                                            type="radio"
                                            value={array[number - 1].answer}
                                            className="h-full bg-binus invisible hidden peer"
                                            name="quiz"
                                            onChange={(e) =>
                                                setSelectedAnswer(
                                                    e.target.value
                                                )
                                            }
                                        ></input>
                                        <Box className="w-full h-full  justify-center flex flex-col bg-binus rounded-lg pl-5 peer-checked:bg-binuso">
                                            D. {array[number - 1].answer}
                                        </Box>
                                    </label>
                                )}
                            </Box>
                        </Box>
                    ) : (
                        //    this is media
                        <Box className="w-full h-fit flex flex-col items-center ">
                            <Box className="w-5/6 h-full  flex flex-row justify-around mb-5 gap-10">
                                <Box className="w-full h-32 flex flex-row justify-center">
                                    {choice1 == 0 ? (
                                        <label className="w-full h-full bg-binus border-2 border-binus rounded-lg flex flex-row">
                                            <input
                                                type="radio"
                                                value={
                                                    array[number - 1].choices[
                                                        choice1
                                                    ].choice
                                                }
                                                className="h-full bg-binus invisible hidden peer"
                                                name="quiz"
                                                onChange={(e) =>
                                                    setSelectedAnswer(
                                                        e.target.value
                                                    )
                                                }
                                            ></input>
                                            <Box className="w-full p-5 h-full justify-center flex flex-col rounded-lg items-center pl-5 peer-checked:bg-binuso ">
                                                <img
                                                    src={
                                                        array[number - 1]
                                                            .choices[choice1]
                                                            .choice
                                                    }
                                                    alt=""
                                                    className="object-contain w-fit h-32 p-5"
                                                />
                                            </Box>
                                        </label>
                                    ) : (
                                        <label className="w-full h-full bg-binus border-2 border-binus rounded-lg flex flex-row">
                                            <input
                                                type="radio"
                                                value={array[number - 1].answer}
                                                className="h-full bg-binus invisible hidden peer"
                                                name="quiz"
                                                onChange={(e) =>
                                                    setSelectedAnswer(
                                                        e.target.value
                                                    )
                                                }
                                            ></input>
                                            <Box className="w-full h-full p-2 items-center justify-center flex flex-col bg-binus rounded-lg peer-checked:bg-binuso">
                                                <img
                                                    src={
                                                        array[number - 1].answer
                                                    }
                                                    alt=""
                                                    className="object-contain w-64 h-32 p-5"
                                                />
                                            </Box>
                                        </label>
                                    )}
                                </Box>
                                <Box className="w-full h-32 flex flex-row justify-center">
                                    {choice2 == 1 ? (
                                        <label className="w-full h-full bg-binus border-2 border-binus rounded-lg flex flex-row">
                                            <input
                                                type="radio"
                                                value={
                                                    array[number - 1].choices[
                                                        choice2
                                                    ].choice
                                                }
                                                className="h-full bg-binus invisible hidden peer"
                                                name="quiz"
                                                onChange={(e) =>
                                                    setSelectedAnswer(
                                                        e.target.value
                                                    )
                                                }
                                            ></input>
                                            <Box className="w-full p-5 h-full justify-center flex flex-col rounded-lg items-center pl-5 peer-checked:bg-binuso ">
                                                <img
                                                    src={
                                                        array[number - 1]
                                                            .choices[choice2]
                                                            .choice
                                                    }
                                                    alt=""
                                                    className="object-contain w-fit h-32 p-5"
                                                />
                                            </Box>
                                        </label>
                                    ) : (
                                        <label className="w-full h-full bg-binus border-2 border-binus rounded-lg flex flex-row">
                                            <input
                                                type="radio"
                                                value={array[number - 1].answer}
                                                className="h-full bg-binus invisible hidden peer"
                                                name="quiz"
                                                onChange={(e) =>
                                                    setSelectedAnswer(
                                                        e.target.value
                                                    )
                                                }
                                            ></input>
                                            <Box className="w-full h-full p-2 items-center justify-center flex flex-col bg-binus rounded-lg peer-checked:bg-binuso">
                                                <img
                                                    src={
                                                        array[number - 1].answer
                                                    }
                                                    alt=""
                                                    className="object-contain w-64 h-32 p-5"
                                                />
                                            </Box>
                                        </label>
                                    )}
                                </Box>
                            </Box>
                            <Box className="w-5/6 h-full flex flex-row justify-around gap-10">
                                <Box className="w-full h-32 flex flex-row justify-center">
                                    {choice3 == 2 ? (
                                        <label className="w-full h-full bg-binus border-2 border-binus rounded-lg flex flex-row">
                                            <input
                                                type="radio"
                                                value={
                                                    array[number - 1].choices[
                                                        choice3
                                                    ].choice
                                                }
                                                className="h-full bg-binus invisible hidden peer"
                                                name="quiz"
                                                onChange={(e) =>
                                                    setSelectedAnswer(
                                                        e.target.value
                                                    )
                                                }
                                            ></input>
                                            <Box className="w-full p-5 h-full justify-center flex flex-col rounded-lg items-center pl-5 peer-checked:bg-binuso ">
                                                <img
                                                    src={
                                                        array[number - 1]
                                                            .choices[choice3]
                                                            .choice
                                                    }
                                                    alt=""
                                                    className="object-contain w-fit h-32 p-5"
                                                />
                                            </Box>
                                        </label>
                                    ) : (
                                        <label className="w-full h-full bg-binus border-2 border-binus rounded-lg flex flex-row">
                                            <input
                                                type="radio"
                                                value={array[number - 1].answer}
                                                className="h-full bg-binus invisible hidden peer"
                                                name="quiz"
                                                onChange={(e) =>
                                                    setSelectedAnswer(
                                                        e.target.value
                                                    )
                                                }
                                            ></input>
                                            <Box className="w-full h-full p-2 items-center justify-center flex flex-col bg-binus rounded-lg peer-checked:bg-binuso">
                                                <img
                                                    src={
                                                        array[number - 1].answer
                                                    }
                                                    alt=""
                                                    className="object-contain w-64 h-32 p-5"
                                                />
                                            </Box>
                                        </label>
                                    )}
                                </Box>
                                <Box className="w-full h-32 flex flex-row justify-center">
                                    {choice4 == 3 ? (
                                        <label className="w-full h-full bg-binus border-2 border-binus rounded-lg flex flex-row">
                                            <input
                                                type="radio"
                                                value={
                                                    array[number - 1].choices[
                                                        choice4
                                                    ].choice
                                                }
                                                className="h-full bg-binus invisible hidden peer"
                                                name="quiz"
                                                onChange={(e) =>
                                                    setSelectedAnswer(
                                                        e.target.value
                                                    )
                                                }
                                            ></input>
                                            <Box className="w-full p-5 h-full justify-center flex flex-col rounded-lg items-center pl-5 peer-checked:bg-binuso ">
                                                <img
                                                    src={
                                                        array[number - 1]
                                                            .choices[choice4]
                                                            .choice
                                                    }
                                                    alt=""
                                                    className="object-contain w-fit h-32 p-5"
                                                />
                                            </Box>
                                        </label>
                                    ) : (
                                        <label className="w-full h-full bg-binus border-2 border-binus rounded-lg flex flex-row">
                                            <input
                                                type="radio"
                                                value={array[number - 1].answer}
                                                className="h-full bg-binus invisible hidden peer"
                                                name="quiz"
                                                onChange={(e) =>
                                                    setSelectedAnswer(
                                                        e.target.value
                                                    )
                                                }
                                            ></input>
                                            <Box className="w-full h-full p-2 items-center justify-center flex flex-col bg-binus rounded-lg peer-checked:bg-binuso">
                                                <img
                                                    src={
                                                        array[number - 1].answer
                                                    }
                                                    alt=""
                                                    className="object-contain w-64 h-32 p-5"
                                                />
                                            </Box>
                                        </label>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    )}
                    {/* next button */}
                    {number < 10 ? (
                        <Box className="w-full h-fit flex flex-row justify-center mb-24 ">
                            <Button
                                className="w-1/4 h-full bg-binus text-white"
                                onClick={() => {
                                    if (selectedAnswer == "") {
                                        alert(
                                            "Anda perlu memilih salah satu jawaban dari pilihan yang tersedia"
                                        );
                                        return;
                                    } else if (
                                        selectedAnswer ==
                                        array[number - 1].answer
                                    ) {
                                        setPoints(points + 1);
                                    }
                                    randomizeChoices();
                                    setNumber(number + 1);
                                    setSelectedAnswer("");
                                    var ele =
                                        document.getElementsByName("quiz");
                                    for (var i = 0; i < ele.length; i++)
                                        ele[i].checked = false;
                                }}
                            >
                                Next
                            </Button>
                        </Box>
                    ) : (
                        <Box className="w-full h-fit flex flex-row justify-center mb-24 ">
                            <Button
                                className="w-1/4 h-full bg-binus text-white"
                                onClick={() => {
                                    if (selectedAnswer == "") {
                                        alert(
                                            "Anda perlu memilih salah satu jawaban dari pilihan yang tersedia"
                                        );
                                        return;
                                    } else if (
                                        selectedAnswer ==
                                        array[number - 1].answer
                                    ) {
                                        setPoints(points + 1);
                                    }
                                    setfinalTime(
                                        "0:" +
                                            min.toString() +
                                            ":" +
                                            sec.toString()
                                    );
                                    setFinMinute(min);
                                    setFinSecond(sec);
                                    setNumber(number + 1);

                                    var ele =
                                        document.getElementsByName("quiz");
                                    for (var i = 0; i < ele.length; i++)
                                        ele[i].checked = false;
                                }}
                            >
                                Finish
                            </Button>
                        </Box>
                    )}
                </Box>
            ) : (
                // this is submit and scoreboard logic

                // this is submit name page
                <Box className="flex flex-row justify-around h-full w-full items-center p-5">
                    <img
                        src="/images/home.gif"
                        className="absolute inset-0 w-full h-full object-cover z-[-1]"
                    />
                    <Box className="flex flex-col justify-around h-1/2 w-1/2 bg-white items-center rounded-lg p-5">
                        <Box className="flex flex-col gap-5">
                            <Typography className="bg-white Insert text-5xl font-bold">
                                Congratulations
                            </Typography>
                            <Box className="flex flex-col w-full mb-5">
                                <Typography className="pl-5">
                                    Insert name:
                                </Typography>
                                <input
                                    type="text"
                                    className="h-10 p-5 rounded-lg drop-shadow"
                                    onChange={(e) => {
                                        setName(e.target.value),
                                            console.log(e.target.value);
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box className="flex flex-row justify-center gap-24 w-full pl-5 pr-5 h-1/3">
                            <Box className="flex flex-col justify-center">
                                <Typography className="font-semibold">
                                    Points
                                </Typography>
                                <Typography className="font-bold text-6xl">
                                    {points * 10}
                                </Typography>
                            </Box>
                            <Box className="flex flex-col justify-center">
                                <Typography className="font-semibold">
                                    Time
                                </Typography>
                                <Typography className="font-bold text-6xl">
                                    {finmin < 10 ? "0" + finmin : finmin}:
                                    {finsec < 10 ? "0" + finsec : finsec}
                                </Typography>
                            </Box>
                        </Box>
                        <Box className="flex flex-row w-1/4 h-1/4 pt-5">
                            {!isSubmitted ? (
                                <Button
                                    className="bg-binus w-full h-full text-white font-bold rounded-lg"
                                    onClick={() => {
                                        if (name == "") {
                                            alert(
                                                "Anda perlu mengisi nama anda sebelum mengirim skor anda"
                                            );
                                            return;
                                        }
                                        toggleSubmit(true);
                                        submitData(
                                            chapter,
                                            name,
                                            points * 10,
                                            finalTime
                                        );
                                        getData2(loc.state.selectedChapter);
                                        console.log(
                                            chapter,
                                            name,
                                            points * 10,
                                            finalTime
                                        );
                                    }}
                                >
                                    Submit
                                </Button>
                            ) : (
                                <Link
                                    className="bg-binus w-full h-full text-white font-bold rounded-lg flex flex-col justify-center text-center"
                                    to="/kuis"
                                >
                                    Back
                                </Link>
                            )}
                        </Box>
                    </Box>
                    {isSubmitted ? (
                        <Box className="w-3/4 h-full flex flex-col justify-center items-center p-5">
                            <Box className="w-1/2 border-t-2 border-x-2 bg-binus border-binus rounded-t-2xl flex justify-center">
                                <Typography className="font-bold font-quantico text-center flex flex-col justify-center text-white">
                                    <Box>Papan Peringkat</Box>
                                </Typography>
                            </Box>
                            <Box className="w-full h-max">
                                <Box className=" w-full h-max bg-binus border-2 p-2 border-binus grid gap-y-1 grid-cols-2 rounded-2xl">
                                    {array2.map((score, i) => {
                                        return (
                                            <>
                                                <Typography className=" p-1 font-bold bg-white">
                                                    {i + 1} | {score.name}
                                                </Typography>
                                                <Typography className="text-right font-bold p-1 bg-white">
                                                    {score.score} |{" "}
                                                    {score.finishTime.slice(
                                                        3,
                                                        8
                                                    )}
                                                </Typography>
                                            </>
                                        );
                                    })}
                                </Box>
                            </Box>
                        </Box>
                    ) : null}
                </Box>
            )}
        </Navbar>
    );
};

export default Quiz;
