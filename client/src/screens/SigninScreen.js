import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin, getAddress } from '../actions/userActions';



function SigninScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loading, userInfo, error } = useSelector(state => state.userSignin)

    useEffect(() => {
        if (userInfo) {
            dispatch(getAddress(userInfo.name, userInfo.email))
            props.history.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password))
    }


    return (
        <div className="form-container">
            <form onSubmit={submitHandler} className="signin-form">
                <ul className="form-list">

                    <li>
                        <h2>Sign-In</h2>
                    </li>

                    {loading ? <div>Loading...</div> : <></>}
                    {error ? <div>Invalid email or password</div> : <></>}

                    <li>
                        <label htmlFor="email">Email:</label>
                        <br></br>
                        <input required type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                    </li>

                    <li>
                        <label htmlFor="password">Password:</label>
                        <br></br>
                        <input required type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                    </li>

                    <li>
                        <button type="submit" className="button">
                            <b>Signin</b>
                        </button>
                    </li>

                    <li className="create-account">
                        <p>New to CARBON?</p>
                        <a href="/register">Create Account</a>
                    </li>


                </ul>
            </form>

        </div>
    )


}

export default SigninScreen;