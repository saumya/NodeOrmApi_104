//
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
//
const getGroupModel = function(sequelize){

	class Group extends Model {};
	
	Group.init({
		group_name: Sequelize.STRING,
		user_name: Sequelize.STRING,
		user_password: Sequelize.STRING,
		activated_on: Sequelize.STRING,
		activated_from: Sequelize.STRING,
		activated_to: Sequelize.STRING
	},{
		sequelize: sequelize,
		modelName: 'group',
		timestamps: true
	});
	
	return Group;
	
}
//
module.exports = getGroupModel;
