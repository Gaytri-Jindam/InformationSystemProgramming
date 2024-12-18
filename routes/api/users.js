
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

//@route Get api/users
//@desc  Test route
//@access Public
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email','Please include a valid email').isEmail(),
        check('password','Please enter a password with 6 or more characters').isLength({min: 6})
    ],
  async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }

        const { name, email, password } =req.body;
        try{
        //see if user exists 
        let user = await User.findOne({ email });

        if(user){
          return  res.status(400).json({
                errors:[{
                    msg: 'User already exists'
                }]
            })
        }

        const { default: normalize } = await import('normalize-url');

//Get users gravatar
const avatar = normalize(
    gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    }),
    { forceHttps: true }
  );

console.log('avatar ',avatar); // Check the generated URL

user = new User({
    name,
    email,
    avatar,
    password
});
        //Encrypt password

        const salt  = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();
        //Return jsonwebtoken

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
            if(err) throw err;
            res.json({ token});
        
        });
        }catch(err)
        {
            console.error(err.message);
           return res.status(500).send('server error');
        }

});

module.exports = router;