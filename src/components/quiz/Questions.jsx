import { Box, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import _ from "lodash";
import CountdownTimer from "../../shared-components/CountdownTimer";
import { Link } from "react-router-dom";

const Questions = ({ questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedChoices, setSelectedChoices] = useState({});
    const [currQuestionId, setCurrQuestionId] = useState();
    const [isTimeUp, setTimeUp] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [finalTime, setFinalTime] = useState(0);

    const [showScore, setShowScore] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    let correctAnswers = [];

    console.log(questions);

    useEffect(() => console.log(selectedChoices), [selectedChoices]);
    useEffect(
        () => console.log(selectedChoices[currQuestionId]),
        [selectedChoices]
    );

    useEffect(() => {
        console.log(questions[currentQuestionIndex].choices);
        console.log(questions);
    }, [questions]);

    useEffect(() => {
        let c = _.find(questions[currentQuestionIndex].choices, {
            choiceId: selectedChoices[currQuestionId],
        });

        console.log(c);

        if (c) {
            if (c === questions[currentQuestionIndex].answer)
                correctAnswers.push(true);
            else correctAnswers.push(false);
        }
    }, [selectedChoices]);

    const disableRadio = (c) => {
        if (!isTimeUp) {
            if (selectedChoices[currentQuestion.questionId] === c)
                return "border-blue-500";
            else return "border-gray-500";
        } else return "border-gray-500 opacity-50";
    };

    function timeout(delay) {
        return new Promise((res) => setTimeout(res, delay));
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        let t = _.filter(correctAnswers, Boolean).length;
        setFinalScore(t);
        setShowScore(true);
    };

    const scoreText = () => {
        if (finalScore <= 6) return "Sayang sekali! Silahkan belajar kembali";
        if (finalScore > 6 && finalScore <= 8)
            return "Sedikit lagi bisa sempurna!";
        if (finalScore > 8)
            return "Selamat! Kamu telah mendapat skor luar biasa!";
    };

    const formatTime = (seconds) => {
        console.log(seconds);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <Box className="flex flex-col items-center h-screen p-6">
            {showScore && isSubmitted ? (
                <Box className="flex flex-col items-center border-2 pt-6 px-6 border-gray-500">
                    <Typography className="text-white font-quantico">
                        Kuis telah selesai! Skormu adalah
                    </Typography>
                    <Typography className="text-white text-2xl my-2 font-bold font-quantico">
                        {finalScore} / {questions.length}
                    </Typography>
                    <Typography className="text-white font-quantico">
                        dan ditempu dalam waktu
                    </Typography>
                    <Typography className="text-white text-2xl my-2 font-bold font-quantico">
                        {formatTime(finalTime)}
                    </Typography>
                    <Typography className="text-white font-quantico">
                        {scoreText()}
                    </Typography>
                    <Link
                        to="/kuis"
                        class="my-6 rounded-lg bg-transparent p-4 border-2 border-gray-500"
                    >
                        <Typography className="font-bold font-quantico text-white text-center">
                            Kembali ke Pemilihan Kuis
                        </Typography>
                    </Link>
                </Box>
            ) : (
                <>
                    <Typography className="font-bold mb-4 font-quantico text-xl text-white text-center">
                        Soal Nomor {currentQuestionIndex + 1}
                    </Typography>
                    <Box className="w-full h-2/3">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <Box className="flex justify-center w-full border-2 border-gray-500 p-12">
                                <Typography className="w-1/2 text-center font-quantico text-white">
                                    {currentQuestion.question}
                                </Typography>
                            </Box>
                            <Box className="grid grid-cols-2 gap-4 mt-8">
                                {currentQuestion.choices.map((choice, i) => (
                                    <label
                                        key={choice}
                                        className={`flex items-center ${
                                            isTimeUp
                                                ? "cursor-default"
                                                : "cursor-pointer"
                                        } border-2 p-6 ${disableRadio(choice)}`}
                                    >
                                        <input
                                            className="hidden"
                                            type="radio"
                                            disabled={isTimeUp}
                                            name={`question-${currentQuestion.questionId}`}
                                            value={choice}
                                            checked={
                                                selectedChoices[
                                                    currentQuestion.questionId
                                                ] === choice
                                            }
                                            onChange={() => {
                                                setCurrQuestionId(
                                                    currentQuestion.questionId
                                                );
                                                setSelectedChoices((prev) => ({
                                                    ...prev,
                                                    [currentQuestion.questionId]:
                                                        choice,
                                                }));
                                            }}
                                        />
                                        {currentQuestion.type === "media" ? (
                                            <img
                                                className="mx-auto"
                                                src={`/${choice}`}
                                                width="80px"
                                            />
                                        ) : (
                                            <Typography className="font-quantico text-white">
                                                {String.fromCharCode(65 + i)}.{" "}
                                                {choice}
                                            </Typography>
                                        )}
                                    </label>
                                ))}
                            </Box>
                            <Box className="w-full flex justify-between mt-6 items-center">
                                <Box className="w-1/2 ml-8">
                                    {console.log(isSubmitted)}
                                    <CountdownTimer
                                        timeUp={() => setTimeUp(true)}
                                        isSubmitted={isSubmitted}
                                        finalTime={(time) => setFinalTime(time)}
                                    />
                                </Box>
                                {isTimeUp ||
                                currentQuestionIndex ===
                                    questions.length - 1 ? (
                                    <button
                                        disabled={isSubmitted}
                                        className="disabled:opacity-50 w-1/4 rounded-lg bg-transparent p-2 border-2 border-gray-500"
                                        type="submit"
                                    >
                                        <Typography className="text-white font-quantico">
                                            Selesai
                                        </Typography>
                                    </button>
                                ) : (
                                    <Box className="flex justify-end w-1/2 gap-6">
                                        {/* <button
                                    type="button"
                                    disabled={currentQuestionIndex === 0}
                                    className="disabled:opacity-50 w-1/3 rounded-lg bg-transparent p-2 border-2 border-gray-500"
                                    onClick={() =>
                                        currentQuestionIndex > 0
                                            ? setCurrentQuestionIndex(
                                                  currentQuestionIndex - 1
                                              )
                                            : null
                                    }
                                >
                                    <Typography className="text-white font-quantico">
                                        Soal Sebelumnya
                                    </Typography>
                                </button> */}
                                        <Tooltip
                                            placement="bottom"
                                            title={
                                                !selectedChoices[
                                                    currentQuestion.questionId
                                                ] ? (
                                                    <Typography className="text-white font-quantico text-sm">
                                                        Silahkan pilih jawaban
                                                        terlebih dahulu
                                                    </Typography>
                                                ) : (
                                                    ""
                                                )
                                            }
                                            enterDelay={300}
                                            leaveDelay={100}
                                        >
                                            <button
                                                type="button"
                                                disabled={
                                                    !selectedChoices[
                                                        currentQuestion
                                                            .questionId
                                                    ]
                                                }
                                                className="disabled:opacity-50 w-1/2 rounded-lg bg-transparent p-2 border-2 border-gray-500"
                                                onClick={() =>
                                                    currentQuestionIndex <
                                                    questions.length - 1
                                                        ? setCurrentQuestionIndex(
                                                              currentQuestionIndex +
                                                                  1
                                                          )
                                                        : null
                                                }
                                            >
                                                <Typography className="text-white font-quantico">
                                                    Soal Berikutnya
                                                </Typography>
                                            </button>
                                        </Tooltip>
                                    </Box>
                                )}
                            </Box>
                        </form>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Questions;
