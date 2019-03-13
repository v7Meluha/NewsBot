const actions = require("./actions");

function returnResponse(action, params) {
  return actions
    .getNews(params)
    .then(function(result) {
      if (!result) {
        result =
          "Hmm.. I'm not able to find news for that. Anything else in specific?";
      }
      return result;
    })
    .then(function(news) {
      return fulfillmentTextResponse(news);
    })
    .catch(function(err) {
      console.log(err);
      return err;
    });
}
exports.returnResponse = returnResponse;

var fulfillmentTextResponse = function(news) {
  return {
    fulfillmentText: "news",
    fulfillmentMessages: [
      {
        platform: "TELEGRAM",
        payload: {
          telegram: {
            text: news,
            parse_mode: "Markdown"
          }
        }
      }
    ]
  };
};
