//
// appusage.model.js
//
//
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
//
// ref: https://sequelize.org/v5/manual/data-types.html
// Sequelize.Model.init(attributes, options)


const getAppUsageModel = function(sequelize){

	class AppUsage extends Model {}

	AppUsage.init({
		ip: Sequelize.STRING,
		user_agent: Sequelize.STRING
	},{
		sequelize: sequelize,
		modelName: 'appusage',
		timestamps: true
	});

	return AppUsage;
}

module.exports = getAppUsageModel;




