const http = require('http');
const mongoose = require('mongoose');
const ad = require('./ad');
const jalali = require('jalaali-js'); 
module.exports.latest = function(req, response, next) {
    http.get({hostname: 'api.fixer.io',path: '/latest'}, (res) => {
        var body = "";
        res.on('data', function(d) {
            body += d;
        });
        res.on('end', function() {
            var parsed = JSON.parse(body);
            response.send(parsed);
            return next();
        });
    });
}
module.exports.getAds = function(req, res, next) {
    ad.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, data) {
        if (err)
            console.log(err);
        else {
            res.send(data);
            return next();
        }
    })
}
module.exports.stom = function(req, res, next) {
    var birthdateString = req.body["date"];
    var year = parseInt(birthdateString.split("-")[0]);
    var month = parseInt(birthdateString.split("-")[1]);
    var day = parseInt(birthdateString.split("-")[2]);
    res.send(jalali.toGregorian(year, month, day));
    return next();
}
module.exports.mtos = function(req, res, next) {
    var birthdateString = req.body["date"];
    var year = parseInt(birthdateString.split("-")[2]);
    var month = parseInt(birthdateString.split("-")[1]);
    var day = parseInt(birthdateString.split("-")[0]);
    res.send(jalali.toJalaali(year, month, day));
    return next();
}
module.exports.insert = function(req, res, next) {
    var adSample = new ad({
        title: "sample title",
        content: "sample content",
        pic: "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwj3uO6G7OrUAhUC6xoKHeiDA40QjRwIBw&url=http%3A%2F%2Fwww.coca-colacompany.com%2Fvintage-coca-cola-bottle-advertisements&psig=AFQjCNGPjijhXwsSQ0KsCORUC5aTihxXtQ&ust=1499093349232445"
    });
    adSample.save(function(err) {
        if (err) 
            console.log(err);
        else
            return next();
    });
}