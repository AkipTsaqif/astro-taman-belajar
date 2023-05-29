import { Box, Typography } from "@mui/material";

const AnimationPane = (props) => {
    return (
        <Box className="mx-4 w-60">
            <Typography className="mb-4 font-bold font-quantico text-xl text-center">
                Visualisasi Materi
            </Typography>
            {props.kind}
        </Box>
    );
};

export default AnimationPane;
