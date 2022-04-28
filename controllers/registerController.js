const User = require('../model/user')

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd, email, name, phone, cardid } = req.body;
    console.log(user, pwd, email, name, phone, cardid);
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate usernames in the db
    try {
        User.find({ username: user })
            .then(async (data) => {
                if (data.length != 0) return res.sendStatus(409); //Conflict
            })
    } catch (error) {
        console.log(error);
    }


    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const newUser = { "username": user, "password": hashedPwd, email: email, accessToken: '', name: name, phone: phone, cardid: cardid };
        await User.create(newUser);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };