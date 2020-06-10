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
		details: Sequelize.STRING,
		doctorId: Sequelize.INTEGER,
		personId: Sequelize.INTEGER
	},{
		sequelize: sequelize,
		modelName: 'prescription',
		timestamps: true
	});

	return Prescription;
}

module.exports = getPrescriptionModel;




