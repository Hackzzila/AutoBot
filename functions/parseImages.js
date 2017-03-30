const sharp = require('sharp');
const lang = require('lang-detector');
const superagent = require('superagent');
const tesseract = require('tesseract.js');
const parseText = require('./parseText');
const lint = require('./lint');

async function parseImage(message, url, show) {
  const response = await superagent.get(url);
  if (response.statusType !== 2) return;

  const file = await sharp(response.body).resize(2000).toBuffer();

  const result = await tesseract.recognize(file);
  parseText(message, result.text, true);

  if (lang(result.text) === 'JavaScript') {
    lint(message, result.text, show);
  }

  console.log(1);
  message.channel.stopTyping();
}

module.exports = async (message, urls, show) => {
  for (const url of urls) parseImage(message, url, show);
};
