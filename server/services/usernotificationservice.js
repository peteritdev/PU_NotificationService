const jwt = require('jsonwebtoken');
const md5 = require('md5');
const crypto = require('crypto');
const moment = require('moment');
const sequelize = require('sequelize');
const dateFormat = require('dateformat');
const Op = sequelize.Op;
var config = require('../config/config.json');
const nodeMailer = require('nodemailer');

// Model
const modelUser = require('../models').ms_notificationtemplates;

//Repository
const UserNotificationRepository = require('../repository/usernotificationrepository.js');
const userNotificationRepoInstance = new UserNotificationRepository();

//Utility
const Util = require('../utils/globalutility.js');
const { link } = require('fs');
const utilInstance = new Util();

class UserNotificationService {

    constructor(){}

    async generateEmailVerification(param){

        var joResult;
        var rsNotificationTemplate = await userNotificationRepoInstance.getNotificationTemplateByCode( "EMAIL_VERIFICATION" );

        if( rsNotificationTemplate != null ){

            //Replace variable with data
            var body = rsNotificationTemplate.body;
            body = body.replace("#USER_NAME#", param.name);

            var verificationCode = param.email + config.frontParam.separatorData + param.id;
                                   console.log(">>> Code : " + verificationCode);
            verificationCode = await utilInstance.encrypt(verificationCode);
            var linkVerification = config.frontParam.emailVerificationLink;
            linkVerification = linkVerification.replace("#VERIFICATION_CODE#",verificationCode);

            body = body.replace("#LINK_VERIFICATION#", linkVerification);

            //Add to message queue
            var paramQueue = {
                type: 1,
                to: param.email,
                cc: "",
                subject: rsNotificationTemplate.subject,
                body: body
            };
            var resultAddQueue = await userNotificationRepoInstance.addNotificationToQueue(paramQueue);

            return JSON.stringify({
                "status_code":"00",
                "status_msg":"OK",
                "verification_link": linkVerification,
                "result_add_to_queue": resultAddQueue
            });
        }else{
            return JSON.stringify({
                "status_code":"-99",
                "status_msg":"Template not found"
            });
        }

        
    }

    async generateForgotPassword(param){

        var joResult;
        var rsNotificationTemplate = await userNotificationRepoInstance.getNotificationTemplateByCode( "FORGOT_PASSWORD" );

        if( rsNotificationTemplate != null ){

            //Replace variable with data
            var body = rsNotificationTemplate.body;
            body = body.replace("#USER_NAME#", param.name);
            body = body.replace("#NEW_PASSWORD#", param.new_password);

            //Add to message queue
            var paramQueue = {
                type: 1,
                to: param.email,
                cc: "",
                subject: rsNotificationTemplate.subject,
                body: body
            };
            var resultAddQueue = await userNotificationRepoInstance.addNotificationToQueue(paramQueue);

            console.log(JSON.stringify(resultAddQueue))

            if( resultAddQueue.status_code == '00' ){
                var xParamSend = {
                    message: {
                        from: config.mailerSetting.username,
                        to: param.email,
                        subject: rsNotificationTemplate.subject,
                        html: body
                    }
                }

                var xResultSendEmail = await this.sendEmail(xParamSend);
            }

            return JSON.stringify({
                "status_code":"00",
                "status_msg":"OK",
                "verification_link": param.verification_link,
                "result_add_to_queue": resultAddQueue
            });
        }else{
            return JSON.stringify({
                "status_code":"-99",
                "status_msg":"Template not found"
            });
        }

        
    }

    async sendEmail( pParam ){

        var xJoResult = {};

        var xTransportParam = {
            host: config.mailerSetting.smtp,
            port: 587,
            secure: false,
            // service: 'gmail',
            auth: {
                // type: 'oauth2',
                // user: config.mailerSetting.username,
                // clientId: config.mailerSetting.clientId,
                // clientSecret: config.mailerSetting.clientSecret,
                // accessToken: config.mailerSetting.accessToken,
                // refreshToken: config.mailerSetting.refreshToken,
                
                user: config.mailerSetting.username,
                pass: config.mailerSetting.password
            }
        };
        
        let xTransport = nodeMailer.createTransport(xTransportParam);

        const xMessage = pParam.message;
        // xTransport.sendMail( xMessage, function(err, info){
        //     if(err){
        //         return {
        //             status_code: "-99",
        //             status_msg: "Failed send email. Err: " + err
        //         }
        //     }else{
        //         return {
        //             status_code: "00",
        //             status_msg: "Email was successfully sent!"
        //         }
        //     }
        // }  )

        xJoResult = await xTransport.sendMail( xMessage );

        return xJoResult;
    }

};

module.exports = UserNotificationService;