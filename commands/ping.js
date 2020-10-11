module.exports = {
  name: 'ping',
  description: 'Test if the bot is alive',
  execute(message, client) {
    return client.sendText(
      message.chatId,
      `🏓 *Pong!*\n Latency is ${parseFloat(
        message.timestamp - Date.now() / 1000
      ).toFixed(4)}ms.`
    );
  },
};
