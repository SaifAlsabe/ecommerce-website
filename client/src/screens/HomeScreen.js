import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';


function HomeScreen(props) {

    const category = props.match.params.id ? props.match.params.id : ''
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    // const categorizedProducts = products
    // console.log(products)
    // const categorizedProducts = products.filter(product => product.category === category )

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
                                    <div className="product-rating">{product.rating} Stars ({product.numReviews} reviews)</div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
    );
}

export default HomeScreen;