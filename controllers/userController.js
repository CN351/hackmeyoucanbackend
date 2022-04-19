const User = require('../model/user')



const getUserData = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.find({ accessToken: refreshToken })
        .then((data) => {
            if (data.length != 1) return res.sendStatus(403); //Forbidden 
            else return data[0]
        }).catch((error) => { console.log(error) })

    res.status(200).send(foundUser)
}

const getAllUserData = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    // const refreshToken = cookies.jwt;

    const foundUser = await User.find()
        .then((data) => {
            return data
        }).catch((error) => { console.log(error) })

    res.status(200).send(foundUser)
}



module.exports = { getUserData, getAllUserData }