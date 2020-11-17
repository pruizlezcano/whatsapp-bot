const Imgflip = require('../utils/imgflip');
const fs = require('fs');

const memeAlias = {
  marvelcivilwar: {
    id: 28034788,
    url: 'https://imgflip.com/memetemplate/Marvel-Civil-War-1',
  },
  alienmeeting: {
    id: 23504024,
    url: 'https://imgflip.com/memetemplate/Alien-Meeting-Suggestion',
  },
  alienmeetingduplicate: {
    id: 193343210,
    url: 'https://imgflip.com/memetemplate/193343210/Duplicated-alien-meeting',
  },
  whatdowewant: {
    id: 19209937,
    url: 'https://imgflip.com/memetemplate/What-Do-We-Want-3',
  },
  obiwan: {
    id: 409403,
    url: 'https://imgflip.com/memetemplate/Obi-Wan-Kenobi',
  },
  siderman: {
    id: 110133729,
    url:
      'https://imgflip.com/memetemplate/110133729/spiderman-pointing-at-spiderman',
  },
  spidermantriple: {
    id: 206151308,
    url: 'https://imgflip.com/memetemplate/206151308/Spider-Man-Triple',
  },
  peterparker: {
    id: 107773,
    url: 'https://imgflip.com/memetemplate/Spiderman-Peter-Parker',
  },
  inception: { id: 156892, url: 'https://imgflip.com/memetemplate/Inception' },
  joker: {
    id: 1790995,
    url: 'https://imgflip.com/memetemplate/And-everybody-loses-their-minds',
  },
  jokercar: {
    id: 179949504,
    url: 'https://imgflip.com/memetemplate/179949504/Joaquin-Phoenix-Joker-Car',
  },
  johnny: { id: 309172, url: 'https://imgflip.com/memetemplate/Heres-Johnny' },
  successkid: {
    id: 341570,
    url: 'https://imgflip.com/memetemplate/Success-Kid-Original',
  },
  imyourfather: {
    id: 19194965,
    url: 'https://imgflip.com/memetemplate/Star-Wars-No',
  },
  pulpfiction: {
    id: 124212,
    url: 'https://imgflip.com/memetemplate/Say-That-Again-I-Dare-You',
  },
  facepalm: {
    id: 1509839,
    url: 'https://imgflip.com/memetemplate/Captain-Picard-Facepalm',
  },
  spongebobimagine: {
    id: 163573,
    url: 'https://imgflip.com/memetemplate/Imagination-Spongebob',
  },
  signguy: {
    id: 216951317,
    url: 'https://imgflip.com/memetemplate/228391352/Guy-with-a-sign',
  },
  presidentialalert: {
    id: 157978092,
    url: 'https://imgflip.com/memetemplate/Presidential-Alert',
  },
  bikefall: { id: 79132341, url: 'https://imgflip.com/memetemplate/Bike-Fall' },
  neverland: {
    id: 6235864,
    url: 'https://imgflip.com/memetemplate/Finding-Neverland',
  },
  futuramaslick: {
    id: 168646,
    url: 'https://imgflip.com/memetemplate/Slick-Fry',
  },
  futurama: { id: 61520, url: 'https://imgflip.com/memetemplate/Futurama-Fry' },
  yoda: {
    id: 14371066,
    url: 'https://imgflip.com/memetemplate/Star-Wars-Yoda',
  },
  clown: {
    id: 195515965,
    url: 'https://imgflip.com/memetemplate/Clown-Applying-Makeup',
  },
  hidethepain: {
    id: 27813981,
    url: 'https://imgflip.com/memetemplate/Hide-the-Pain-Harold',
  },
  think: {
    id: 89370399,
    url: 'https://imgflip.com/memetemplate/Roll-Safe-Think-About-It',
  },
  aliensguy: {
    id: 101470,
    url: 'https://imgflip.com/memetemplate/Ancient-Aliens',
  },
  thisisfine: {
    id: 55311130,
    url: 'https://imgflip.com/memetemplate/This-Is-Fine',
  },
  butterfly: {
    id: 100777631,
    url: 'https://imgflip.com/memetemplate/Is-This-A-Pigeon',
  },
  sadescobar: {
    id: 80707627,
    url: 'https://imgflip.com/meme/Sad-Pablo-Escobar',
  },
  pooh: {
    id: 178591752,
    url: 'https://imgflip.com/memetemplate/Tuxedo-Winnie-The-Pooh',
  },
  poohtriple: {
    id: 176944602,
    url: 'https://imgflip.com/memetemplate/176944602/Fancy-pooh',
  },
  handshake: {
    id: 135256802,
    url: 'https://imgflip.com/memetemplate/Epic-Handshake',
  },
  waitingskeleton: {
    id: 4087833,
    url: 'https://imgflip.com/memetemplate/Waiting-Skeleton',
  },
  button: {
    id: 119139145,
    url: 'https://imgflip.com/memetemplate/Blank-Nut-Button',
  },
  treebuttons: {
    id: 152578644,
    url: 'https://imgflip.com/memetemplate/152578644/two-buttons-1-blue',
  },
  confusedcat: {
    id: 188390779,
    uls: 'https://imgflip.com/memetemplate/Woman-Yelling-At-Cat',
  },
  always: {
    id: 252600902,
    url: 'https://imgflip.com/memetemplate/Always-Has-Been',
  },
  thenvsnow: {
    id: 247375501,
    url: 'https://imgflip.com/memetemplate/Buff-Doge-vs-Cheems',
  },
  monkey: {
    id: 148909805,
    url: 'https://imgflip.com/memetemplate/Monkey-Puppet',
  },
  meeting: {
    id: 1035805,
    url: 'https://imgflip.com/memetemplate/Boardroom-Meeting-Suggestion',
  },
  amongusmeeting: {
    id: 265629618,
    url:
      'https://imgflip.com/memetemplate/265629618/Emergency-Meeting-Among-Us',
  },
  brain: {
    id: 93895088,
    url: 'https://imgflip.com/memetemplate/Expanding-Brain',
  },
  carexit: {
    id: 124822590,
    url: 'https://imgflip.com/memetemplate/Left-Exit-12-Off-Ramp',
  },
  uno: {
    id: 217743513,
    url: 'https://imgflip.com/memetemplate/UNO-Draw-25-Cards',
  },
  changemymind: {
    id: 129242436,
    url: 'https://imgflip.com/memetemplate/Change-My-Mind',
  },
  twobuttons: {
    id: 87743020,
    url: 'https://imgflip.com/memetemplate/Two-Buttons',
  },
  boyfriend: {
    id: 112126428,
    url: 'https://imgflip.com/memetemplate/Distracted-Boyfriend',
  },
  drake: {
    id: 181913649,
    url: 'https://imgflip.com/memetemplate/Drake-Hotline-Bling',
  },
  balloon: {
    id: 131087935,
    url: 'https://imgflip.com/memetemplate/224667758/Balloon',
  },
};
module.exports = {
  name: 'genmeme',
  description: 'Create a meme',
  usage: 'genmeme [memelist] alias text1;text2;...',
  async execute(message, client, args) {
    if (args[0] == 'memelist') {
      let reply = '';
      const iterator = Object.keys(memeAlias);
      for (item of iterator) {
        reply += `${item}: ${memeAlias[item].url}\n`;
      }
      await client.reply(message.chatId, reply, message.id);
    } else {
      let meme = memeAlias[args[0]].id;
      if (meme == undefined) {
        meme = args[0];
      }
      args.shift();
      const text = args.join(' ').split(';');
      const imgflip = new Imgflip({
        username: process.env.IMGFLIP_USER,
        password: process.env.IMGFLIP_PASSWORD,
      });
      // Caption and download a great meme!
      await imgflip.meme(meme, {
        captions: text,
        path: `meme.png`,
      });

      await client.sendImage(message.chatId, './meme.png', 'meme', 'Your meme');
      try {
        fs.unlinkSync('./meme.png');
      } catch {}
    }
  },
};
