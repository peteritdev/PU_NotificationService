'use strict';

module.exports = (sequelize, DataTypes) => {
    const JenisKenaikanGaji = sequelize.define( 'db_jenis_kenaikan_gaji', {
        id:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
        },
        name:DataTypes.STRING,
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
        tableName:'db_jenis_kenaikan_gaji'
    } );

    return JenisKenaikanGaji;
}