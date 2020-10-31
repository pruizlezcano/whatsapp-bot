module.exports = {
  name: 'everyone',
  description: 'Tag everyone',
  usage: 'everyone',
  async execute(message, client) {
    if (!message.isGroupMsg) {
      return client.sendTextWithMentions(
        message.from,
        `@${message.author} This command is only available un a group chat`
      );
    } else {
      const group = await client.getGroupMembersId(message.chatId);
      let mentions = '';
      const host = `${await client.getHostNumber()}@c.us`;
      for (id of group) {
        if (id != message.sender.id && id != host) {
          const user = `@${id.slice(0, id.indexOf('@'))}`;
          mentions = mentions + ` ${user}`;
        }
      }
      if (mentions === '') {
        return client.sendTextWithMentions(
          message.from,
          `@${message.author} There is not enought people to use this command`
        );
      }
      await client.sendTextWithMentions(message.chatId, mentions);
    }
  },
};
