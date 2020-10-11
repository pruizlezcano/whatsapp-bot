const axios = require('axios');
module.exports = {
  name: 'meme',
  description: 'Send a random meme from r/dankmemes',
  async execute(message, client) {
    const { data } = await axios.get(
      'https://meme-api.herokuapp.com/gimme/dankmemes'
    );
    console.log(data);
    await client.sendFileFromUrl(
      message.chatId,
      data.url,
      'meme.png',
      `*${data.title}*\nPost: ${data.postLink}`
    );
  },
};
