const translator = require('../utils/transaltor');
module.exports = {
  name: 'translate',
  description: 'Translate text to a given language',
  async execute(message, client, args) {
    let text = '';
    if (!message.quotedMsg) {
      text = args.reduce((prev, act) => (prev = prev + ' ' + act));
    } else {
      text = message.quotedMsg.body;
    }
    const to = args.shift();
    const translate = await translator(text, to);
    await client.reply(message.from, translate, message.id);
  },
};
