const isadmin = require('../utils/isadmin');
module.exports = {
  name: 'promote',
  description: 'Promote user to admin in group',
  usage: 'promote @user',
  async execute(message, client) {
    if (await isadmin(message, client)) {
      for (user of message.mentionedJidList) {
        await client.promoteParticipant(message.chatId, user);
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
