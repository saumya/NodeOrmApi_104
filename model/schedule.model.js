//
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
//
const getPersonModel = require('./person.model');
const getGroupModel = require('./group.model');
const getDoctorModel = require('./doctor.model');


//
// ref: https://sequelize.org/v5/manual/data-types.html
// Sequelize.Model.init(attributes, options)

// The table name in database shohuld have been `persons` which corresponds to this Model
// However, table name is `people` which is generated automatically from `person`


const getScheduleModel = function(sequelize){

	class Schedule extends Model {}

	Schedule.init({
		name: { type: Sequelize.STRING, defaultValue: "appointment" },
		on_date: Sequelize.DATEONLY,
		is_morning: Sequelize.BOOLEAN 
	},{
		sequelize: sequelize,
		modelName: 'schedule',
		timestamps: true
	});
	//
	const GroupModel = getGroupModel(sequelize);
	const PersonModel = getPersonModel(sequelize);
	const DoctorModel = getDoctorModel(sequelize);
	//
	DoctorModel.hasMany( Schedule , {constraints: false} );
	PersonModel.hasMany( Schedule , {constraints: false} );
	GroupModel.hasMany( Schedule , {constraints: false} );
	//

	return Schedule;
}

module.exports = getScheduleModel;




