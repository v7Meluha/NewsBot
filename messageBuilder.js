const _ = require("lodash");
const moment = require("moment");
const {
  DC,
  CN,
  C,
  D,
  N,
  all,
  sports,
  entertainment,
  latestSports,
  latestCinema,
  latestEntertainment,
  latestcountry,
  country
} = require("./config");

module.exports = function(params, feed) {
  var message = "",
    result = compareArray(params),
    date = Dates(params.date);
  if (!date) {
    result = 13;
  }

  console.log(result);
  switch (result) {
    case 1:
      message = `Okay. Here is the ${params.news_sorters} ${
        params.category
      } news for you:`;
      break;

    case 2:
      message = `Got it. Here is the ${params.category} news from ${date}:`;
      break;

    case 3:
      message = `Done. Here is the ${params.category} news:`;
      break;

    case 4:
      if (date == "today" || date == "yesterday" || date == "last week")
        message = `Here is what happened ${date}: `;
      else message = `Okay. Here is the news from ${date}:`;
      break;

    case 5:
      message = ` Trending news it is! Here you go:`;
      break;

    case 6:
      message = `Here is the ${params["news-sorters"]} ${
        params.category
      } news for ${date}:`;
      break;

    case 7:
      message = `Alrighty. Here is the ${params["sports-categories"]} news:`;
      break;

    case 8:
      message = `Here's what I found interesting in ${
        params["entertainment-categories"]
      }s:`;
      break;

    case 9:
      message = `Here's the ${params["news-sorters"]} ${
        params["sports-categories"]
      } news for ${date}:`;
      break;

    case 10:
      message = `Alright. I've got you the ${params["news-sorters"]} news for ${
        params["entertainment-categories"]
      } :`;
      break;

    case 11:
      message = `Okay. I've got you some news from ${
        params.country.name
      }! Here you go`;
      break;

    case 12:
      message = `Voila! Here's news from all over the planet:`;
      break;

    default:
      message = null;
      break;
  }

  message = `*${message}*\n`;

  return message;
};

function compareArray(params) {
  params = cleanParams(params);
  var keys = Object.keys(params);
  if (params == []) return 11;

  if (_.isEqual(keys.sort(), CN.sort())) result = 1;
  else if (_.isEqual(keys.sort(), DC.sort())) result = 2;
  else if (_.isEqual(keys.sort(), C.sort())) result = 3;
  else if (_.isEqual(keys.sort(), D.sort())) {
    result = 4;
  } else if (_.isEqual(keys.sort(), N.sort())) result = 5;
  else if (_.isEqual(keys.sort(), all.sort())) {
    result = 6;
  } else if (_.isEqual(keys.sort(), sports.sort())) {
    result = 7;
  } else if (_.isEqual(keys.sort(), entertainment.sort())) {
    result = 8;
  } else if (_.isEqual(keys.sort(), latestSports.sort())) {
    result = 9;
  } else if (_.isEqual(keys.sort(), latestEntertainment.sort())) {
    result = 10;
  } else if (_.isEqual(keys.sort(), country.sort())) {
    result = 11;
  } else if (_.isEqual(keys.sort(), latestcountry.sort())) {
    result = 11;
  } else result = 12;
  return result;
}

function Dates(date) {
  var givenDate = moment(date).startOf("day");
  var today = moment().startOf("day");
  var difference = givenDate.diff(today, "days");
  console.log("difference" + difference);
  if (difference == 0) return "today";
  else if (difference == -1) return "yesterday";
  else if (difference == -8) return "last week";
  else if (difference > 0) return false;
  else date = `${moment(date).format("MMMM")} ${moment(date).format("DD")}`;
  return date;
}

exports.Dates = Dates;

function cleanParams(params) {
  if (params["date-period"] !== "") {
    params.date = params["date-period"].startDate;
    delete params["date-period"];
  }
  return _.pickBy(params, _.identity);
}
