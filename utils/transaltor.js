const axios = require('axios');

const translator = async (text, to) => {
  const { data } = await axios.get(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${to}&dt=t&dt=t&q=${text}`
  );
  return data[0][0][0];
};

module.exports = translator;
