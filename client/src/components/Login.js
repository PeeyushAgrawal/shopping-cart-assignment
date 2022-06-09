import React from 'react';
import { authActions } from '../reducers/UserReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Login = () => {
    const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (auth.status !== null && auth.error !== null)
			dispatch(authActions.resetError());
	}, [dispatch]);

    const [fields, setFields] = useState({
		email: '',
		emailError: null,
		password: '',
		passwordError: null,
	});
	const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFields((state) => ({ ...state, [name]: value }));
	};

    const handleSubmit = (event) => {
		event.preventDefault();

		if (fields.email === '') {
			setFields((state) => ({ ...state, emailError: 'Email is required' }));
		} else if (!fields.email.match(emailRegex)) {
			setFields((state) => ({...state, emailError: 'Email should be syntax of example@domain.com'}));
		}

		if (fields.password === '') {
			setFields((state) => ({...state, passwordError: 'Password is required'}));
		} else if (!fields.password.match(passwordRegex)) {
			setFields((state) => ({...state, passwordError: 'Password should contain minimum eight characters with at least one letter, one number and one special character'}));
		}

		if (
			fields.email.match(emailRegex) &&
			fields.password.match(passwordRegex)
		) {
			const credentials = { email: fields.email, password: fields.password };
			setFields((state) => ({...state, emailError: null, passwordError: null}));
			dispatch(authActions.loginUser(credentials));
			console.log(credentials, auth);
		}
	};

    return (
        <div className='login'>
            <div className='container-lg'>
                <div className='row loginFormBlock'>
                    <div className='loginDesc col-md-6'>
                        <h2>Login</h2>
                        <div>Get access to your Orders. Wishlist and Recommendations</div>
                    </div>
                    <div className='loginFormBlock col-md-6'>
                        <form onSubmit={handleSubmit} className='col-md-8'>
                            <div className="textfield">
                                <input type='email' aria-labelledby='lemail' name='email' placeholder=' ' required onChange={handleChange}/>
                                <label id='lemail'>Email</label>
                                {fields.emailError && <small>{fields.emailError}</small>}
                            </div>
                            <div className="textfield">
                                <input type='password' aria-labelledby='lpassword' id='password' name='password' placeholder=' ' required onChange={handleChange}/>
                                <label id='lpassword'>Password</label>
                                {fields.passwordError && <small>{fields.passwordError}</small>}
                            </div>
                            <button type='submit' className='loginButton button button-primary'>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;