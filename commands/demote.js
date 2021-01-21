const isadmin = require('../utils/isadmin');

module.exports = {
  name: 'demote',
  description: 'Demote admin of group',
  usage: 'demote @user',
  async execute(message, client) {
    if (await isadmin(message, client)) {
      for (user of message.mentionedJidList) {
        await client.demoteParticipant(message.chatId, user);
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
