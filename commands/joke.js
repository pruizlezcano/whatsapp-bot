const axios = require('axios');
module.exports = {
  name: 'joke',
  description: 'Send a joke',
  usage: 'joke [pr]. Use pr for programming jokes',
  async execute(message, client, args) {
    let data = undefined;
    if (args[0] === 'pr') {
      const res = await axios.get(
        'https://official-joke-api.appspot.com/jokes/programming/random'
      );
      data = res.data[0];
    } else {
      const res = await axios.get(
        'https://official-joke-api.appspot.com/jokes/general/random'
      );
      data = res.data[0];
    }
    return client.sendText(message.chatId, `*${data.setup}*${data.punchline}`);
  },
};
