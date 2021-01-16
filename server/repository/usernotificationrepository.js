var env = process.env.NODE_ENV || 'development';
var configEnv = require(__dirname + '/../config/config.json')[env];
var Sequelize = require('sequelize');
var sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, configEnv);
const { hash } = require('bcryptjs');

//Model
const modelNotificationTemplate = require('../models').ms_notificationtemplates;
const modelLogNotification = require('../models').log_notifications;

//Utils
const UtilSecurity = require('../utils/security.js');
const utilSecureInstance = new UtilSecurity();
const Util = require('../utils/globalutility.js');
const utilInstance = new Util();

class UserNotificationRepository {
    constructor(){}

    async getNotificationTemplateByCode( pTemplateCode ){
        var data = await modelNotificationTemplate.findOne({
            where:{
                code: pTemplateCode
            }
        });
        
        return data;
    }

    async addNotificationToQueue( param ){
        let transaction;
        var joResult;

        try{
            transaction = await sequelize.transaction();           

            await modelLogNotification.create({
                type: param.type,
                to: param.to,
                cc: param.cc,
                subject: param.subject,
                body: param.body,
                status: 0                
            },{transaction});
            
            await transaction.commit();

            joResult = {
                "status_code": "00",
                "status_msg": "Notification successfully add to queue"
            };
        }catch(err){
            console.log("ERROR [UserNotificationRepository.addNotificationToQueue] " + err);
            if( transaction ) await transaction.rollback();
            joResult = {
                "status_code": "-99",
                "status_msg": "Failed add notification to queue",
                "err_msg": err
            };
        }

        return joResult;
    }
};

module.exports = UserNotificationRepository;