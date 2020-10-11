const { create } = require('@open-wa/wa-automate');
const { prefix } = require('./config/config');
const fs = require('fs');

const startServer = async (client) => {
  console.log('[SERVER] Server Started!');
  // Force it to keep the current session
  client.onStateChanged((state) => {
    console.log('[Client State]', state);
    if (state === 'CONFLICT') client.forceRefocus();
  });

  // Commands list
  let commands = new Map();
  const commandFiles = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
  }

  // Listening on message
  client.onAnyMessage((message) => {
    let args = message.body.slice(prefix.length).split(/ +/);
    if (message.isMedia) {
      args = message.caption.slice(prefix.length).split(/ +/);
    }
    const commandName = args.shift().toLowerCase();
    const command = commands.get(commandName);

    if (!message.body.startsWith(prefix) && !message.caption.startsWith(prefix))
      return;

    try {
      command.execute(message, client, args);
    } catch (error) {
      if (message.isGroupMsg) {
        client.sendTextWithMentions(
          message.from,
          `@${message.author} Invalid command.\nUse ${prefix}help to see all available commands`
        );
      } else {
        client.reply(
          message.from,
          `Invalid command.\nUse ${prefix}help to see all available commands`,
          message.id
        );
      }
      console.error(error);
    }
  });
};
const chromePath = {
  win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Windows 32 bit
  win64: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', // Windows 64 bit
  linuxChrome: '/usr/bin/google-chrome-stable', // Linux - Chrome
  linuxChromium: '/usr/bin/chromium-browser', // Linux - Chromium
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // MacOS
};

if (fs.existsSync(chromePath.win32)) {
  execPath = chromePath.win32;
} else if (fs.existsSync(chromePath.win64)) {
  execPath = chromePath.win64;
} else if (fs.existsSync(chromePath.linuxChrome)) {
  execPath = chromePath.linuxChrome;
} else if (fs.existsSync(chromePath.linuxChromium)) {
  execPath = chromePath.linuxChromium;
} else if (process.platform === 'darwin') {
  execPath = chromePath.darwin;
} else {
  console.error(new Error('Google Chrome Is Not Installed'));
  process.exit(1);
}
const options = {
  headless: true,
  qrRefreshS: 20,
  qrTimeout: 0,
  authTimeout: 0,
  autoRefresh: true,
  restartOnCrash: startServer,
  cacheEnabled: false,
  executablePath: execPath,
  useChrome: true,
  killProcessOnBrowserClose: true,
  throwErrorOnTosBlock: false,
  chromiumArgs: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--aggressive-cache-discard',
    '--disable-cache',
    '--disable-application-cache',
    '--disable-offline-load-stale-cache',
    '--disk-cache-size=0',
  ],
};

create('session', options)
  .then(async (client) => startServer(client))
  .catch((error) => console.log(error));
