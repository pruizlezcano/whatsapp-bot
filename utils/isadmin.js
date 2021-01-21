const isadmin = async (message, client) => {
  const user = message.author;
  const admins = await client.getGroupAdmins(message.chatId);
  if (admins.includes(user)) {
    return true;
  } else {
    return false;
  }
};

module.exports = isadmin;
