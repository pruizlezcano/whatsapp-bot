const fs = require('fs');
const { prefix } = require('../config/config');

module.exports = {
  name: 'help',
  description: 'List all available commands.',
  execute(message, client, args) {
    let str = '';
    const commandFiles = fs
      .readdirSync('./commands')
      .filter((file) => file.endsWith('.js'));
    if (args.length > 0) {
      if (commandFiles.indexOf(args[0] >= 0)) {
        const command = require(`./${args[0]}.js`);
        str += `*Description:* ${command.description}\n*Usage:* ${prefix}${command.usage}`;
      }
    } else {
      for (const file of commandFiles) {
        const command = require(`./${file}`);
        str += `*${prefix}${command.name}*: ${command.description} \n`;
      }
      str += `\nUse ${prefix}help [command] for more information`;
    }

    client.reply(message.chatId, str, message.id);
  },
};
