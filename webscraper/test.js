const { JSDOM } = require('jsdom');
const fetch = require('node-fetch');

const url = 'https://utaite.fandom.com/wiki/Singers';

(async () => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Get the Female Utaite section
    const femaleSection = doc.querySelector('span#Female_Utaite')?.closest('h2')?.nextElementSibling;
    const femaleContent = [];
    let current = femaleSection;
    while (current && current.tagName !== 'H2') {
      femaleContent.push(current.outerHTML);
      current = current.nextElementSibling;
    }
    console.log('Female Utaite Section:', femaleContent.join('\n'));

    // Get the Male Utaite section
    const maleSection = doc.querySelector('span#Male_Utaite')?.closest('h2')?.nextElementSibling;
    const maleContent = [];
    current = maleSection;
    while (current && current.tagName !== 'H2') {
      maleContent.push(current.outerHTML);
      current = current.nextElementSibling;
    }
    console.log('Male Utaite Section:', maleContent.join('\n'));

  } catch (error) {
    console.error(error);
  }
})();
