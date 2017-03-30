const linter = require('eslint').linter;
const beautify = require('js-beautify').js_beautify;
const annotate = require('./annotate');


const badEmotes = [
  '269614602986192896',
  '264704482166833153',
  '264705118690082816',
  '264756893614997516',
  '251464735202082816',
  '264701195573133315',
  '264756407973314570',
  '264756680942813184',
  '264704723653885953',
  '264703959015489537',
  '264704410918191104',
  '241202932673019904',
  '251464793570017280',
  '264757536769572865',
  '231614039367614464',
  '230083889018830848',
  '230066884677074945',
  '264757808430448652',
];

const goodEmotes = [
  '230071592858812417',
  '230072939956011026',
  '264758020741922827',
  '230071959235330048',
  '264703572401324033',
  '264698115544580096',
];

const badMessages = [
  'I think you may want to take a second look.',
  'Looks like you have some problems!',
  'Did you lint your code?',
  'Get a linter bro.',
  'Uh oh!',
  'I don\'t like this code.',
  'BAD!',
  'Did you try to copy that off of Github?',
  'Do you know JS?',
  'smh',
  'no',
];

const goodMessages = [
  'It\'s all good fam.',
  'Nice job.',
  'Great code.',
  'I like',
];

module.exports = async (message, text, show) => {
  const code = text || message.content.match(/```(js)?(.|\s)+```/gi)[0].replace(/```(js)?|```/gi, '').trim();
  const errors = linter.verify(code, {
    extends: 'eslint:recommended',
    parserOptions: {
      emcaVersion: 2017,
    },
    env: {
      es6: true,
      node: true,
    },
    rules: {
      'no-console': 0,
    },
  });

  if (!show) {
    if (errors.length !== 0) {
      await message.react('❌');
      if (message.guild.id === '222078108977594368') message.react(message.guild.emojis.get(badEmotes[Math.floor(Math.random() * badEmotes.length)]));
    } else {
      await message.react('✔');
      if (message.guild.id === '222078108977594368') message.react(message.guild.emojis.get(goodEmotes[Math.floor(Math.random() * goodEmotes.length)]));
    }
  } else if (errors.length !== 0) {
    const errs = [];
    for (const error of errors) {
      errs.push(`- [${error.line}:${error.column}] ${error.message}`);
    }

    message.channel.send(badMessages[Math.floor(Math.random() * badMessages.length)], {
      embed: {
        color: 0xf44259,
        fields: [
          {
            name: 'Errors',
            value: `\`\`\`diff\n${errs.join('\n')}\`\`\``,
          },
          {
            name: 'Annotated Code',
            value: `\`\`\`${annotate(code, errors)}\`\`\``,
          },
          {
            name: 'Beautified Code',
            value: `\`\`\`js\n${beautify(code, { indent_size: 2 })}\`\`\``,
          },
        ],
      },
    });
  } else {
    message.channel.send(goodMessages[Math.floor(Math.random() * goodMessages.length)], {
      embed: {
        color: 0x43B581,
        fields: [
          {
            name: 'Beautified Code',
            value: `\`\`\`js\n${beautify(code, { indent_size: 2 })}\`\`\``,
          },
        ],
      },
    });
  }
};
