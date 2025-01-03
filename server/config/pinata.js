const { PinataSDK } = require("pinata")
const fs = require("fs")
const { Blob } = require("buffer")
require("dotenv").config({path:__dirname+'/../.env'})

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.GATEWAY_URL
})

async function upload(name,path,groupID){
  try {
    const blob = new Blob([fs.readFileSync(path)]);
    const file = new File([blob], `${name}.png`, { type: "image/png"})
    const upload = await pinata.upload.file(file).group(groupID);
    console.log(upload)
  } catch (error) {
    console.log(error)
  }
};



module.exports={upload};