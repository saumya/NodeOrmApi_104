//
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const getStoreItemModel = function(sequelize){

	class StoreItem extends Model {}

	StoreItem.init({
		name: Sequelize.STRING,
		price: Sequelize.STRING,
		company: Sequelize.STRING
	},{
		sequelize: sequelize,
		modelName: 'storeItem',
		timestamps: true
	});

	return StoreItem;
}

module.exports = getStoreItemModel;