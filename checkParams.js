const _ = require("lodash");
const moment = require("moment");

var checkParams = function(input) {
  var valid = true;
  if (input["date-period"]!= '') {
    valid = isValid(input["date-period"].startDate)
    if (valid) {
      input.from = input["date-period"].startDate
      input.to = input["date-period"].endDate
    }
    delete input["date-period"]
  }

  if (input.date != '') {
    valid = isValid(input.date)
    console.log(valid)
    if (valid) {
      input.from = input.date

    } 
    delete input.date
  }

  if (input.country != '') {
    input.country = input.country["alpha-2"]
  }

  input = _.pickBy(input, _.identity)
  console.log("input" + JSON.stringify(input))
  if(!valid)
    return null

  return input;
}

exports.checkParams = checkParams

var isValid = function(date) {
  date = moment(date).format()
  var today = moment().startOf('day');
  var period = today.diff(date, 'days')
  console.log("period " + period)
  return period > -2 && period < 30
}