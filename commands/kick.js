const isadmin = require('../utils/isadmin');

module.exports = {
  name: 'kick',
  description: 'Remove participant of group',
  usage: 'kick @user',
  async execute(message, client) {
    if (await isadmin(message, client)) {
      for (user of message.mentionedJidList) {
        await client.removeParticipant(message.chatId, user);
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
