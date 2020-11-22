import * as yup from 'yup';

export const loginSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

export const registerSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

export const todoSchema = yup.object().shape({
	todo: yup.string().required(),
});
