//
// Data for Items Bought
//
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const getStoreItemInModel = function(sequelize){

	class StoreItemBought extends Model {}

	StoreItemBought.init({
		store_item_id: Sequelize.STRING,
		quantity: Sequelize.STRING,
		bought_on: Sequelize.STRING
	},{
		sequelize: sequelize,
		modelName: 'storeItemIn',
		timestamps: true
	});

	return StoreItemBought;
}

module.exports = getStoreItemInModel;