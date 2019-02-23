var request = require('request');

var sites = [
  'http://joewoodsworks.com',
  'http://failbetter.com',
  'https://failbetter.editorland.com'
];

module.exports = () => {
  sites.map((site) => {
    console.log(site);
    request.get(site, (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        console.log(response.statusCode);
      }
    });
  });
}

// return results;