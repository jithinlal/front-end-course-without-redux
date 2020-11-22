import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseLine from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Copyright from '../components/Copyright';
import { registerSchema } from '../utils/validation';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function Register() {
	const classes = useStyles();
	const { register, handleSubmit, errors } = useForm({
		mode: 'all',
		resolver: yupResolver(registerSchema),
	});
	const [open, setOpen] = React.useState(false);
	const [error, setError] = React.useState('');

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API}`,
				{
					email: data.email,
					password: data.password,
					returnSecureToken: true,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);

			console.log(response.data);
		} catch (error) {
			console.log('Error:', error);
			setOpen(true);
			setError('Email or password is required.');
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseLine />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Register
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
					<TextField
						inputRef={register({ required: true })}
						name='email'
						id='email'
						label='Email Address'
						autoComplete='email'
						autoFocus
						required
						margin='normal'
						variant='outlined'
						fullWidth
						error={!!errors.email}
						helperText={errors.email?.message}
					/>
					<TextField
						inputRef={register({ required: true })}
						name='password'
						id='password'
						type='password'
						label='Password'
						required
						fullWidth
						margin='normal'
						variant='outlined'
						error={!!errors.password}
						helperText={errors.password?.message}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						Register
					</Button>
					<Grid container justify='center'>
						<Grid item>
							<Link to='/login'>Already have an account? Sign In</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				message={error}
			/>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}

export default Register;
