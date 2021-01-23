const userNotificationController = require('../controllers').userNotification;

var rootAPIPath = '/api/notification/v1/';

module.exports = (app) => { 

  app.get(rootAPIPath, (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.post(rootAPIPath + 'email_verification', userNotificationController.generateEmailVerification);
  app.post(rootAPIPath + 'forgot_password', userNotificationController.generateForgotPassword);

};