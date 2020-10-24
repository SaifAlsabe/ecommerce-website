express = require('express');
userModel = require('../model/userModel');
const { getToken } = require('../util.js');

const router = express.Router()

router.post('/address', async(req, res) => {
    const userAddress = await userModel.findOne({
        name: req.body.name,
        email: req.body.email,
    })

    if (userAddress) {
        res.send({
            address: {
                street: userAddress.address.street,
                city: userAddress.address.city,
                state: userAddress.address.state,
                zipcode: userAddress.address.zipcode,
                country: userAddress.address.country,
            }
        })
    } else {
        res.status(401).send({ msg: 'invalid email or password' })
    }

})

router.post('/signin', async(req, res) => {

    const signinUser = await userModel.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    if (signinUser) {
        res.send({
            _id: signinUser._id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })
    } else {
        res.status(401).send({ msg: 'invalid email or password' })
    }
})

router.post('/register', async(req, res) => {

    const registerUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
    })

    const newUser = await registerUser.save();
    if (newUser) {
        res.send({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })
    } else {
        res.status(401).send({ msg: 'invalid data' })
    }
})

router.patch('/updateInfo', async(req, res) => {

    const updateUser = await userModel.findOneAndUpdate({
        name: req.body.oldName,
        email: req.body.oldEmail,
    }, {
        $set: {
            name: req.body.newName,
            email: req.body.newEmail,
            password: req.body.newPassword,
        }
    }, { new: true })

    if (updateUser) {
        res.send({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: getToken(updateUser)
        })
    } else {
        res.status(401).send({ msg: 'invalid email or password' })
    }
})

router.patch('/updateAddress', async(req, res) => {

    const updateUser = await userModel.findOneAndUpdate({
        name: req.body.name,
        email: req.body.email,
    }, {
        $set: {
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zipcode: req.body.zipcode,
                country: req.body.country,
            }
        }
    }, { new: true })

    if (updateUser) {
        res.send({
            address: {
                street: updateUser.address.street,
                city: updateUser.address.city,
                state: updateUser.address.state,
                zipcode: updateUser.address.zipcode,
                country: updateUser.address.country,
            }
        })
    } else {
        res.status(401).send({ msg: 'invalid email or password' })
    }
})


module.exports = router;