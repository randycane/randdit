import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import * as sessionActions from '../../store/session';

import "./auth.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const errors = []
    if(email.length < 1) errors.push("Please enter your email")
    if(password.length < 1) errors.push("Please enter your password")
    setErrors(errors)
},[email, password])

  const onLogin = async (e) => {
    e.preventDefault();
    setIsSubmitted(true)
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    else if (errors) {
      setErrors(errors)
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = (e) => {
    e.preventDefault()
    return dispatch(sessionActions.login("demo@aa.io", "password"))
}

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin} className="login">
      <div className="lincoln-logs"> Log In</div>
      {isSubmitted && (
        <div className="errors-top">
          {errors.map((error, index) => (
            <div className="error-text" key={index}>{error.split(":")[1]}</div>
          ))}
        </div>
      )}

      <div className='email-div'>
                <label className='email-label' htmlFor='email'>Email</label>
                <input
                    className='email-input'
                    name='email'
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={updateEmail}
                />
            </div>
            <div className='password-div'>
                <label htmlFor='password'>Password</label>
                <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={updatePassword}
                />
                <div></div>
                <button className={
                            isSubmitted && errors.length > 0 ? "negative" : "submit-button-login"
                        } type='submit'>Login Now</button>
                <div className="choice"> or you can: </div>
            <div className="demi">
                <button className='demo-button' onClick={demoLogin}>Login as Demo</button>
                </div>
            </div>
    </form>
  );
};

export default LoginForm;
