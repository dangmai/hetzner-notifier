var $ = require("cheerio");
var nodemailer = require("nodemailer");
var rc = require("rc");
var request = require("request");

var config = rc("hetzner-notifier", {
    country: "US",
    ram: "",
    hdnr: "",
    hdsize: "",
    text: "",
    smtp_host: "",
    smtp_port: 25,
    smtp_username: "",
    smtp_password: "",
    smtp_accept_unauthorized: false,
    email_from: "hetzner@me.com",
    email_to: "",
    threshold: 30
});

var url = "https://robot.your-server.de/order/market";
var countryUrl = url + "/country/" + config.country;

// We don't set the maxprice here, since we want to get the next lowest price when nothing under
// the threshold is found.
var formData = {
  ram: config.ram,
  hdnr: config.hdnr,
  hdsize: config.hdsize,
  maxprice: "",
  text: config.text,
  limit: "100"
};

if (!config.smtp_host) {
  console.error("Please specity SMTP host");
  process.exit(1);
}

if (!config.email_to) {
  console.error("Please specify the email address to send notifications to");
  process.exit(1);
}

var transporter = nodemailer.createTransport({
    host: config.smtp_host,
    port: config.smtp_port,
    auth: {
        user: config.smtp_username,
        pass: config.smtp_password
    },
    tls: {
        rejectUnauthorized: !config.smtp_accept_unauthorized
    }
});

var jar = request.jar();
request = request.defaults({jar: jar});

// We go to the country page first, because the pricing is dependent on the country the visitor
// chooses. By going to the page, a cookie is set so that subsequent search gets the correct prices
request.get(countryUrl, function () {
  request.post(url, {form: formData}, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      console.error("Error getting Hetzner webpage: " + body);
      process.exit(2);
    }
    var lowestPrice = $(body).find(".order_price").eq(2).text().split(" ")[1];
    if (Number(lowestPrice) <= config.threshold) {
      var mailOptions = {
          from: config.email_from, // sender address
          to: config.email_to, // list of receivers
          subject: "Hetzner Server deal found", // Subject line
          text: "Hetzner server dropped under " + config.threshold, // plaintext body
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error("Error sending email notification: " + error);
            process.exit(3);
        } else {
            console.log('Email notification sent: ' + info.response);
        }
      });
    } else {
      console.log("Nothing found. The cheapest deal is " + lowestPrice);
    }
  });
});
