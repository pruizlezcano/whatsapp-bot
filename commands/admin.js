const isadmin = require('../utils/isadmin');

module.exports = {
  name: 'admin',
  description: 'Change who can and cannot speak in a group',
  usage: 'admin true|false',
  async execute(message, client, args) {
    if (await isadmin(message, client)) {
      if (args[0] == 'true') {
        client.setGroupToAdminsOnly(message.chatId, true);
      } else if (args[0] == 'false') {
        client.setGroupToAdminsOnly(message.chatId, false);
      }
      return;
    } else {
      return client.reply(
        message.chatId,
        "You don't have permission to do that",
        message.id
      );
    }
  },
};
