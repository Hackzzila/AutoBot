const issue = require('./issueList.json');

function parse(input) {
  if (input.includes('Block-scoped declarations (let, const, function, class) not yet supported outside strict mode')) {
    return {
      message: issue.responses.strictmode.message,
      info: issue.responses.strictmode.info,
      problem: issue.responses.strictmode.problem,
      solution: issue.responses.strictmode.solution,
    };
  } else

  if ((input.includes('async (') && input.includes('SyntaxError: Unexpected token (')) || (input.includes('async ') && input.includes('SyntaxError: missing') && input.includes('^^^^^'))) {
    return {
      message: issue.responses.async.message,
      info: issue.responses.async.info,
      problem: issue.responses.async.problem,
      solution: issue.responses.async.solution,
    };
  } else

  if (input.includes('gyp error') || (input.includes('npm exit status 1') && (input.includes('node—gyp rebuild') || input.includes('node-gyp rebuild')))) {
    return {
      message: issue.responses.gyperror.message,
      info: issue.responses.gyperror.info,
      problem: issue.responses.gyperror.problem,
      solution: issue.responses.gyperror.solution,
    };
  } else

  if (input.includes('Error:') && input.includes('Cannot find module')) {
    return {
      message: issue.responses.lostmodule.message,
      info: issue.responses.lostmodule.info,
      problem: issue.responses.lostmodule.problem,
      solution: issue.responses.lostmodule.solution,
    };
  } else

  if (input.includes('msg is not defined') || input.includes('message is not defined')) {
    return {
      message: issue.responses.msgnotdef.message,
      info: issue.responses.msgnotdef.info,
      problem: issue.responses.msgnotdef.problem,
      solution: issue.responses.msgnotdef.solution,
    };
  } else

  if (input.includes('bot is not defined') || input.includes('client is not defined')) {
    return {
      message: issue.responses.botnotdef.message,
      info: issue.responses.botnotdef.info,
      problem: issue.responses.botnotdef.problem,
      solution: issue.responses.botnotdef.solution,
    };
  } else

  // if (input.includes('TypeError: Discord.RichEmbed is not a constructor')) {
  //   return {
  //     message: issue.responses.richembed.message,
  //     info: issue.responses.richembed.info,
  //     problem: issue.responses.richembed.problem,
  //     solution: issue.responses.richembed.solution,
  //   };
  // } else
  // : Unhandled promise rejection (rejection id: 1): Error: Bad Request
  if (input.includes('UnhandledPromiseRejectionWarning') && input.includes('Unhandled promise rejection') && input.includes('Error: Bad Request')) {
    return {
      message: issue.responses.badrequest.message,
      info: issue.responses.badrequest.info,
      problem: issue.responses.badrequest.problem,
      solution: issue.responses.badrequest.solution,
    };
  } else

  if (input.includes('You have triggered an unhandledRejection, you may have forgotten to catch a Promise rejection:') && input.includes('Error: Forbidden')) {
    return {
      message: issue.responses.forbidden.message,
      info: issue.responses.forbidden.info,
      problem: issue.responses.forbidden.problem,
      solution: issue.responses.forbidden.solution,
    };
  } else

  if (input.includes('Couldn\'t find an Opus engine')) {
    return {
      message: issue.responses.opusengine.message,
      info: issue.responses.opusengine.info,
      problem: issue.responses.opusengine.problem,
      solution: issue.responses.opusengine.solution,
    };
  } else

  if (input.includes('Error: FFMPEG was not found on your system, so audio cannot be played. Please make sure FFMPEG is installed and in your PATH.')) {
    return {
      message: issue.responses.ffmpeg.message,
      info: issue.responses.ffmpeg.info,
      problem: issue.responses.ffmpeg.problem,
      solution: issue.responses.ffmpeg.solution,
    };
  } else if (text.includes('client is undefined') || text.includes('bot is not defined') || text.includes('msg is not defined') || text.includes('message is not defined')) {
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

module.exports = (message, input) => {
  if (/([a-z0-9]|-){24}\.([a-z0-9]|-){6}\.([a-z0-9]|-){27}|mfa.([a-z0-9]|-){84}/gi.test(input)) {
    message.delete();
    message.reply('You posted your token! Be sure to reset it at <https://discordapp.com/developers/applications/me>');
  }

  const result = parse(input);
  if (!result) return;

  message.reply(result.message, {
    embed: {
      color: 0xf44259,
      fields: [{
        inline: true,
        name: 'Problem',
        value: result.problem,
      },
      {
        name: 'Solution',
        value: result.solution,
      },
      {
        inline: true,
        name: 'More Info',
        value: result.info,
      },
      ],
    },
  }).catch(console.error);
};
