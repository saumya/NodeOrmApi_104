//
// bill.model.js
//
//
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
//
// ref: https://sequelize.org/v5/manual/data-types.html
// Sequelize.Model.init(attributes, options)


const getBillModel = function(sequelize){

	class Bill extends Model {}

	Bill.init({
		name: Sequelize.STRING,
		onDate: Sequelize.DATE,
		details: Sequelize.TEXT,
		ammount: Sequelize.DECIMAL(10,2),
		doctorId: Sequelize.INTEGER,
		personId: Sequelize.INTEGER,
		clinicId: Sequelize.INTEGER
	},{
		sequelize: sequelize,
		modelName: 'bill',
		timestamps: true
	});

	return Bill;
}

module.exports = getBillModel;




