//
// prescription.model.js
//
//
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
//
// ref: https://sequelize.org/v5/manual/data-types.html
// Sequelize.Model.init(attributes, options)


const getPrescriptionModel = function(sequelize){

	class Prescription extends Model {}

	Prescription.init({
		name: Sequelize.STRING,
		onDate: Sequelize.DATE,
		
		observations: Sequelize.TEXT,
		advice: Sequelize.TEXT,
		tests: Sequelize.TEXT,
		medicines: Sequelize.TEXT,
		followupDate: Sequelize.DATE,
		
		details: Sequelize.TEXT,
		doctorId: Sequelize.INTEGER,
		personId: Sequelize.INTEGER,
		clinicId: Sequelize.INTEGER,

		isAttended: Sequelize.BOOLEAN,
		isWeb: Sequelize.BOOLEAN,
		webURL: Sequelize.STRING
	},{
		sequelize: sequelize,
		modelName: 'prescription',
		timestamps: true
	});

	return Prescription;
}

module.exports = getPrescriptionModel;




