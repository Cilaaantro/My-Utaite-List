//wds-tabs for types of singer
const {JSDOM}=require('jsdom');
const {writeFileSync, writeFile}=require('fs');
const { equal } = require('assert');
const link='https://utaite.fandom.com/wiki/Singers';
const types=['Male_Utaite','Female_Utaite','Androgynous_Utaite','Male_Youtaite','Female_Youtaite','Androgynous_Youtaite','BB_Male_Geji','BB_Female_Geji'];
let count=0;

async function main(){
  // for(const type of types)
  //   writeFileSync(`./data/utaite/${type}.txt`,'');
  for(const type of types)
    await crawl(type);

}
main();


async function crawl(type) {
  const resp=await fetch(link);
    const jsdom=new JSDOM(await resp.text());
    const doc=jsdom.window.document;


    const utaites=doc.getElementById(type).parentElement.parentElement.getElementsByClassName('singer-box');
    //console.log(utaites[0].getElementsByClassName('floatnone')[0].querySelector('a').title)
    for(const utaite of utaites){
      try{
        

          const name=utaite.querySelector('a').title;
          //writeFileSync(`./data/utaite/${type}.txt`,`${++count}.${name}\n`,{flag:'a'});
          count++;

          const imgTag=utaite.querySelector('img');
          const imgSrc=imgTag?(imgTag.getAttribute('data-src') ? imgTag.getAttribute('data-src'):imgTag.src):'https://i1.sndcdn.com/artworks-000189080723-ez2uad-t500x500.jpg';
          const img=await fetch(imgSrc);
          const buffer=Buffer.from(await img.arrayBuffer());
          const modifiedName=name.replace(/[<>:"\/\\|?*\x00-\x1F]/g,'_');
          //writeFileSync(`./data/images/${type}/${count}.${modifiedName}.png`,buffer);

          const link=utaite.querySelector('a').href;
          const utaiteBio=await fetch('https://utaite.fandom.com'+link);
          await getInfo(utaiteBio,name,type,modifiedName);
      
        
      }catch(e){
        console.log(e);
      }
    }
  
}

/////////////////////////////////////////////
const getInfo= async (utaiteBio,name,type,modifiedName)=>{
    const jsdom=new JSDOM(await utaiteBio.text());
    const doc=jsdom.window.document;
    let ps=doc.querySelectorAll('p');
    let p=null;
    let i=0;
    console.log(count);
    console.log(name);
    // const firstName=name.split(' ')[0].split('+')[0];
    // while(ps[i]!=null&&!ps[i].textContent.toLowerCase().includes(firstName.toLowerCase())){
    //   i++;
    // }
    // p=ps[i];
    // while(p.tagName==='P'){
    //   spanify(p,doc);
    //   removeImages(p,doc)
    //   writeFileSync(`./data/about/${type}/${count}.${modifiedName}.txt`,p.outerHTML,{flag:'a'})
    //   p=p.nextElementSibling;
    // }
    getSongs(doc,name,type);
}

const spanify=(tag,doc)=>{
  const links = tag.querySelectorAll('a');
  links.forEach(link => {
    const span = doc.createElement('span');
    span.innerHTML = link.innerHTML;
    link.parentNode.replaceChild(span, link);
  });

}
const removeImages= (tag,doc)=>{
  const imgs = tag.querySelectorAll('img');
  imgs.forEach(img => {
    img.remove();
  });

}
const replaceImgs=(tag)=>{
  const links=tag.querySelectorAll('a');
  links.forEach(link=>{
    try{
      const href=link.href;
      const url = new URL(href);
      if(url.hostname==='youtu.be'){
        link.innerHTML='<p>Youtube</p>'
        writeFileSync(`./data/songs/ytSongs.txt`,href+'\n',{flag:'a'})

      }
      if(url.hostname==='www.nicovideo.jp')
        link.innerHTML='<p>Nico Video</p>'
    }catch(e){
      link.remove();
    }

    

  })


}
const reformatList=(tag,doc)=>{
  const links=tag.querySelectorAll('a');
  const newLinks=[];
  links.forEach(link=>{
    const newLink= doc.createElement('a');
    newLink.href=link.href;
    newLink.textContent=link.textContent;
    newLinks.push(newLink);
  })
  const childs=tag.children;
  for(const child of childs){
    child.remove();
  }
  for(const link of newLinks){
    const space = doc.createTextNode('   ');
    tag.appendChild(space);
    tag.appendChild(link);
    
  }
  

}
const getSongs=(doc,name,type)=>{
  let title=doc.getElementById('List_of_Covered.2FOriginal_Songs');
  title=title!=null?title:doc.getElementById('List_of_Covered_Songs')
  if(title==null){
    writeFileSync(`./data/songs/${count}.${name}.txt`,'no songs',{flag:'a'})
    return;
  }
  let list=null;
  list=title.parentNode;
  //nextElementSibling.querySelector('ol');
  while(!list.querySelector('ol'))
    list=list.nextElementSibling;
  list=list.querySelector('ol');
  //doc.getElementById('List_of_Covered_Songs').parentNode.nextElementSibling.querySelector('ol');

  const items=list.querySelectorAll('li');
  for(const item of items){
    replaceImgs(item);
    reformatList(item,doc);
    //writeFileSync(`./data/songs/${type}/${count}.${name}.txt`,item.outerHTML,{flag:'a'})
    //console.log(item.outerHTML);
  }


}


