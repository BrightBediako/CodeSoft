import "./login.css";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../../redux/authSlice';

const Signin = () => {
	const dispatch = useDispatch();

	const [state, setState] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!state.email || !state.password) {
			setState({ ...state, error: 'All fields are required' });
			return;
		}
		setState({ ...state, error: '' });

		dispatch(
			signin({
				email: state.email,
				password: state.password,
			})
		);
	};

	return (
		<div className="login">
			<span className="loginTitle">Login</span>
			<form className="loginForm" onSubmit={handleSubmit}>
				<label>Email</label>
				<input
					className="loginInput"
					type='email'
					name='email'
					value={state.email}
					id=''
					placeholder='user@gmail.com'
					onChange={handleChange}
				/>
				<label>Password</label>
				<input
					className="loginInput"
					type='password'
					name='password'
					value={state.password}
					id=''
					placeholder='Enter your Password'
					onChange={handleChange}
				/>
				{state.error && <div className="error-message">{state.error}</div>}
				<button className="loginButton">Login</button>
			</form>
		</div>
	);
};

export default Signin;
