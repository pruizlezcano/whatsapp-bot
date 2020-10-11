module.exports = {
  name: 'rand',
  description: 'Random number between 1 and a given number',
  execute(message, client, args) {
    const x = Math.floor(Math.random() * parseInt(args[0]) + 1);
    return client.reply(message.chatId, `I choose ${x}`, message.id);
  },
};
