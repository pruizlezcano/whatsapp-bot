const youtubedl = require('youtube-dl');
const shortener = require('../utils/shortener');

const tweet = (url) =>
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
  name: 'twitter',
  description: 'Download video from Twitter',
  usage: 'twitter [url]\nYou can use a queted message instead a url',
  async execute(message, client, args) {
    let url = undefined;
    if (!message.quotedMsg) {
      url = args[0];
    } else {
      url = message.quotedMsg.canonicalUrl;
    }
    if (url == undefined) {
      const body = message.quotedMsg.body.split(' ');
      for (i of body) {
        if (i.indexOf('http') != -1) {
          url = i;
        }
      }
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

    const info = await tweet(url);
    const shortUrl = await shortener(info.url);

    console.log('Video link: ' + shortUrl);
    await client.sendFileFromUrl(
      message.chatId,
      info.url,
      'twitter.mp4',
      `Download link: ${shortUrl}`
    );
  },
};
