import { useState } from "react";
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

const Quiz = () => {
    const [selectedChapter, setSelectedChapter] = useState("");

    return (
        <Navbar>
            <Box className="flex-1 mr-4 mt-4 overflow-y-auto max-h-screen">
                <Typography className="mb-4 font-bold uppercase font-quantico text-3xl">
                    Kuis
                </Typography>
                <Box className="mx-auto flex flex-col items-center justify-center">
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
                            onChange={(e) => setSelectedChapter(e.target.value)}
                        >
                            <MenuItem value={1}>Materi 1</MenuItem>
                            <MenuItem value={2}>Materi 2</MenuItem>
                            <MenuItem value={3}>Materi 3</MenuItem>
                        </Select>
                    </FormControl>
                    <button class="rounded-lg bg-binus p-2 border-2 w-36 mt-4 border-binus">
                        <Typography className="font-bold font-quantico text-white">
                            Mulai
                        </Typography>
                    </button>
                    <Box className="w-1/5 px-8 py-1 border-t-2 border-x-2 border-binus rounded-t-2xl mt-12">
                        <Typography className="font-bold font-quantico text-center">
                            Daftar Skor Tinggi
                        </Typography>
                    </Box>
                    <Box className="w-3/4 border-2 p-4 border-binus grid gap-4 grid-cols-2">
                        <Typography>Nama</Typography>
                        <Typography className="text-right">Skor</Typography>
                        <Typography>Nama</Typography>
                        <Typography className="text-right">Skor</Typography>
                    </Box>
                </Box>
            </Box>
        </Navbar>
    );
};

export default Quiz;
