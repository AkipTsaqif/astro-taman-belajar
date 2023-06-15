import { Box, Typography } from "@mui/material";
import _ from "lodash";
import Eccentricity from "../animations/Eccentricity";
import SolarSystem from "../animations/SolarSystem";
import Navbar from "../../shared-components/Navbar";
import AnimationPane from "../../shared-components/AnimationPane";

const chapters = [
    {
        id: "sun",
        title: "Matahari",
        paragraphs: [
            {
                paragraph:
                    "Matahari merupakan bintang yang terdekat dengan Bumi dan sekaligus merupakan pusat tata surya. Sinar matahari menempuh waktu selama 8 menit untuk sampai ke Bumi",
            },
            {
                paragraph:
                    "Dalam inti matahari terjadi reaksi fusi nuklir yang merubah hidrogen menjadi Helium. Energi yang dipancarkan oleh matahari merupakan pusat sumber energi di tata surya.",
            },
        ],
    },
    {
        id: "mercury",
        title: "Merkurius",
        paragraphs: [
            {
                paragraph:
                    "Merkurius adalah planet terdekat dengan Matahari dan merupakan planet terkecil di tata surya. Permukaan Merkurius memiliki suhu yang ekstrem, dengan suhu siang hari mencapai sekitar 430 derajat Celsius dan suhu malam hari turun hingga sekitar -180 derajat Celsius.",
            },
            {
                paragraph:
                    "Merkurius memiliki medan magnet yang lemah, sekitar 1% dari medan magnet Bumi. Planet ini juga tidak memiliki atmosfer yang signifikan, sehingga terpapar langsung oleh radiasi matahari.",
            },
        ],
    },
    {
        id: "venus",
        title: "Venus",
        paragraphs: [
            {
                paragraph:
                    "Venus merupakan planet terpanas di tata surya dengan suhu permukaan rata-rata sekitar 470 derajat Celsius. Planet ini memiliki atmosfer tebal yang terutama terdiri dari karbon dioksida, dengan tekanan atmosfer yang sangat tinggi.",
            },
            {
                paragraph:
                    "Venus juga dikenal sebagai 'planet kembar' Bumi karena memiliki ukuran dan massa yang hampir serupa dengan Bumi. Namun, kondisi permukaan Venus tidak mendukung kehidupan seperti di Bumi karena atmosfernya yang beracun dan suhu yang ekstrem.",
            },
        ],
    },
    {
        id: "earth",
        title: "Bumi",
        paragraphs: [
            {
                paragraph:
                    "Bumi adalah planet ketiga dari Matahari dan merupakan satu-satunya planet yang diketahui memiliki kehidupan. Planet ini memiliki atmosfer yang mendukung kehidupan dan banyak variasi ekosistem yang menghuni permukaannya.",
            },
            {
                paragraph:
                    "Bumi juga memiliki satu satelit alami, yaitu Bulan, yang menjadi objek terbesar di langit malam Bumi dan memiliki pengaruh penting terhadap pasang surut di lautan.",
            },
        ],
    },
    {
        id: "mars",
        title: "Mars",
        paragraphs: [
            {
                paragraph:
                    "Mars adalah planet keempat dari Matahari dan dikenal sebagai 'Planet Merah' karena warna permukaannya yang kemerahan. Planet ini memiliki dua belahan kutub yang terdiri dari es dan salju karbon dioksida.",
            },
            {
                paragraph:
                    "Mars juga memiliki gunung tertinggi di tata surya, yaitu Gunung Olympus Mons, yang merupakan gunung berapi terbesar dan tertinggi. Selain itu, Mars juga memiliki lembah yang sangat dalam, yaitu Valles Marineris, yang merupakan lembah terbesar di tata surya.",
            },
        ],
    },
    {
        id: "jupiter",
        title: "Yupiter",
        paragraphs: [
            {
                paragraph:
                    "Yupiter adalah planet terbesar di tata surya dengan massa lebih dari dua kali lipat dari total massa planet lainnya. Planet ini memiliki sistem cincin yang tipis dan terdiri dari gas yang dominan adalah hidrogen dan helium.",
            },
            {
                paragraph:
                    "Yupiter juga memiliki Badai Merah Besar, sebuah sistem badai yang telah berlangsung selama berabad-abad dan memiliki ukuran yang lebih besar daripada Bumi. Planet ini juga memiliki banyak satelit alami, termasuk empat satelit terbesar yang dikenal sebagai Galilean moons.",
            },
        ],
    },
    {
        id: "saturn",
        title: "Saturnus",
        paragraphs: [
            {
                paragraph:
                    "Saturnus adalah planet kedua terbesar di tata surya setelah Yupiter. Planet ini dikenal dengan sistem cincinnya yang spektakuler, yang terdiri dari berbagai partikel es dan debu.",
            },
            {
                paragraph:
                    "Saturnus memiliki lebih dari 80 satelit alami yang telah diidentifikasi. Salah satu satelitnya, yaitu Titan, memiliki atmosfer yang lebih tebal daripada Bumi dan merupakan satu-satunya satelit di tata surya yang memiliki atmosfer yang signifikan.",
            },
        ],
    },
    {
        id: "uranus",
        title: "Uranus",
        paragraphs: [
            {
                paragraph:
                    "Uranus adalah planet ketujuh dari Matahari dan memiliki keunikan dalam tata surya karena sumbu rotasinya hampir sejajar dengan bidang orbitnya. Akibatnya, planet ini mengalami musim yang sangat ekstrem dan terdapat periode di mana salah satu kutubnya terpapar sinar matahari selama 42 tahun.",
            },
            {
                paragraph:
                    "Uranus juga memiliki atmosfer yang terdiri dari hidrogen, helium, dan sedikit metana. Warna biru khas Uranus disebabkan oleh gas metana di atmosfer yang menyerap warna merah.",
            },
        ],
    },
    {
        id: "neptune",
        title: "Neptunus",
        paragraphs: [
            {
                paragraph:
                    "Neptunus adalah planet terjauh dari Matahari dan merupakan planet terbesar keempat di tata surya. Planet ini juga dikenal dengan warna birunya yang khas, yang disebabkan oleh adanya metana di atmosfer.",
            },
            {
                paragraph:
                    "Neptunus memiliki kecepatan angin terkuat di tata surya, dengan kecepatan mencapai 2.100 kilometer per jam. Planet ini juga memiliki sistem cincin yang tipis, serupa dengan Saturnus, meskipun tidak sejelas cincin Saturnus.",
            },
        ],
    },
];

const Chapter = ({ subject, isSun }) => {
    const getSubject = _.find(chapters, {
        id: isSun ? subject.id : subject.id.replace("-orbit", ""),
    });

    return (
        <>
            <Box className="flex-1 mr-4 overflow-y-auto max-h-screen p-4">
                <Typography className="mb-4 font-bold font-quantico text-3xl  text-white">
                    {getSubject.title}
                </Typography>
                <Box>
                    {getSubject.paragraphs.map((par) => (
                        <Typography className="text-white font-quantico mb-4 text-justify indent-12">
                            {par.paragraph}
                        </Typography>
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default Chapter;
