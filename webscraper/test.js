const {JSDOM}=require('jsdom');
const { get } = require('mongoose');
const link='https://utaite.fandom.com/wiki/Miyashita_Yuu';
//thumb embedvideo autoResize
const test= async ()=>{
  const resp=await fetch(link);
  const jsdom=new JSDOM(await resp.text());
  const doc=jsdom.window.document;
  let ps=doc.querySelectorAll('p');
  let p=null;
  let i=0;
  while(ps[i]!=null&&!ps[i].textContent.includes('Miyashita Yuu')){
    i++;
  }
  p=ps[i];
  while(p.tagName==='P'){
    spanify(p,doc);
    removeImages(p,doc)
    console.log(p.outerHTML)
    p=p.nextElementSibling;
  }

}
test();
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
      if(url.hostname==='youtu.be')
        link.innerHTML='<p>Youtube</p>'
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
const getSongs=(doc,)=>{
  let title=doc.getElementById('List_of_Covered.2FOriginal_Songs');
    title=title!=null?title:doc.getElementById('List_of_Covered_Songs')
  if(title==null){

    return;
  }
  let list=null;
  list=title.parentNode;
  //nextElementSibling.querySelector('ol');
  while(!list.querySelector('ol'))
    list=list.nextElementSibling;
  list=list.querySelector('ol');

  const items=list.querySelectorAll('li');
  for(const item of items){
    replaceImgs(item);
    reformatList(item,doc);
    writeFileSync(`./test.txt`,item.outerHTML,{flag:'a'})
  }


}

// const url=new URL('https://www.nicovideo.jp/watch/sm31324700');
// console.log(url.hostname)
