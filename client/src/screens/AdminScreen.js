import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, listProducts } from '../actions/productActions';


function AdminScreen() {

    const { userInfo } = useSelector(state => state.userSignin)
    const { products, loading, error } = useSelector(state => state.productList);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteItem = (productId) => {
        if (userInfo.isAdmin) {
            dispatch(deleteProduct(productId))
        } else {
            alert("REQUEST DENIED! \nOnly admin is authorized to delete items")
        }

    }

    return (
        loading ? <div>Loading...</div> :
            error ? <div>{error}</div> :
                userInfo.isAdmin ?
                    <div className="admin-container">

                        <table>
                            <caption><h3>Products</h3></caption>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <div className="actions-buttons">
                                                <button className="action-button edit-button">Edit</button>
                                                <button className="action-button delete-button" onClick={() => deleteItem(product._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>
                    :
                    <></>
    )
}

export default AdminScreen;