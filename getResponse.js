const messageBuilder = require("./messageBuilder");
const { checkParams } = require("./checkParams");
const { getUrl } = require("./generateUrl");
const { getFeed } = require("./feed");

var getResponse = function(action, inputParams) {
  var params = Object.assign({}, inputParams);
  var params = checkParams(params);
  console.log("params" + JSON.stringify(params));
  if (params !== null) {
    console.log(JSON.stringify(inputParams));
    var message = messageBuilder(inputParams);
    var URL = getUrl(params);

    return getFeed(URL)
      .then(function(feed) {
        if (message == null) throw new Error("Empty");
        message += feed;
        return message;
      })
      .then(function(news) {
        console.log(news);
        return fulfillmentTextResponse(news);
      })
      .catch(function(err) {
        var text =
          "Hmm...Couldn't find news for that. Anything else in specific?";
        return fulfillmentTextResponse(text);
      });
  } else {
    throw new Error(
      "Oops. Can't find news from the given date. Anything else?"
    );
  }
};
exports.getResponse = getResponse;

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
