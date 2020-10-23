const moment = require('moment');

module.exports = {
  name: 'ping',
  description: 'Test if the bot is alive',
  usage: 'ping',
  execute(message, client) {
    return client.sendText(
      message.chatId,
      `🏓 *Pong!*\n Latency is ${moment
        .duration(moment() - moment(message.timestamp * 1000))
        .asSeconds()}s.`
    );
  },
};
