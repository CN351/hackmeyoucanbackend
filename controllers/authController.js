const User = require('../model/user')

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    //find in mongo db
    const foundUser = await User.find({ username: user })
        .then((data) => {
            if (data.length == 1) {
                return data[0]
            } 
        }).catch((error) => { console.log(error) })

    // evaluate password 
    var match;
    if (foundUser) {
        var match = await bcrypt.compare(pwd, foundUser.password);
    }
    if (match && foundUser) {
        // create JWTs
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Saving refreshToken with current user
        await User.updateOne({ username: user }, {
            "$set": {
                accessToken: refreshToken
            }
        })

        foundUser.accessToken = accessToken;
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json(foundUser);
    }else {
        res.status(401).json({ 'message': 'Unauthorized.' }); //Unauthorized 
    }
    
}

module.exports = { handleLogin };