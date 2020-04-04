//
// Mapping between Group & Person
//

const Sequelize = require('sequelize');
const Model = Sequelize.Model;
//
const getPersonModel = require('./person.model');
const getGroupModel = require('./group.model');

//
const getPersonGroupModel = function(sequelize){
	
	class PersonGroupModel extends Model {};
	//
	PersonGroupModel.init({
		// Just an assoociation, no specific data here
	},{
		sequelize: sequelize,
		modelName: 'persongroup',
		timestamps: true
	});
	//
	const PersonModel = getPersonModel(sequelize);
	const GroupModel = getGroupModel(sequelize);
	//
	PersonModel.hasMany( PersonGroupModel , {constraints: false} );
	GroupModel.hasMany( PersonGroupModel, {constraints: false} );
	//
	return PersonGroupModel;


}
//
module.exports = getPersonGroupModel;