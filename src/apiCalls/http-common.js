import axios from 'axios';

export let mode = 'local';
// export let mode = "prod";

let baseValues = {
  baseProtocol: {
    local: 'https://',
    prod: 'https://',
  },
  baseHost: {
    local: 'backend.babybowl.life/',
    prod: 'backend.babybowl.life/',
  },
};

let baseProtocol = baseValues.baseProtocol[mode];
let baseHost = baseValues.baseHost[mode];
export const baseURL = baseProtocol + baseHost;

const HTTP = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { HTTP };
