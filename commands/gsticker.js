const { decryptMedia } = require('@open-wa/wa-decrypt');
const fs = require('fs');
const { execSync } = require('child_process');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

module.exports = {
  name: 'gsticker',
  description: 'Convert video to gif stickern (not working)',
  usage: 'gsticker with a quoted message or in the video/gif caption',
  async execute(message, client, args, hostname) {
    const { isMedia, quotedMsg, chatId, mimetype } = message;
    try {
      if (isMedia && message.type == 'video') {
        const mediaData = await decryptMedia(message);
        const data = `data:${mimetype};base64,${mediaData.toString('base64')}`;
        await client.sendMp4AsSticker(chatId, data, {
          endTime: '00:00:10.5',
          fps: 25,
          loop: 0,
          startTime: '00:00:00.0',
        });

        console.log('fin');
      } else if (quotedMsg && quotedMsg.type == 'video') {
        const mediaData = await decryptMedia(quotedMsg);
        const data = `data:${quotedMsg.mimetype};base64,${mediaData.toString(
          'base64'
        )}`;
        await client.sendMp4AsSticker(chatId, data, {
          endTime: '00:00:10.5',
          fps: 25,
          loop: 0,
          startTime: '00:00:00.0',
        });
      }
    } catch (error) {
      throw new Error();
    }
  },
};
