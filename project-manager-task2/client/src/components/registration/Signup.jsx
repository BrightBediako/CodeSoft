import "./register.css"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/authSlice';

const Signup = () => {
	const dispatch = useDispatch();
	const [state, setState] = useState({
		email: '',
		password: '',
		username: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!state.username || !state.email || !state.password) {
			setState({ ...state, error: 'All fields are required' });
			return;
		}
		setState({ ...state, error: '' });

		dispatch(
			register({
				username: state.username,
				password: state.password,
				email: state.email,
			})
		);
	};
	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<div className="register">
			<span className="registerTitle">Register</span>
			<form className="registerForm" onSubmit={handleSubmit}>
				<label>Name</label>
				<input
					className="registerInput"
					type='text'
					placeholder='Enter your username'
					name='username'
					value={state.username}
					onChange={handleChange}
				/>
				<label>Email</label>
				<input
					className="registerInput"
					type='email'
					name='email'
					value={state.email}
					id=''
					placeholder='Enter Email'
					onChange={handleChange}
				/>

				<label>Password</label>
				<input
					className="registerInput"
					type='password'
					name='password'
					value={state.password}
					id=''
					placeholder='Enter your password'
					onChange={handleChange}
				/>
				{state.error && <div className="error-message">{state.error}</div>}
				<button className="registerButton">Register</button>
			</form>
		</div>
	);
};

export default Signup;
