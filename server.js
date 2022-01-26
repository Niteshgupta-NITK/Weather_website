const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
//
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
//
const viewsPath = path.join(__dirname + "/templates/views");
const partialsPath = path.join(__dirname + "/templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname, "/public")));
//

//
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App"
  });
});
app.get("/weather", (req, res) => {
  const q = req.query;
 

  geocode.module(q.city, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({location:"Error Occurred ,Retry!"});
    } else {
      forecast.module(latitude, longitude, (err, temp,prec) => {
        if (err) {
          return res.send({location:"Something went wrong"})
        } else {
          console.log("City is " + location);
          res.send({
              location:"City is "+location,
              temp:"Temperature is "+ temp+" `C",
              prec:"Chance of ranifall is "+prec+" %",
          })
        }
      });
    }
  });

});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About US",
  content:"Drop a mail at  guptanitesh400@gmail.com"
  });
});

app.get("*", (req, res) => {
  res.send("404 Page Not found!");
});

app.listen(3000, () => {
  console.log("server is up in port 3000!");
});
