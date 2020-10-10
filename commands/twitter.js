const { twitter } = require('video-url-link');
const shortener = require('../utils/shortener');

const tweet = (url) =>
  new Promise((resolve, reject) => {
    console.log('Get metadata from =>', url);
    twitter.getInfo(url, {}, (error, info) => {
      if (error) {
        console.error(err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
module.exports = {
  name: 'twitter',
  description: 'Download video from Twitter',
  async execute(message, client, args) {
    let url = undefined;
    if (!message.quotedMsg) {
      url = args[0];
    } else {
      console.log(message.quotedMsg);
    }
    const isUrl = new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi
    );
    if (
      !url.match(isUrl) & !url.includes('twitter.com') ||
      url.includes('t.co')
    )
      return client.reply(message.chatId, 'Invalid URL', message.id);
    await client.reply(message.from, `Loading...`, message.id);

    const data = await tweet(url);
    const info = data.variants[data.variants.length - 1];
    if (info.content_type === 'video/mp4') {
      const shortUrl = await shortener(info.url);

      console.log('Video link: ' + shortUrl);
      await client.sendFileFromUrl(
        message.chatId,
        info.url,
        'twitter.mp4',
        `Download link: ${shortUrl}`
      );
    }
  },
};
