'use strict';
module.exports = (sequelize, DataTypes) => {
  const NotificationTemplate = sequelize.define('ms_notificationtemplates', {
    id: {
    	type: DataTypes.INTEGER,
    	primaryKey: true,
    	autoIncrement: true
    },
    name: DataTypes.STRING,
    type: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    body: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    code: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    is_delete: DataTypes.INTEGER,

    createdAt:{
    	type: DataTypes.DATE,
    	defaultValue: sequelize.literal('NOW()'),
    	field: 'created_at'
    },
    createdUser:{
    	type: DataTypes.INTEGER,
    	field: 'created_by'
    },
    updatedAt:{
    	type: DataTypes.DATE,
    	field: 'updated_at'
    },
    modifiedUser:{
    	type: DataTypes.INTEGER,
    	field: 'updated_by'
    }
  });
  return NotificationTemplate;
};