'use strict';

module.exports = (sequelize, DataTypes) => {
    const JobGrade = sequelize.define( 'db_job_grade', {
        id:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
        },
        name: DataTypes.STRING,
        code: DataTypes.STRING,
        detail: DataTypes.STRING,
        orders: DataTypes.INTEGER,
        createdAt:{
			type: DataTypes.DATE,
			defaultValue: sequelize.literal('NOW()'),
			field: 'created_at'
        },
        updatedAt:{
			type: DataTypes.DATE,
			field: 'updated_at'
		},
    },{
        tableName:'db_job_grade'
    } );

    return JobGrade;
}