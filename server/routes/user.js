const userNotificationController = require('../controllers').userNotification;

var rootAPIPath = '/api/notification/v1/';

module.exports = (app) => { 

  app.get(rootAPIPath, (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));
  
  app.post(rootAPIPath + 'email_verification', userNotificationController.generateEmailVerification);
  app.post(rootAPIPath + 'forgot_password', userNotificationController.generateForgotPassword);

};