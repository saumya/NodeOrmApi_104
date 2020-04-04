//
// Mapping between Group & Person
//

const Sequelize = require('sequelize');
const Model = Sequelize.Model;
//
const getDoctorModel = require('./doctor.model');
const getGroupModel = require('./group.model');

//
const getDoctorGroupModel = function(sequelize){
	
	class DoctorGroupModel extends Model {};
	//
	DoctorGroupModel.init({
		// Just an assoociation, no specific data here
	},{
		sequelize: sequelize,
		modelName: 'doctorgroup',
		timestamps: true
	});
	//
	const DoctorModel = getDoctorModel(sequelize);
	const GroupModel = getGroupModel(sequelize);
	//
	DoctorModel.hasMany( DoctorGroupModel , {constraints: false} );
	GroupModel.hasMany( DoctorGroupModel, {constraints: false} );
	//
	return DoctorGroupModel;


}
//
module.exports = getDoctorGroupModel;