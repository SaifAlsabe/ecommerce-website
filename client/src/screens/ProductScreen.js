import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {

    const [qty, setQty] = useState(1);
    const { product, loading, error } = useSelector(state => state.productDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }

    return (
        loading ? <div>Loading...</div> :
            error ? <div>{error}</div> :
                !product.rating ? <div>loading...</div> :


                    <div>

                        <div className="back-to-results">
                            <Link to="/">Back to results</Link>
                        </div>

                        <div className="details">

                            <div className="details-image">
                                <img src={product.image} alt="product"></img>
                            </div>

                            <div className="details-info">
                                <ul>
                                    <li>
                                        <h2>{product.name}</h2>
                                    </li>
                                    <li>
                                        <strong>{product.rating}</strong>
                                        &nbsp;
                                        {[...Array(Math.floor(product.rating))].map((i) =>
                                            <span style={{ color: "orange" }} className="fa fa-star"></span>)}


                                        {product.rating % 1 === 0 ? <></> :
                                            product.rating - Math.floor(product.rating) >= 0.5 ?
                                                <span style={{ color: "orange" }} className="fa fa-star-half half-full">
                                                    <span style={{ transform: "scaleX(-1)" }} className="fa fa-star-half half-empty"></span>
                                                </span>
                                                :
                                                <span className="fa fa-star"></span>
                                        }
                                        {[...Array(5 - Math.ceil(product.rating))].map((i) =>
                                            <span className="fa fa-star"></span>
                                        )}
                                    &nbsp;
                                    ({product.numReviews} reviews)
                                </li>
                                    <li>
                                        <b>Description:</b>
                                        <div>
                                            {product.description}
                                        </div>
                                    </li>
                                </ul>
                            </div>



                            <div className="details-action">
                                <ul>

                                    <li>
                                        Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                    </li>
                                    <li>
                                        Unit Price: <b>${product.price}</b>
                                    </li>

                                    {
                                        product.countInStock > 0 ?
                                            <li>
                                                Qty: <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map(x =>
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        )
                                                    }
                                                </select>
                                            </li>
                                            : <li></li>
                                    }
                                    <li>
                                        {
                                            product.countInStock > 0 ?
                                                <button onClick={handleAddToCart} className="button">Add to cart</button> : <div></div>
                                        }
                                    </li>

                                </ul>
                            </div>

                        </div>



                    </div>
    )
}

export default ProductScreen;