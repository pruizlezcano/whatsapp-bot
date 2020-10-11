const fs = require('fs');
const ytdl = require('ytdl-core');
const shortener = require('../utils/shortener');

module.exports = {
  name: 'youtube',
  description: 'Download video from YouTube',
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
    if (!url.match(isUrl) & !url.includes('youtube.com'))
      return client.reply(message.chatId, 'Invalid URL', message.id);
    await client.reply(message.from, `Loading...`, message.id);
    const filename = './media/youtube.mp4';
    try {
      fs.mkdirSync('./media');
    } catch (error) {}
    const video = await ytdl.getInfo(url, {
      filter: (format) => format.container === 'mp4',
    });

    const videoUrl = video.formats.sort(
      (a, b) => parseInt(b.height) - parseInt(a.height)
    )[0].url;
    const shortUrl = await shortener(videoUrl);
    console.log('Video link: ' + shortUrl);
    await client.sendFileFromUrl(
      message.chatId,
      videoUrl,
      'youtube.mp4',
      `Download link: ${shortUrl}`
    );
  },
};
