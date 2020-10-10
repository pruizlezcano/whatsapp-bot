const axios = require('axios');

const shortener = async (url) => {
  const res = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`);
  return res.data;
};

module.exports = shortener;
