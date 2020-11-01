import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, userAddress, getAddress } from '../actions/userActions';


function ProfileScreen() {

    const { userInfo } = useSelector(state => state.userSignin)
    const { loading, shippingInfo, error } = useSelector(state => state.shippingInfo)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAddress(userInfo.name, userInfo.email))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (shippingInfo) {
            setStreet(shippingInfo.address.street)
            setCity(shippingInfo.address.city)
            setState(shippingInfo.address.state)
            setZipcode(shippingInfo.address.zipcode)
            setCountry(shippingInfo.address.country)
        }
        return () => {
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shippingInfo])

    const [name, setName] = useState(userInfo ? userInfo.name : "");
    const [email, setEmail] = useState(userInfo ? userInfo.email : "");
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [street, setStreet] = useState(shippingInfo ? shippingInfo.address.street : "");
    const [city, setCity] = useState(shippingInfo ? shippingInfo.address.city : "");
    const [state, setState] = useState(shippingInfo ? shippingInfo.address.state : "");
    const [zipcode, setZipcode] = useState(shippingInfo ? shippingInfo.address.zipcode : "");
    const [country, setCountry] = useState(shippingInfo ? shippingInfo.address.country : "");


    const submitHandler1 = (e) => {
        e.preventDefault();
        if (password === rePassword) {
            dispatch(updateUser(userInfo.name, userInfo.email, name, email, password));
            setPassword("")
            setRePassword("")
            editUserInfo(e, true)
        } else {
            alert('Passwords don\'t match')
        }
    }

    const submitHandler2 = (e) => {
        e.preventDefault();
        dispatch(userAddress(userInfo.name, userInfo.email, street, city, state, zipcode, country))
        editAddressInfo(e, true)
    }

    const editUserInfo = (e, state = false) => {
        e.preventDefault();
        document.querySelectorAll(".list1").forEach(element => {
            element.disabled = state;
        });;
        document.getElementById('update-button-1').disabled = state;
    }

    const editAddressInfo = (e, state = false) => {
        e.preventDefault();
        document.querySelectorAll(".list2").forEach(element => {
            element.disabled = state;
        });;
        document.getElementById('update-button-2').disabled = state;
    }

    return (
        loading ? <div>loading...</div> :
            error ? <div>Error has occured</div> :
                <div className="profile-container">

                    <div className="user-info">
                        <form onSubmit={submitHandler1} className="signin-form">
                            <ul className="form-list">

                                <li className="title">
                                    <h2>User Info</h2>
                                    <button type="button" onClick={editUserInfo} className="edit-button">
                                        <b>Edit</b>
                                    </button>
                                </li>

                                <li>
                                    <label htmlFor="name">User Name</label>
                                    <br></br>
                                    <input className="list1" value={name} disabled required type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                                </li>


                                <li>
                                    <label htmlFor="email">Email</label>
                                    <br></br>
                                    <input className="list1" value={email} disabled required type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                                </li>

                                <li>
                                    <label htmlFor="password">New Password</label>
                                    <br></br>
                                    <input className="list1" value={password} disabled required type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                                </li>

                                <li>
                                    <label htmlFor="rePassword">Re-Enter Password</label>
                                    <br></br>
                                    <input className="list1" value={rePassword} disabled required type="password" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)}></input>
                                </li>

                                <li>
                                    <button id="update-button-1" disabled type="submit" className="button">
                                        <b>Update</b>
                                    </button>
                                </li>


                            </ul>
                        </form>
                    </div>

                    <div className="address-info">
                        <form onSubmit={submitHandler2}>
                            <ul className="form-list">

                                <li className="title">
                                    <h2>Your Address</h2>
                                    <button onClick={editAddressInfo} type="button" className="edit-button">
                                        <b>Edit</b>
                                    </button>
                                </li>

                                <li>
                                    <label htmlFor="street">Street</label>
                                    <input className="list2" value={street} disabled type="text" id="street" name="street" onChange={(e) => setStreet(e.target.value)}></input>
                                </li>

                                <li>
                                    <label htmlFor="city">City</label>
                                    <input className="list2" value={city} disabled type="text" id="city" name="city" onChange={(e) => setCity(e.target.value)}></input>
                                </li>

                                <li>
                                    <label htmlFor="zipcode">Postal Code</label>
                                    <input className="list2" value={zipcode} disabled type="text" id="zipcode" name="zipcode" onChange={(e) => setZipcode(e.target.value)}></input>
                                </li>

                                <li>
                                    <label htmlFor="state">State</label>
                                    <input className="list2" value={state} disabled type="text" id="state" name="state" onChange={(e) => setState(e.target.value)}></input>
                                </li>

                                <li>
                                    <label htmlFor="country">Country</label>
                                    <input className="list2" value={country} disabled type="text" id="country" name="country" onChange={(e) => setCountry(e.target.value)}></input>
                                </li>

                                <li>
                                    <button id="update-button-2" disabled type="submit" className="button">
                                        <b>Update</b>
                                    </button>
                                </li>

                            </ul>
                        </form>
                    </div>
                </div>
    )
}

export default ProfileScreen;