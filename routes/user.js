const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) throw new Error('no user');
        const matchedPw = await bcrypt.compare(password, user.password);
        if (!matchedPw) throw new Error('no user');
        const token = jwt.sign({ id: user._id }, 'secret 1234');
        res.status(200).send({ token, userId: user._id });
    } catch (error) {
        res.status(400).send({ msg: 'cannot login' });
    }
});

router.post('/signup', async (req, res, next) => {
    let { password, email, name } = req.body;
    try {
        const hashedPw = await bcrypt.hash(password, 10);
        password = hashedPw;
        const newUser = new User({ email, name, password });
        await newUser.save();
        res.status(200).send(newUser);
    } catch (err) {
        res.status(400).send(new Error('invalid data'));
    }
});

module.exports = router;
