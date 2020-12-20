import axios from 'axios';

const port = 4000;
const domain = process.env.VUE_APP_WEBSITE_DOMAIN;
const url = `${domain}:${port}/`;

console.log(process.env.VUE_APP_WEBSITE_DOMAIN);
console.log(`The url is ${url}`);
console.log(process.env);

export default axios.create({
  baseURL: url,
});
