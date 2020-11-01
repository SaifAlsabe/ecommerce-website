import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';


function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const {loading, userInfo, error} = useSelector(state => state.userSignin)

    useEffect(() => {
        if(userInfo){
            props.history.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])

    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        if(password === rePassword){
            dispatch(register(name, email, password))
        } else{
            alert("passwords don't match")
        }

        
    }


    return (
        <div className="form-container">
            <form onSubmit={submitHandler} className="signin-form">
                <ul className="form-list">

                    <li>
                        <h2>Create Account</h2>
                    </li>

                    {loading? <div>Loading...</div>:<></>}
                    {error? <div>Error has occured</div>: <></>}

                    <li>
                        <label htmlFor="name">Name:</label>
                        <br></br>
                        <input required type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                    </li>

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
                        <label htmlFor="rePassword">Re-Enter Password:</label>
                        <br></br>
                        <input required type="password" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)}></input>
                    </li>

                    <li>
                        <button type="submit" className="button">
                            <b>Create Account</b>
                        </button>
                    </li>

                    <li className="create-account">
                        <p>Already have an account?</p>
                        <a href="/signin">Signin</a>
                    </li>


                </ul>
            </form>

        </div>
    )


}

export default RegisterScreen;