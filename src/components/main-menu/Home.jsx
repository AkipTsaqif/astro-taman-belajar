import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import SolarSystem from './background/SolarSystem';
import Login from '../auth/Login';

const Home = () => {
	const [isLoginClicked, setIsLoginClicked] = useState(false);

	return (
		<Box>
			<SolarSystem />
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					textAlign: 'center',
				}}
			>
				<Box
					sx={{
						width: '100vw',
						backgroundColor: 'rgba(44, 44, 44, 0.8)',
						padding: '16px',
						borderRadius: '4px',
					}}
				>
					<Typography variant='h2' sx={{ color: 'white', mt: '8px' }}>
						SELAMAT DATANG
					</Typography>
					<Typography variant='h4' sx={{ color: 'white' }}>
						di Media Pembelajaran Astronomi
					</Typography>
					<Box marginY='24px'>
						<Button
							variant='contained'
							sx={{ fontSize: '24px', mr: '8px', backgroundColor: '#5788AD' }}
							onClick={() => setIsLoginClicked(true)}
						>
							Masuk
						</Button>
						<Button
							variant='contained'
							sx={{ fontSize: '24px', ml: '8px', backgroundColor: '#5788AD' }}
						>
							Daftar
						</Button>
					</Box>

					{isLoginClicked ? <Login /> : null}
				</Box>
			</Box>
		</Box>
	);
};

export default Home;
