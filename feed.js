let axios = require("axios");
const _ = require("lodash");

async function getFeed(URL) {
  return axios
    .get(URL)
    .then(function(response) {
      return formatFeed(response.data.articles);
    })
    .then(function(list) {
      if (list) return list;
      else throw new Error("no_list");
    });
}

exports.getFeed = getFeed;

var formatFeed = function(articles) {
  var i = 0,
    str = "Read more..",
    list = "";

  articles = articles.slice(0, 5);
  for (i = 0; i < 5; i++) {
    list += `\n${i + 1}. ${articles[i].title} | [${str}](${
      articles[i].url
    })\n\n`;
  }
  return list;
};
