'use strict';
var express    = require('express');
var cors       = require('cors');
var bodyParser = require("body-parser");
var dotenv     = require('dotenv').config();
var nodemailer = require('nodemailer');
var smtpTrans  = require('nodemailer-smtp-transport');
var validator  = require("email-validator");
var sanitize   = require('sanitize-html');

var smtp  = { "auth": {}, "port": 465, "secure": true, "tls": {"rejectUnauthorized": false}, "debug": false};
smtp.host      = process.env.SMTP_HOST;
smtp.auth.user = process.env.SMTP_USER;
smtp.auth.pass = process.env.SMTP_PASS;
var transporter = nodemailer.createTransport(smtpTrans(smtp));

var app = express();
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({limit: '1mb', extended: false}));
app.use(bodyParser.json({limit: '1mb'}));
app.use(cors({origin: process.env.ALLOW_ORIGIN, 
    allowedHeaders: ['Content-Type', 'application/json; charset=utf-8', 'text/html; charset=utf-8']}));

app.use('/v1/assets', express.static(__dirname + '/assets'));

app.post('/v1/contact', function(req, res) {
    if(validator.validate(req.body.email)) return sendEmail(req.body, res);  
    res.status(403).json({"validation": "no email"});
});

app.get('/v1/demo', function(req, res) {
    res.sendFile(__dirname + '/demo.html');
});

app.listen(process.env.PORT || 7000, function(){
	console.log('Listening on http://localhost:' + (process.env.PORT || 7000));
});

function sendEmail(data, res){
    var email = { "from": process.env.EMAIL_FROM, "to": process.env.EMAIL_TO};
    email.subject = 'MY BLOG - ' + (data.subject && data.subject.toUpperCase());

    const output = `
        <p>Hello,<p>
        <p>You got a new contact request.</p>
        <h3>Contact Details</h3>
        <ul><li>Name: ${data.name}</li><li>Email: ${data.email}</li></ul>
        <h3>Message:</h3>
        <p>${data.message}</p>
    `
    email.html = sanitize(output, { 
    	allowedTags: sanitize.defaults.allowedTags.concat([ 'img' ])
	});
    transporter.sendMail(email, function(error, info){
        if(error) return res.json({"sendEmail": "failed"});
        res.json({"sendEmail": "ok"});
    });
};