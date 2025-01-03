const mongoose=require('mongoose');

const types=[['Male_Utaite'],['Female_Utaite'],['Androgynous_Utaite'],['Male_Youtaite'],['Female_Youtaite'],['Androgynous_Youtaite'],['BB_Male_Geji'],['BB_Female_Geji']];

const utaiteSchema= new mongoose.Schema({
  name:{
    type: String,
    unique:[true,'Name has already been used.']
  },
  number:Number,
  cid:String,
  aboutHTML:String,
  songHTML:String,
  numberOfRatings:{
    type:Number,
    default:0
  },
  numberOfStars:{
    type:Number,
    default:0
  }
})


module.exports={
  'Male_Utaite':mongoose.model('Male_Utaite',utaiteSchema),
  'Female_Utaite':mongoose.model('Female_Utaite',utaiteSchema),
  'Androgynous_Utaite':mongoose.model('Androgynous_Utaite',utaiteSchema),
  'Male_Youtaite':mongoose.model('Male_Youtaite',utaiteSchema),
  'Female_Youtaite':mongoose.model('Female_Youtaite',utaiteSchema),
  'Androgynous_Youtaite':mongoose.model('Androgynous_Youtaite',utaiteSchema),
  'BB_Male_Geji':mongoose.model('BB_Male_Geji',utaiteSchema),
  'BB_Female_Geji':mongoose.model('BB_Female_Geji',utaiteSchema)
}