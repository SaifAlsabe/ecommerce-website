import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';


function HomeScreen(props) {

    const category = props.match.params.id ? props.match.params.id : ''
    const { products, loading, error } = useSelector(state => state.productList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts(category));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])




    return (
        loading ? <div>Loading...</div> :
            error ? <div>{error}</div> :
                <ul className="products">
                    {
                        products.map(product => (
                            <li key={product._id}>
                                <div className="product">
                                    <Link to={'/products/' + product._id}>
                                        <img className="product-image" src={product.image} alt="product" />
                                    </Link>
                                    <div className="product-name">
                                        <Link to={'/products/' + product._id}>{product.name}</Link>
                                    </div>
                                    <div className="product-brand">{product.brand}</div>
                                    <div className="product-price">${product.price}</div>
                                    <div className="product-rating">
                                        {/* add rating stars */}
                                        {[...Array(Math.floor(product.rating))].map((i) =>
                                            <span style={{ color: "orange" }} className="fa fa-star"></span>
                                        )}
                                        {product.rating % 1 === 0 ? <></> :
                                            Math.ceil(product.rating) - Math.floor(product.rating) >= 0.5 ? <>
                                                <span style={{ color: "orange" }} className="fa fa-star-half half-full">
                                                    <span style={{ transform: "scaleX(-1)" }} className="fa fa-star-half half-empty"></span>
                                                </span>
                                            </>
                                                :
                                                <span className="fa fa-star"></span>
                                        }
                                        {[...Array(5 - Math.ceil(product.rating))].map((i) =>
                                            <span className="fa fa-star"></span>
                                        )}
                                        &nbsp;
                                        ({product.numReviews} reviews)
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
    );
}

export default HomeScreen;