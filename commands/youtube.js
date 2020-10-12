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
    const video = await ytdl.getInfo(url);
    const videoSort = video.formats.sort(
      (a, b) => parseInt(b.height) - parseInt(a.height)
    );
    const videoData = videoSort.filter(
      (format) =>
        format.container === 'mp4' &&
        format.hasAudio === true &&
        format.hasVideo === true
    )[0];
    const shortUrl = await shortener(videoData.url);
    console.log('Video link: ' + shortUrl);
    await client.sendFileFromUrl(
      message.chatId,
      videoData.url,
      'youtube.mp4',
      `Download link: ${shortUrl}`
    );
  },
};
