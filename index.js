const mime = require('mime');
const Discord = require('discord.js');
const parseImages = require('./functions/parseImages');
const parseText = require('./functions/parseText');
const config = require('./config.json');

const bot = new Discord.Client();

bot.on('ready', () => console.log('Ready!'));

bot.on('message', (message) => {
  if (message.author.bot) return;
  if (message.guild && message.guild.id === '81384788765712384' && message.channel.id !== '81385020756865024') return;
  if (message.attachments.size > 0 || /http(s)?:\/\/(\S+)/gi.test(message.content)) {
    const urls = [];

    for (const attachment of message.attachments.array()) {
      if (!mime.lookup(attachment.filename).startsWith('image/')) continue;
      urls.push(attachment.proxyURL);
    }

    if (message.content) {
      for (const url of message.content.match(/http(s)?:\/\/(\S+)/gi)) {
        if (!mime.lookup(url).startsWith('image/')) continue;
        urls.push(url);
      }
    }

    parseImages(message, urls);
  }

  parseText(message, message.content);
});

bot.login(config.token);
