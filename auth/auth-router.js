const express = require('express');

const router = express.Router();

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const { registerValid, loginValid } = require('../users/users-service.js');


//CREATES USER, HASH AND SALT PASSWORD LIKE POTATOES
router.post('/register', (req,res) => {
    const credentials = req.body;

    if(registerValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 9;

        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        Users.add(credentials)
        .then(user => {
            res.status(201).json({
                data: user
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'There was an error registering the user'
            });
        })
    } else {
        res.status(400).json({
            message: 'Please provide a valid username, email, and password. They all must be alphanumeric.'
        });
    };
});

//successful login gives token to access restricted routes set with auth-middleware in server.js

router.post('/login', (req,res) => {
    const { username, password } = req.body;

    if(loginValid(req.body)){
        Users.findBy({ username: username })
        .then(([user]) => {
          if (user && bcryptjs.compareSync(password, user.password)) {
            const token = createToken(user);
            res.status(200).json({
              message: 'Login Successful!', token
            });
          } else {
            res.status(500).json({
              message: 'Sorry, the credentials are invalid.'
            });
          }
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            message: 'There was an error logging in'
          })
        })
      } else {
        res.status(400).json({
          message: 'Please provide a valid username and password'
        })
      }
    });

    function createToken(user) {
        const payload = {
          sub: user.id,
          username: user.username
        };
      
        const secret = process.env.JWT_SECRET || '1000island';
      
        const options = {
          expiresIn: '1d',
        };
      
        return jwt.sign(payload, secret, options);
    };

module.exports = router;