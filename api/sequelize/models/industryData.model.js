const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('industryData', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		Time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Industry: {
            type: DataTypes.STRING,
            allowNull: false
        },
        NumberOfLayOff: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
		// We also want it to have a 'orchestraId' field, but we don't have to define it here.
		// It will be defined automatically when Sequelize applies the associations.
	});
};
