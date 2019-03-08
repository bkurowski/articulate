import { API_URL } from '../../common/env';

const handler = (request, h) => {
  const baseURL = API_URL;
  console.log(`proxy`);
  let uri;
  uri = request.params.paths ? `${baseURL}/${request.params.paths}` : `${baseURL}`;
  uri = `${uri}${request.url.search}`;
  console.log(`proxy:uri: "${uri}"`);
  return h.proxy({ uri });
};

export default [
  {
    method: '*',
    path: `/api`,
    config: {
      handler,
      payload: {
        parse: false,
      },
    },
  }, {
    method: '*',
    path: `/api/{paths*}`,
    config: {
      handler,
      payload: {
        parse: false,
      },
    },
  },
  {
    method: 'GET',
    path: `/api`,
    config: {
      handler,
    },
  }, {
    method: 'GET',
    path: `/api/{paths*}`,
    config: {
      handler,
    },
  },
];
