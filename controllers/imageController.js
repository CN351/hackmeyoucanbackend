const Image = require('../model/image')

const getImage = async (req,res) =>{
    const filtered = await Image.find().sort({_id:-1}).limit(1)
    res.send(filtered)
}


const saveImage = async (req,res)=>{
    const body =req.body
    console.log(body);
    const newImg = new Image({
        "image":body.image
    })
    newImg.save()
    res.send(newImg)
}

module.exports = {getImage, saveImage}