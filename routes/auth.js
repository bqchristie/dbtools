let router = require('express').Router();              // get an instance of the express Router
let config = require('../config/config');
let jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let User = require('../model/user');

router.post('/login', function (req, res, err) {
    User.find({email: req.body.email}).then(function(users){
        let user = (users.length === 1) ? users[0] : null;
        if (!user) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({auth: false, token: null});
        var token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({auth: true, token: token});
    }).catch(err => {
        return res.status(500).send('Error on the server.');
    });
});

module.exports = router;