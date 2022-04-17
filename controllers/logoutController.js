const User = require('../model/user')

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    console.log(cookies.jwt);
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.find({ accessToken: refreshToken })
        .then((data) => {
            if (data.length != 1) return res.sendStatus(403); //Forbidden 
            else return data[0]
        }).catch((error) => { console.log(error) })


    // const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    await User.updateOne({ accessToken: refreshToken }, {
        "$set": {
            accessToken: ''
        }
    })

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogout }