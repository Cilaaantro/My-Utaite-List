//wds-tabs for types of singer
const {JSDOM}=require('jsdom');
const {writeFileSync, writeFile}=require('fs');
const link='https://utaite.fandom.com/wiki/Singers';
const types=['Male_Utaite','Female_Utaite','Androgynous_Utaite','Male_Youtaite','Female_Youtaite','Androgynous_Youtaite','BB_Male_Geji','BB_Female_Geji'];
let count=0;

async function main(){
  for(const type of types)
    writeFileSync(`./data/utaite/${type}.txt`,'');
  for(const type of types)
    await crawl(type);

}
main();


async function crawl(type) {
  try{
    const resp=await fetch(link);
    const jsdom=new JSDOM(await resp.text());
    const doc=jsdom.window.document;


    const utaites=doc.getElementById(type).parentElement.parentElement.getElementsByClassName('singer-box');
    //console.log(utaites[0].getElementsByClassName('floatnone')[0].querySelector('a').title)
    for(const utaite of utaites){
      const name=utaite.querySelector('a').title;
      writeFileSync(`./data/utaite/${type}.txt`,`${++count}.${name}\n`,{flag:'a'});
      const imgTag=utaite.querySelector('img');
      const imgSrc=imgTag?(imgTag.getAttribute('data-src') ? imgTag.getAttribute('data-src'):imgTag.src):'https://i1.sndcdn.com/artworks-000189080723-ez2uad-t500x500.jpg';
      //console.log(imgSrc);
      const img=await fetch(imgSrc);
      const buffer=Buffer.from(await img.arrayBuffer());
      writeFileSync(`./data/images/${type}/${count}.${name.replace(/[<>:"\/\\|?*\x00-\x1F]/g,'_')}.png`,buffer);
      //console.log(utaite.querySelector('a').title)
    }
  }catch(e){
    console.log(e);
  }
  
}


