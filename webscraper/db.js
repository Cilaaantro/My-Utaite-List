const mongoose=require("mongoose");
require("dotenv").config({path:__dirname+'/../server/.env'});
const { PinataSDK } = require("pinata-web3")
const fs = require("fs")
const { Blob } = require("buffer")
const utaiteModels = require("../server/models/utaite.js");
const{writeFileSync,readFileSync}=fs;



const types=[['Male_Utaite','839a1043-dd81-4805-bc0e-d00054032f82'],['Female_Utaite','76df7658-3017-40d1-a7ae-28afe4defbd2'],['Androgynous_Utaite','68f7d271-43a5-416a-8c27-1df9623b8d5a'],['Male_Youtaite','c87b9e86-0046-4478-a013-2c0dc097e3d5'],['Female_Youtaite','1cca3f0d-b752-4739-9fdd-7757a0792eaf'],['Androgynous_Youtaite','d241b07e-f810-4327-a661-73b53aef10f9'],['BB_Male_Geji','89f03ed2-0504-464c-acad-ce754b8636bf'],['BB_Female_Geji','d06a35c5-4c65-451f-bc04-4d9be6687402']];
//const types=[['Male_Utaite','019414a8-eb8e-798c-aee8-f2e225c5e601']]
function connectDB(){
  return mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}.dt9ie.mongodb.net/${process.env.DATABASE_UTAITES}`);
}
connectDB();

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.GATEWAY_URL
})

async function upload(name,path,groupID){
  try {
    const blob = new Blob([fs.readFileSync(path)]);
    const file = new File([blob], `${name}.png`, { type: "image/png"})
    const upload = await pinata.upload.file(file).group(groupID);
    return upload;
    //console.log(upload)
  } catch (error) {
    console.log(error)
  }
};



//const female= new utaites.Female_Utaite({name:'d',number:1,pictureID:'1',aboutHTML:'1',songHTML:'1'});

async function automateUpload(){
  for(const type of types){
    const utaites= readFileSync(`./data/utaite/${type[0]}.txt`,'utf8',(err,result)=>{
      if(err){
        console.log('error in reading');
      }
      return result;
    })
    const utaiteList=utaites.split('\n');
    for(const utaite of utaiteList){
      console.log(utaite);
      const name=utaite.substring(utaite.indexOf('.')+1);
      const normalizedName=utaite.replace(/[<>:"\/\\|?*\x00-\x1F]/g,'_');
      const pinataResp= await upload(normalizedName,`./data/images/${type[0]}/${normalizedName}.png`,type[1]);
      //console.log(pinataResp);
      const cid= pinataResp.IpfsHash;
      const about= readFileSync(`./data/about/${type[0]}/${normalizedName}.txt`,'utf-8',(err,result)=>{
        if(err){
          console.log(err)
          return;
        }
        return result;
      });
      const songs= readFileSync(`./data/songs/${type[0]}/${normalizedName}.txt`,'utf-8',(err,result)=>{
        if(err){
          console.log(err)
          return;
        }
        return result;
      });
      uploadDB(type[0],utaite,about,songs,cid);

    }
    
  }
}

async function uploadDB(type,utaite,about,songs,imgcid){
  const utaiteType=utaiteModels[type];
  const number=Number(utaite.substring(0,utaite.indexOf('.')));
  const name =utaite.substring(utaite.indexOf('.')+1);
  console.log(number);
  console.log(imgcid);
  const utaiteObj=new utaiteType({name:name,number:number,cid:imgcid,aboutHTML:about,songHTML:songs});
  utaiteObj.save();

}

automateUpload();