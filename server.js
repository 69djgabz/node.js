const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync("server.log", log + "\n");
  next();
});
/* 
app.use((req, res, next) => {
  res.render("maintenance.hbs");
});
 */
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  // res.send("<h1>Hello Express!</h1>");
  res.send({
    name: "Gabi",
    likes: ["swimming", "laughing"]
  });
});
app.get("/home", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "home page",
    welcomeMessage: "welcome to Home page!"
  });
});

app.get("/About", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About page"
  });
});
app.get("/bad", (req, res) => {
  res.send({ errorMessage: "Unable to handle request" });
});

app.listen(3000);
