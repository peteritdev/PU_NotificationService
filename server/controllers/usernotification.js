// User Service
const UserNotificationService = require('../services/usernotificationservice.js');
const userNotificationServiceInstance = new UserNotificationService();

//Library
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

module.exports = { generateEmailVerification, generateForgotPassword };

async function generateEmailVerification( req, res ){
    var joResult;

    joResult = await userNotificationServiceInstance.generateEmailVerification(req.body);

    res.setHeader('Content-Type','application/json');
    res.status(200).send(joResult); 
}

async function generateForgotPassword( req, res ){
    var joResult;

    console.log(JSON.stringify(req.body));

    joResult = await userNotificationServiceInstance.generateForgotPassword(req.body);

    res.setHeader('Content-Type','application/json');
    res.status(200).send(joResult); 
}