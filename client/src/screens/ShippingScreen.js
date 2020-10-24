import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shipping } from '../actions/userActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen(props) {


    const { shippingInfo } = useSelector(state => state.shippingInfo)

    const dispatch = useDispatch()


    const [street, setStreet] = useState(shippingInfo ? shippingInfo.address.street : '');
    const [city, setCity] = useState(shippingInfo ? shippingInfo.address.city : '');
    const [state, setState] = useState(shippingInfo ? shippingInfo.address.state : '');
    const [zipcode, setZipcode] = useState(shippingInfo ? shippingInfo.address.zipcode : '');
    const [country, setCountry] = useState(shippingInfo ? shippingInfo.address.country : '')

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(shipping(street, city, state, zipcode, country))
        props.history.push('/payment');

    }


    return (
        <div>

            <CheckoutSteps step1 step2></CheckoutSteps>

            <div className="form-container">
                <form onSubmit={submitHandler}>
                    <ul className="form-list">
                        <li>
                            <h2>Shipping</h2>
                        </li>

                        <li>
                            <label htmlFor="street">Street</label>
                            <input required value={street} type="text" id="street" name="street" onChange={(e) => setStreet(e.target.value)}></input>
                        </li>

                        <li>
                            <label htmlFor="city">City</label>
                            <input required value={city} type="text" id="city" name="city" onChange={(e) => setCity(e.target.value)}></input>
                        </li>

                        <li>
                            <label htmlFor="zipcode">Postal Code</label>
                            <input required value={zipcode} type="text" id="zipcode" name="zipcode" onChange={(e) => setZipcode(e.target.value)}></input>
                        </li>

                        <li>
                            <label htmlFor="state">State</label>
                            <input required value={state} type="text" id="state" name="state" onChange={(e) => setState(e.target.value)}></input>
                        </li>

                        <li>
                            <label htmlFor="country">Country</label>
                            <input required value={country} type="text" id="country" name="country" onChange={(e) => setCountry(e.target.value)}></input>
                        </li>

                        <li>
                            <button type="submit" className="button">
                                <b>Continue</b>
                            </button>
                        </li>

                    </ul>
                </form>
            </div>
        </div>
    )

}

export default ShippingScreen;