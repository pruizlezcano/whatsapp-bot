const fs = require('fs');
const { prefix } = require('../config/config');

module.exports = {
  name: 'help',
  description: 'List all available commands.',
  execute(message, client) {
    let str = '';
    const commandFiles = fs
      .readdirSync('./commands')
      .filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`./${file}`);
      str += `*${prefix}${command.name}*: ${command.description} \n`;
    }

    client.reply(message.chatId, str, message.id);
  },
};
