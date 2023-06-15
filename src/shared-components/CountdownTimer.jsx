import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const CountdownTimer = ({ timeUp, isSubmitted, finalTime }) => {
    const [timeRemaining, setTimeRemaining] = useState(30);

    useEffect(() => console.log(isSubmitted), [isSubmitted]);

    useEffect(() => {
        let timer;

        if (!isSubmitted) {
            timer = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (prevTime <= 0) {
                        return 0;
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isSubmitted]);

    useEffect(() => {
        if (timeRemaining === 0) {
            // Call the onTimerEnd callback when timer ends
            timeUp();
        }
        let elapsedTime = 30 - timeRemaining;
        finalTime(elapsedTime);
    }, [timeRemaining, timeUp]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <Typography className="text-white font-quantico text-lg font-bold">
            Sisa Waktu: {formatTime(timeRemaining)}
        </Typography>
    );
};

export default CountdownTimer;
