const mime = require('mime');
const lang = require('lang-detector');
const Discord = require('discord.js');
const parseImages = require('./functions/parseImages');
const parseText = require('./functions/parseText');
const lint = require('./functions/lint');
const config = require('./config.json');

console.log(process.pid);

const bot = new Discord.Client();

bot.on('ready', () => console.log('Ready!'));

bot.on('messageReactionAdd', (reaction) => {
  const message = reaction.message;
  if (message.guild && message.guild.id === '81384788765712384' && message.channel.id !== '81385020756865024') return;
  if (reaction.emoji.name !== '🔍') return;
  if (reaction.count > 1) return;

  if (message.attachments.size > 0 || /http(s)?:\/\/(\S+)/gi.test(message.content)) {
    const urls = [];

    for (const attachment of message.attachments.array()) {
      if (!mime.lookup(attachment.filename).startsWith('image/')) continue;
      urls.push(attachment.proxyURL);
    }

    if (message.content) {
      for (const url of message.content.match(/http(s)?:\/\/(\S+)/gi) || []) {
        if (!mime.lookup(url).startsWith('image/')) continue;
        urls.push(url);
      }
    }

    if (urls.length !== 0) {
      parseImages(message, urls, true);
      message.channel.startTyping();
    }
  } else if (message.content.match(/```(.|\s)+```/gi)) {
    lint(message, null, true);
  }
});

bot.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.guild && message.guild.id === '81384788765712384' && message.channel.id !== '81385020756865024') return;
  if (message.attachments.size > 0 || /http(s)?:\/\/(\S+)/gi.test(message.content)) {
    const urls = [];

    for (const attachment of message.attachments.array()) {
      if (!mime.lookup(attachment.filename).startsWith('image/')) continue;
      urls.push(attachment.proxyURL);
    }

    if (message.content) {
      for (const url of message.content.match(/http(s)?:\/\/(\S+)/gi) || []) {
        if (!mime.lookup(url).startsWith('image/')) continue;
        urls.push(url);
      }
    }

    if (urls.length !== 0) {
      parseImages(message, urls);
    }
  }

  parseText(message, message.content);

  if (message.content.match(/```js\s(.|\s)+```/gi)) {
    lint(message);
  } else if (message.content.match(/```(.|\s)+```/gi) && lang(message.content.replace(/```(js)?|```/gi, '')) === 'JavaScript') {
    lint(message);
  }

  if (message.content.startsWith(bot.user.toString())) {
    message.channel.fetchMessage(message.content.slice(bot.user.toString().length).trim()).then((msg) => {
      if (msg.attachments.size > 0 || /http(s)?:\/\/(\S+)/gi.test(msg.content)) {
        const urls = [];

        for (const attachment of msg.attachments.array()) {
          if (!mime.lookup(attachment.filename).startsWith('image/')) continue;
          urls.push(attachment.proxyURL);
        }

        if (msg.content) {
          for (const url of msg.content.match(/http(s)?:\/\/(\S+)/gi) || []) {
            if (!mime.lookup(url).startsWith('image/')) continue;
            urls.push(url);
          }
        }

        parseImages(msg, urls, true);
        message.channel.startTyping();
      } else if (msg.content.match(/```(.|\s)+```/gi)) {
        lint(msg, null, true);
      } else {
        message.channel.sendMessage('Invalid message contents');
      }
    }).catch(() => {
      message.channel.sendMessage('Invalid message!');
    });
  }
});

process.on('unhandledRejection', console.error);

bot.login(config.token);
