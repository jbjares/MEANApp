var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('env: '+env);
var app = express();

function compile(str,path){
    return stylus(str).set('filename',path);
}

app.set('views',__dirname+'/server/views');
app.set('view engine','jade');
app.use(logger('dev'));
app.use(bodyParser());
app.use(stylus.middleware({
    src:__dirname+'/public',
    compile: compile

}
));
app.use(express.static(__dirname+'/public'));

if(env==='development'){
    console.log('dev db');
    mongoose.connect('mongodb://localhost/multivision');
}else{
    console.log('prod db');
    mongoose.connect('mongodb://jbjares:multivision@ds061371.mongolab.com:61371/multivision_jbjares');
}

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error!'));
db.once('open',function callback(){
    console.log('db opened...');
});
//var MessageModel = mongoose.model('Message',{message:String});
//var mongoMessage;
//MessageModel.findOne().exec(function(err,messageDoc){
//    mongoMessage = messageDoc.message;
//});

app.get('/partials/:partialPath', function (request,response) {
    console.log('partialPath log: '+request.params.partialPath);
    response.render('partials/'+request.params.partialPath);
})

app.get('*',function(request,response){
    console.log('*');
    response.render('index'
        //, {mongoMessage:mongoMessage}
    );
});



var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port '+port+'...');
