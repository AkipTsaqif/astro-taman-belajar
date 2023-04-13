import { Box, Button, TextField, Typography } from '@mui/material';

const Login = () => {
	return (
		<Box display='flex' flexDirection='column' alignItems='center'>
			<Box>
				<Typography sx={{ fontWeight: 'bold', color: 'white' }}>Username: </Typography>
				<TextField
					label='Username'
					variant='outlined'
					sx={{ marginBottom: '8px', backgroundColor: 'white' }}
				/>
			</Box>
			<Box>
				<Typography sx={{ fontWeight: 'bold', color: 'white' }}>Password: </Typography>
				<TextField
					label='Password'
					type='password'
					variant='outlined'
					sx={{ marginBottom: '16px', backgroundColor: 'white' }}
				/>
			</Box>
			<Button variant='contained'>Log In</Button>
		</Box>
	);
};

export default Login;
