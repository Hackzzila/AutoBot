const sharp = require('sharp');
const superagent = require('superagent');
const tesseract = require('tesseract.js');
const parseText = require('./parseText');

async function parseImage(message, url) {
  const response = await superagent.get(url);
  if (response.statusType !== 2) return;

  const file = await sharp(response.body).resize(2000).toBuffer();

  const result = await tesseract.recognize(file);
  parseText(message, result.text);
}

module.exports = async (message, urls) => {
  for (const url of urls) parseImage(message, url);
};
