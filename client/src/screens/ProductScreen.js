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
        return () => {
            //
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div>

            <div className="back-to-results">
                <Link to="/">Back to results</Link>
            </div>

            {loading ? <div>Loading...</div> :
                error ? <div>{error}</div> : (

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
                                    <b>{product.rating}  Stars ({product.numReviews} reviews)</b>
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
                )
            }

        </div>
    )
}

export default ProductScreen;