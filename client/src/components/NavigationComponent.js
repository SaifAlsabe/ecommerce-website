import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookie from 'js-cookie';



function NavigationComponent(props) {

    // open sidebar 
    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open")
    }


    const { userInfo } = useSelector(state => state.userSignin);

    const signout = () => {
        Cookie.remove("userInfo");
        Cookie.remove("shippingInfo");
        props.history.push('/');
        window.location.reload();
    }

    return (

        <>
            <div className="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                <Link to="/">CARBON</Link>
            </div>

            <div className="header-links">

                <div className="cart-link">
                    <Link to="/cart">Cart</Link>
                </div>
                {userInfo ?
                    <div className="navigation-dropdown">
                        <button className="navigation-button">{userInfo.name}</button>
                        <ul>
                            {userInfo.isAdmin? <li><Link to="/admin">Admin</Link></li> : <></>}
                            <li><Link to="/profile">My Profile</Link></li>
                            <li><button onClick={signout} className="signout-button">Sign out</button></li>
                        </ul>
                    </div>

                    :
                    <div className="cart-link">
                        <Link to="/signin">Sign In</Link>
                    </div>

                }

            </div>
        </>
    )
}

export default NavigationComponent;

