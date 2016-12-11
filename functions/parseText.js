function parse(input) {
  const text = input.toLowerCase();
  if (text.includes('not yet supported outside strict mode')) {
    return {
      color: 0xf44259,
      message: 'It looks like you have an outdated node version! You need 6.0.0 or newer. Go to https://nodejs.org/en/download/ to update.',
      problem: 'Outdated node version',
      solution: 'Go to [nodejs.org](https://nodejs.org/en/download/) and update your node version to 6.0.0 or above',
      info: 'Discord.JS uses features in ES6, you need node 6.0.0 or above to use these features',
    };
  } else if (text.includes('async') && text.includes('unexpected token')) {
    return {
      color: 0xf44259,
      message: 'It looks like you are trying to use async! To do this you need node 7.0.0 (you can check this with `node -v`) or newer and you need to use the `--harmony` flag. E.g. `node --harmony bot.js`. Go to https://nodejs.org/en/download/ if you need to update.',
      problem: 'Either an outdated node version, or no harmony flag',
      solution: 'If your node version is less than 7.0.0 (you can check with `node -v`) go to [nodejs.org](https://nodejs.org/en/download/) and update your node version to 7.0.0 or above\nAlso make sure to run with the `--harmony` flag (note: this flag needs to go *before* your filename). E.g. `node --harmony bot.js`',
      info: 'Async needs the harmony flag and node 7.0.0 or above',
    };
  } else if (text.includes('gyp error') || (text.includes('npm exit status 1') && (text.includes('node—gyp rebuild') || text.includes('node-gyp rebuild')))) {
    return {
      color: 0xf44259,
      message: 'It looks like you are having gyp errors! You want to install windows-build-tools (`npm i -g windows-build-tools`) if you are on Windows or build-essential (`sudo apt install build-essential`) if you are on Linux',
      problem: 'gyp errors',
      solution: 'Install windows-build-tools (`npm i -g windows-build-tools`) if you are on Windows or build-essential (`sudo apt install build-essential`) if you are on Linux',
      info: 'Some packages require a C++ compiler and Python2 to install. Installing windows-build-tools or build-utils will install these for you',
    };
  } else if (text.includes('cannot find module')) {
    return {
      color: 0xf44259,
      message: 'It looks like you either forgot to install something or node can\'t find your file! Double check your spelling of the filename. You need to run `npm install PACKAGENAME` to install a package. To install discord.js run `npm install discord.js`',
      problem: 'Missing package or file doesn\'t exist',
      solution: 'Double check your spelling of the file. Run `npm install PACKAGENAME` to install a package. To install discord.js run `npm install discord.js`',
      info: 'You are either requiring a package that you didn\'t install or trying to run a file that doesn\'t exist',
    };
  } else if (text.includes('message is undefined') || text.includes('bot is not defined') || text.includes('msg is not defined') || text.includes('message is not defined')) {
    return {
      color: 0xf44259,
      message: 'It looks like you tried to use a variable that is not defined. This most likely means you copied & pasted the code you ran, or you followed a tutorial incorrectly. Make sure to change the names of your variables to what you have defined before running the program.',
      problem: '`message`/`msg`/`bot`/`client` is not defined',
      solution: 'Double check you defined the variable you are using before you use it. Read the code you paste before you run it.',
      info: 'You either forgot what you named your variables, copied & pasted code from somewhere, or followed a tutorial incorrectly',
    };
  }

  return undefined;
}

module.exports = async (message, input) => {
  if (/([a-z0-9]|-){24}\.([a-z0-9]|-){6}\.([a-z0-9]|-){27}|mfa.([a-z0-9]|-){84}/gi.test(input)) {
    message.delete();
    message.reply('You posted your token! Be sure to reset it at https://discordapp.com/developers/applications/me');
  }

  const result = parse(input);
  if (!result) return;

  message.reply(result.message, {
    embed: {
      color: result.color,
      fields: [
        {
          inline: true,
          name: 'Problem',
          value: result.problem,
        },
        {
          inline: true,
          name: 'More Info',
          value: result.info,
        },
        {
          name: 'Solution',
          value: result.solution,
        },
      ],
    },
  });
};
