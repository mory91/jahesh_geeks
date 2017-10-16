var restify = require('restify');
const restifyBodyParser = require('restify-plugins').bodyParser;

var mongoose = require('mongoose');
var funcs = require('./functions');
const ad = require('./ad');

var server = restify.createServer();

mongoose.connect("mongodb://localhost:27017/jahesh")

server.use(restifyBodyParser());

server.name = "Jahesh_geeks";

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});


server.get('/latest', funcs.latest);
server.get('/ad', funcs.getAds);
server.post('/mtos', funcs.mtos);
server.post('/stom', funcs.stom);

server.get('/insert', funcs.insert);

