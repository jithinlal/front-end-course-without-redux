import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

function TestForm() {
	const classes = useStyles();
	const [name, setName] = React.useState('');
	const [error, setError] = React.useState('');

	const onSubmit = () => {
		if (name.length < 5) {
			setError('Name should not be less than 5 characters in length.');
			return;
		}

		console.log(name);
		setError('');
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseLine />
			<div className={classes.paper}>
				<p>Test Form</p>
				<form>
					<input
						placeholder='Name'
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
					<button type='button' onClick={onSubmit}>
						Submit
					</button>
				</form>

				<p>Name: {name}</p>
				{error && <span>Error: {error}</span>}
			</div>
		</Container>
	);
}

export default TestForm;
