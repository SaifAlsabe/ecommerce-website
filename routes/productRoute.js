express = require('express');
productModel = require('../model/productModel');
const { isAuth, isAdmin } = require('../util');


const router = express.Router();



router.get('/', async(req, res) => {
    const category = req.headers.category;
    let products;
    if (category) {
        products = await productModel.find({ category: category })
    } else {
        products = await productModel.find({})
    }
    res.send(products)
})

router.get('/:id', async(req, res) => {

    const productId = req.params.id;
    const product = await productModel.findOne({ _id: productId });

    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ msg: "product not found" });
    }

});

router.delete('/:id', isAuth, isAdmin, async(req, res) => {

    const productId = req.params.id;
    const product = await productModel.deleteOne({ _id: productId });

    const products = await productModel.find({})
    res.send(products)

});

module.exports = router