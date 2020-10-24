import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import AdminScreen from './screens/AdminScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import SummaryScreen from './screens/SummaryScreen';

import NavigationComponent from './components/NavigationComponent'


function App() {

  //close sidebar 
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <BrowserRouter>
      <div className="grid-container">

        <header className="header">
          <Route path="/" component={NavigationComponent} />
        </header>


        <main className="main">
          <div className="content">
            <Route path="/" exact component={HomeScreen} />
            <Route path="/category/:id" exact component={HomeScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/products/:id" component={ProductScreen} />
            <Route path="/signin" exact component={SigninScreen} />
            <Route path="/register" exact component={RegisterScreen} />
            <Route path="/admin" exact component={AdminScreen} />
            <Route path="/profile" exact component={ProfileScreen} />
            <Route path="/shipping" exact component={ShippingScreen} />
            <Route path="/payment" exact component={PaymentScreen} />
            <Route path="/summary" exact component={SummaryScreen} />
          </div>
        </main>


        <aside className="sidebar">
          <h3 id="Shopping-Categories">Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul className="shopping-category-list">
            <li>
              <Link to='/category/pants'>Pants</Link>
            </li>
            <li>
              <Link to='/category/shirts'>Shirts</Link>
            </li>
            <li>
              <Link to='/category/shoes'>Shoes</Link>
            </li>
            <li>
              <Link to='/category/jackets'>Jackets</Link>
            </li>
          </ul>
        </aside>


        <footer className="footer">
            Copyright &copy; 2020. All rights reserved
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;

