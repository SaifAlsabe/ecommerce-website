import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { paymentMethod } from '../actions/userActions';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen(props) {

    const [payment, setPayment] = useState("");

    const dispatch = useDispatch()


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(paymentMethod(payment))
        props.history.push('/summary');

    }

    return (
        <>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className="form-container">
                <form onSubmit={submitHandler}>
                    <ul className="form-list">
                        <li>
                            <h2>Payment</h2>
                        </li>

                        <li>
                            <div className="payment">
                                <input required type="radio" name="payment-method" id="payment-method" value="Paypal" onChange={(e) => setPayment(e.target.value)}></input>
                                <label htmlFor="payment-method"><b>Paypal</b></label>
                            </div>
                        </li>

                        <li>
                            <button type="submit" className="button">
                                <b>Continue</b>
                            </button>
                        </li>
                    </ul>
                </form >
            </div>
        </>
    )

}

export default PaymentScreen;