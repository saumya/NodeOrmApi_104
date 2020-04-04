//
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
//
// ref: https://sequelize.org/v5/manual/data-types.html
// Sequelize.Model.init(attributes, options)

// The table name in database shohuld have been `persons` which corresponds to this Model
// However, table name is `people` which is generated automatically from `person`


const getPersonModel = function(sequelize){

	class Person extends Model {}

	Person.init({
		name: Sequelize.STRING,
		phone: Sequelize.STRING,
		email: Sequelize.STRING,
		address: Sequelize.TEXT
	},{
		sequelize: sequelize,
		modelName: 'person',
		timestamps: true
	});

	return Person;
}

module.exports = getPersonModel;




