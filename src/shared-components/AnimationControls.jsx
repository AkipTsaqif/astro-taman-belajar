import { Box, IconButton } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const AnimationControls = (props) => {
    return (
        <Box className="flex w-full justify-between">
            {props?.isPlay ? (
                <IconButton onClick={props.onControlClick}>
                    <PauseCircleOutlineIcon />
                </IconButton>
            ) : (
                <IconButton onClick={props.onControlClick}>
                    <PlayCircleOutlineIcon />
                </IconButton>
            )}
            <Box className="">
                <IconButton onClick={props.onFullscreenClick}>
                    <FullscreenIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default AnimationControls;
