module.exports = {
  name: 'rand',
  description: 'Random number between 1 and a given number',
  usage: 'rand number',
  execute(message, client, args) {
    if (args.length == 0) {
      return client.reply(message.chatId, `No number given`, message.id);
    }
    const x = Math.floor(Math.random() * parseInt(args[0]) + 1);
    return client.reply(message.chatId, `I choose ${x}`, message.id);
  },
};
