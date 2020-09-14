//
// Data for Items Sold
//
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const getStoreItemOutModel = function(sequelize){

	class StoreItemSold extends Model {}

	StoreItemSold.init({
		store_item_id: Sequelize.STRING,
		quantity: Sequelize.STRING,
		sold_on: Sequelize.STRING
	},{
		sequelize: sequelize,
		modelName: 'storeItemOut',
		timestamps: true
	});

	return StoreItemSold;
}

module.exports = getStoreItemOutModel;