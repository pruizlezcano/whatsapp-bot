module.exports = {
  name: 'everyone',
  description: 'Tag everyone',
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
      console.log(host);
      for (id of group) {
        if (id != message.sender.id && id != host) {
          mentions = mentions + `@${id}`;
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
