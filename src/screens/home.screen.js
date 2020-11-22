import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import { todoSchema } from '../utils/validation';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	submit: {
		margin: theme.spacing(2, 1, 2),
		height: 55,
	},
}));

const API = `https://glacial-tundra-63153.herokuapp.com/api/todo`;
const email = 'jithtitan007@gmail.com';

function Home() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [error, setError] = React.useState('');
	const [todos, setTodos] = React.useState([]);

	const { register, handleSubmit, errors, reset } = useForm({
		mode: 'all',
		resolver: yupResolver(todoSchema),
	});

	const fetchTodo = React.useCallback(async () => {
		try {
			const response = await axios.get(`${API}/${email}`, {
				headers: { 'Content-Type': 'application/json' },
			});
			console.log(response.data.todos);
			setTodos(response.data.todos);
		} catch (error) {}
	}, []);

	React.useEffect(() => {
		fetchTodo();
	}, [fetchTodo]);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const handleToggle = (value) => async () => {
		try {
			await axios.patch(`${API}/`, {
				id: value,
				email,
			});

			setTodos(
				todos.map((todo) => {
					if (todo._id === value) {
						return { ...todo, ...{ complete: !todo.complete } };
					} else {
						return todo;
					}
				}),
			);
		} catch (error) {
			setOpen(true);
			setError(error.message);
		}
	};

	const handleDelete = (value) => async () => {
		try {
			await axios.delete(`${API}/${value}/${email}`);

			setTodos(todos.filter((todo) => todo._id !== value));
		} catch (error) {
			setOpen(true);
			setError(error.message);
		}
	};

	const onSubmit = async (data) => {
		try {
			const { todo } = data;

			const response = await axios.post(
				`${API}`,
				{
					email,
					todo,
				},
				{
					headers: { 'Content-Type': 'application/json' },
				},
			);

			setTodos(todos.concat(response.data.todo));
			reset();
		} catch (error) {
			setOpen(true);
			setError(error.message);
		}
	};

	return (
		<>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component='h1' variant='h5'>
						Todo List
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid container justify='center'>
							<Grid item>
								<TextField
									inputRef={register({ required: true })}
									error={!!errors.todo}
									helperText={errors.todo?.message}
									variant='outlined'
									margin='normal'
									id='todo'
									label='Add Todo'
									name='todo'
								/>
							</Grid>
							<Grid item>
								<Button
									type='submit'
									variant='contained'
									color='primary'
									className={classes.submit}
								>
									<AddIcon />
								</Button>
							</Grid>
						</Grid>
					</form>
					<List className={classes.root}>
						{todos.map((todo) => {
							const labelId = `checkbox-list-label-${todo['todo']}`;

							return (
								<ListItem
									key={todo['_id']}
									role={undefined}
									dense
									button
									onClick={handleToggle(todo['_id'])}
								>
									<ListItemIcon>
										<Checkbox
											edge='start'
											checked={todo['complete']}
											tabIndex={-1}
											inputProps={{ 'aria-labelledby': labelId }}
										/>
									</ListItemIcon>
									<ListItemText id={labelId} primary={`${todo['todo']}`} />
									<ListItemSecondaryAction>
										<IconButton
											edge='end'
											aria-label='delete-todo'
											onClick={handleDelete(todo['_id'])}
										>
											<DeleteIcon color='error' />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							);
						})}
					</List>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					open={open}
					autoHideDuration={3000}
					onClose={handleClose}
					message={error}
				/>
			</Container>
		</>
	);
}

export default Home;
