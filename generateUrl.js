function encodeQueryData(data) {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  return ret.join("&");
}

function getUrl(params) {
  params.language = "en";
  var data,
    feedURL =
      "https://newsapi.org/v2/top-headlines?apiKey=6444e93fd05f47c381f4cd24dbcb7957&";
  feedURL += encodeQueryData(params);
  console.log(feedURL);
  return feedURL;
}

exports.getUrl = getUrl;
