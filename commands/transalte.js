const translator = require('../utils/transaltor');
module.exports = {
  name: 'translate',
  description: 'Translate text to a given language',
  async execute(message, client, args) {
    const to = args.shift();
    const text = args.reduce((prev, act) => (prev = prev + ' ' + act));
    const translate = await translator(text, to);
    return client.sendText(message.chatId, translate);
  },
};
