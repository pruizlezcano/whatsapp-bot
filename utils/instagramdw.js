// The following code is edited from https://github.com/catcto/video-url-link
// Unfortunately the original code was removed from the repo

const request = require('request');
const _ = require('lodash');

const getReqOpt = (options) => {
  let defaultOptions = {
    gzip: true,
    method: 'GET',
    timeout: 5000,
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    },
    jar: true,
  };
  return _.extend(defaultOptions, options);
};

exports.getInfo = (url, options, callback) => {
  if (typeof options === 'function') (callback = options), (options = {});
  options = getReqOpt(options);
  options.url = url;
  request(options, (error, response, body) => {
    if (error) {
      callback(error);
    } else {
      if (response.statusCode == 200 && body) {
        const data =
          JSON.parse(
            body.match(
              /<script type="text\/javascript">window._sharedData = (.*);<\/script>/
            )[1]
          ) || {};
        let type = undefined;
        if (data.entry_data.PostPage) {
          type = data.entry_data.PostPage[0].graphql.shortcode_media.__typename;
        } else {
          return callback(error);
        }
        let info = {};
        if (type === 'GraphImage') {
          info.list = [
            {
              image:
                data.entry_data.PostPage[0].graphql.shortcode_media.display_url,
            },
          ];
        } else if (type === 'GraphSidecar') {
          info.list = data.entry_data.PostPage[0].graphql.shortcode_media.edge_sidecar_to_children.edges.map(
            (item) => ({
              image: item.node.display_url,
              video: item.node.video_url,
            })
          );
        } else if (type === 'GraphVideo') {
          info.list = [
            {
              image:
                data.entry_data.PostPage[0].graphql.shortcode_media.display_url,
              video:
                data.entry_data.PostPage[0].graphql.shortcode_media.video_url,
            },
          ];
        }
        callback(null, info);
      } else {
        callback(new Error('Not Found instagram'));
      }
    }
  });
};
