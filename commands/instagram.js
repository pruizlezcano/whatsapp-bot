const youtubedl = require('youtube-dl');
const shortener = require('../utils/shortener');

const post = (url) =>
  new Promise((resolve, reject) => {
    console.log('Get metadata from =>', url);
    youtubedl.getInfo(url, [], function (err, info) {
      if (err) {
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
  usage: 'instagram [url]\nYou can use a queted message instead a url',
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

    let data = undefined;
    try {
      data = await post(url);
    } catch (e) {
      client.sendText(
        message.chatId,
        `An error occurred. Maybe the account is private`
      );
    }
    if (data) {
      console.log(data);
      if (data.ext == 'mp4') {
        const shortUrl = await shortener(data.url);
        console.log('Video link: ' + shortUrl);
        await client.sendFileFromUrl(
          message.chatId,
          data.url,
          'instagram.mp4',
          `Download link: ${shortUrl}`
        );
      } else {
        client.sendText(message.chatId, 'That is not a video');
      }
    }
  },
};
