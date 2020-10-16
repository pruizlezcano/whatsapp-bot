const instagramdw = require('../utils/instagramdw');
const shortener = require('../utils/shortener');

const post = (url) =>
  new Promise((resolve, reject) => {
    console.log('Get metadata from =>', url);
    instagramdw.getInfo(url, {}, (error, info) => {
      if (error) {
        console.error(err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
module.exports = {
  name: 'instagram',
  description: 'Download video or photo from Instagram',
  async execute(message, client, args) {
    let url = undefined;
    if (!message.quotedMsg) {
      url = args[0];
    } else {
      url = message.quotedMsg.canonicalUrl;
    }
    const isUrl = new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi
    );
    if (
      !url.match(isUrl) & !url.includes('instagram.com') ||
      url.includes('t.co')
    ) {
      return client.reply(message.chatId, 'Invalid URL', message.id);
    }
    await client.reply(message.from, `Loading...`, message.id);

    const data = await post(url);
    if (data) {
      if (data.list[0].video) {
        const shortUrl = await shortener(data.list[0].video);
        console.log('Video link: ' + shortUrl);
        await client.sendFileFromUrl(
          message.chatId,
          data.list[0].video,
          'instagram.mp4',
          `Download link: ${shortUrl}`
        );
      } else if (data.list[0].image) {
        await client.sendFileFromUrl(
          message.chatId,
          data.list[0].image,
          'instagram.jpeg'
        );
      }
    } else {
      client.sendText(
        message.chatId,
        `An error occurred. Maybe the account is private`
      );
    }
  },
};
