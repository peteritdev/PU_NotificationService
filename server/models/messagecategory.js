'use strict';
module.exports = (sequelize, DataTypes) => {
  const MessageCategory = sequelize.define('ms_messagecategories', {
    id: {
    	type: DataTypes.INTEGER,
    	primaryKey: true,
    	autoIncrement: true
    },
    name: DataTypes.STRING,

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
  return MessageCategory;
};