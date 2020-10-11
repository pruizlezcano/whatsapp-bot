const { decryptMedia } = require('@open-wa/wa-decrypt');

module.exports = {
  name: 'sticker',
  description: 'Convert image to sticker',
  async execute(message, client, args) {
    const isUrl = new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi
    );
    const { isMedia, quotedMsg, chatId, mimetype } = message;
    if (isMedia) {
      const mediaData = await decryptMedia(message);
      const imageBase64 = `data:${mimetype};base64,${mediaData.toString(
        'base64'
      )}`;
      await client.sendImageAsSticker(chatId, imageBase64);
    } else if (quotedMsg && quotedMsg.type == 'image') {
      const mediaData = await decryptMedia(quotedMsg);
      const imageBase64 = `data:${
        quotedMsg.mimetype
      };base64,${mediaData.toString('base64')}`;
      await client.sendImageAsSticker(chatId, imageBase64);
    } else if (args.length >= 1) {
      const url = args[0];
      if (url.match(isUrl)) {
        await client
          .sendStickerfromUrl(chatId, url, { method: 'get' })
          .catch((err) => console.log('Caught exception: ', err));
      } else {
        client.sendText(chatId, 'Invalid URL');
      }
    } else {
      if (isGroupMsg) {
        client.sendTextWithMentions(
          chatId,
          `@${message.author} You did not tag a picture`
        );
      } else {
        client.reply(chatId, 'You did not tag a picture', message);
      }
    }
  },
};
