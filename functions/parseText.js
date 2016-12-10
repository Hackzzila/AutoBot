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
  } else if (text.includes('gyp error') || (text.includes('npm exit status 1') && text.includes('node—gyp rebuild'))) {
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
      message: 'It looks like you forgot to install something! You need to run `npm install PACKAGENAME` to install a package. To install discord.js run `npm install discord.js`',
      problem: 'Missing package',
      solution: 'Run `npm install PACKAGENAME` to install a package. To install discord.js run `npm install discord.js`',
      info: 'You are requiring a package that you didn\'t install, so you need to install it',
    };
  }

  return undefined;
}

module.exports = async (message, input) => {
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
