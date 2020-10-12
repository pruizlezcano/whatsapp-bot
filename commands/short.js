const shortener = require('../utils/shortener');

module.exports = {
  name: 'short',
  description: 'Url shortener',
  async execute(message, client, args) {
    let url = undefined;
    if (!message.quotedMsg) {
      url = args[0];
    } else {
      url = message.quotedMsg.canonicalUrl;
    }
    const shortUrl = await shortener(url);
    console.log('shortUrl', shortUrl);
    await client.reply(message.chatId, shortUrl, message.id);
  },
};
