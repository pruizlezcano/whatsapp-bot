module.exports = {
  name: 'fire',
  description: 'Send the same message multiple times',
  usage: 'fire [here] counter user message...',
  execute(message, client, args) {
    let chat = undefined;
    let user = undefined;
    let msg = undefined;
    let count = undefined;
    if (args[0] === 'here') {
      count = args[1];
      user = message.mentionedJidList[0];
      chat = message.chat.id;
      msg = args.slice(3).join(' ');
      for (let i = 0; i < count; i++) {
        client.sendTextWithMentions(chat, `${user} ${msg}`);
      }
    } else {
      count = args[0];
      chat = message.mentionedJidList[0];
      console.log(chat);
      msg = args.slice(2).join(' ');
      for (let i = 0; i < count; i++) {
        client.sendText(chat, msg);
      }
    }
    return client.reply(message.chatId, 'Done', message.id);
  },
};
