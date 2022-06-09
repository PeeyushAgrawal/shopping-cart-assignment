import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../reducers/UserReducer';
import { useState, useEffect } from 'react';

const Register = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [fields, setFields] = useState({
        firstName: '',
        firstNameError: null,
        lastName: '',
        lastNameError: null,
        email: '',
        emailError: null,
        password: '',
        passwordError: null,
        confirmPassword: '',
    });

    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    useEffect(() => {
        if (auth.status !== null && auth.error !== null) {
            
            dispatch(authActions.resetError());
        }

    }, [dispatch]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (fields.firstName === '')
            setFields((state) => ({...state, firstNameError: 'firstName is required',}));

        if (fields.lastName === '')
            setFields((state) => ({...state, lastNameError: 'lastName is required',}));

        if (fields.email === '') {
            setFields((state) => ({ ...state, emailError: 'Email is required' }));
        } else if (!fields.email.match(emailRegex)) {
            setFields((state) => ({...state, emailError: 'Email should be syntax of xxx@x.xxx',}));
        }

        if (fields.password === '') {
            setFields((state) => ({...state, passwordError: 'Password is required',}));
        } else if (!fields.password.match(passwordRegex)) {
            setFields((state) => ({...state, passwordError: 'Password should contain minimum eight characters with at least one letter, one number and one special character',}));
        } else if (fields.password !== fields.confirmPassword) {
            setFields((state) => ({...state, passwordError: 'Password and ConfirmPassword should match.',}));
        }

        if (
            fields.firstName.length !== 0 &&
            fields.lastName.length !== 0 &&
            fields.email.match(emailRegex) &&
            fields.password.match(passwordRegex) &&
            fields.password === fields.confirmPassword
        ) {
            const credentials = {
                firstName: fields.firstName,
                lastName: fields.lastName,
                email: fields.email,
                password: fields.password,
            };
            setFields((state) => ({
                ...state, 
                firstNameError: null, 
                lastNameError: null,
                emailError: null,
                passwordError: null,
            }));
            dispatch(authActions.registerUser(credentials));
            console.log(credentials);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFields((state) => ({ ...state, [name]: value }));
    };

  return (
    <div className='register'>
      <div className='container-lg'>
        <div className='row registerBlock'>
            <div className='signupText col-md-6'>
                <h2>Signup</h2>
                <div>We do not share your personal details with anyone.</div>
            </div>
            <div className='signupFormBlock col-md-6'>
            <form onSubmit={handleSubmit} className='col-md-8'>
                <div className="textfield">
                    <input type='text' name='firstName' placeholder=' ' required onChange={handleChange} aria-labelledby='lfirstName' />
                    <label id='lfirstName'>First Name</label>
                    {fields.firstNameError && <small className='errorText'>{fields.firstNameError}</small>}
                </div>
                <div className="textfield">
                    <input type='text' name='lastName' placeholder=' ' required onChange={handleChange} aria-labelledby='llastName'/>
                    <label id='llastName'>Last Name</label>
                    {fields.lastNameError && <small className='errorText'>{fields.lastNameError}</small>}
                </div>
                <div className="textfield">
                    <input type='email' name='email' placeholder=' ' required onChange={handleChange} aria-labelledby='lemail'/>
                    <label id='lemail'>Email</label>
                    {fields.emailError && <small className='errorText'>{fields.emailError}</small>}
                </div>
                <div className="textfield">
                    <input type='password' name='password' placeholder=' ' required onChange={handleChange} aria-labelledby='lpassword'/>
                    <label id='lpassword'>Password</label>
                    {fields.passwordError && <small className='errorText'>{fields.passwordError}</small>}
                </div>
                <div className="textfield">
                    <input type='password' name='confirmPassword' placeholder=' ' required onChange={handleChange} aria-labelledby='lconfirmPassword'/>
                    <label id='lconfirmPassword'>Confirm Password</label>
                    {fields.confirmPasswordError && <small className='errorText'>{fields.confirmPasswordError}</small>}
                </div>
                <button type='submit' className='registerButton button button-primary'>Signup</button>
            </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Register