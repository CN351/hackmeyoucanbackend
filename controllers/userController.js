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
            let tempdata = []
            data.forEach(element => {
                tempdata.push({ username: element.username, name: element.name, email: element.email, phone: element.phone, cardid: element.cardid })
            });
            return tempdata
        }).catch((error) => { console.log(error) })


    res.status(200).send(foundUser)
}

const updateUserData = async (req, res) => {
    const { username, email, name, phone, cardid } = req.body;
    console.log(username, email, name, phone, cardid);
    const data = await User.updateOne({ "username": username }, {
        "$set": {
            username: username,
            email: email,
            name: name,
            phone: phone,
            cardid: cardid
        }
    })
    res.status(200).json({ data: data, message: "Success" })

}


const deleteUser = async (req, res) => {
    const { username } = req.params;
    const data = await User.deleteOne({ "username": username })
    res.status(200).send({ data: data, message: "Success" })


}


module.exports = { getUserData, getAllUserData, updateUserData, deleteUser }