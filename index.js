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
    const args = message.body.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = commands.get(commandName);

    if (!message.body.startsWith(prefix)) return;

    try {
      command.execute(message, client);
    } catch (error) {
      console.error(error);
      client.reply(
        message.from,
        `Invalid command.\nUse ${prefix}help to see all available commands `,
        message.id
      );
    }
  });
};

create('session')
  .then(async (client) => startServer(client))
  .catch((error) => console.log(error));
