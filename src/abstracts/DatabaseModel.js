/**
 * A database model determines a common manner in which data (eg. `DataModel` classes) can be stored,
 * organized and manipulated.
 *
 * @abstract
 */
export class DatabaseModel {

	/**
	 * Returns pageable items from a database.
	 *
	 * @param page {number} The page number
	 * @param size {number} The amount of items on a page
	 * @param where {Object|undefined} Where options
	 * @return {Promise<{content: Array.<DataModel>}>}
	 * @abstract
	 */
	getPage ({page=0, size=10, where = undefined} = {}) {
	}

	/**
	 * Returns an item from a database.
	 *
	 * @param where {Object} At least one keyword is required
	 * @return {Promise<DataModel>}
	 * @abstract
	 */
	getItem ({where} = {}) {
	}

	/**
	 * Append multiple items to the database.
	 *
	 * Returned models will contain new primary IDs.
	 *
	 * @param items {Array.<DataModel>} Items to create
	 * @returns {Promise<Array.<DataModel>>} Promise of items with their new primary IDs.
	 * @abstract
	 */
	addItems (items) {
	}

	/**
	 * Append single item to the database.
	 *
	 * Returned model will contain a new primary ID for the model.
	 *
	 * @param item {DataModel} Item or items to create
	 * @returns {Promise<DataModel>} Promise of item or items with their new primary IDs.
	 * @abstract
	 */
	addItem (item) {
	}

	/**
	 * Update data from an item in to the database.
	 *
	 * By default, if `fromItem` is not defined, should retrieve an item from the database,
	 * and modify only changed properties.
	 *
	 * @param items {Array.<DataModel>}
	 * @returns {Promise.<Array.<DataModel>>}
	 * @abstract
	 */
	updateItems (items) {
	}

	/**
	 * Update data from an item in to the database.
	 *
	 * By default, if `fromItem` is not defined, should retrieve an item from the database,
	 * and modify only changed properties.
	 *
	 * @param item {DataModel}
	 * @param fromItem {DataModel} Only save differences between `fromItem` and `item`.
	 * @returns {Promise.<DataModel>}
	 * @abstract
	 */
	updateItem (item, {fromItem = undefined} = {}) {
	}

	/**
	 * Delete single item from the database.
	 *
	 * @param item {DataModel}
	 * @returns {Promise.<DataModel>} Data model without the primary ID.
	 * @abstract
	 */
	deleteItem (item) {
	}

	/**
	 * Delete items from the database.
	 *
	 * @param items {Array.<DataModel>}
	 * @returns {Promise.<Array.<DataModel>>} Data models without the primary ID.
	 * @abstract
	 */
	deleteItems (items) {
	}

}
