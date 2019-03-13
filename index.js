var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Bot = require("./getResponse");

app.use(bodyParser.json());

app.use(express.json());

app.post("/", (req, res) => {
  var action = req.body.queryResult.action;
  var params = req.body.queryResult.parameters;
  var news = Bot.getResponse(action, params)
    .then(function(news) {
      res.json(news);
    })
    .catch(function(err) {
      res.json(err);
    });
});
app.listen(8000, () => console.log("starting server"));
