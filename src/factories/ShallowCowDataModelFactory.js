import {DataModelUtils} from "../utils/DataModelUtils";

/**
 * Construct an abstract model class with a shallow copy on write implementation for storing properties.
 *
 * @param PlainDataModel {typeof PlainDataModel}
 * @return {typeof ShallowCowDataModel}
 */
export function ShallowCowDataModelFactory (PlainDataModel) {

	/**
	 * @abstract
	 */
	class ShallowCowDataModel extends PlainDataModel {

		/**
		 *
		 * @param value {Object}
		 */
		constructor (value) {
			super(value);
		}

		/**
		 * Sets the property value for specific keyword.
		 *
		 * @param key {string|Symbol}
		 * @param value {*}
		 * @return {string}
		 * @abstract
		 * @protected
		 */
		_set (key, value) {
			const path = DataModelUtils.getPathToProperty(this._getInternal(), key);
			if (path.lastParent && path.lastKey) {
				const { newModel, lastParent } = DataModelUtils.shallowCopyByPath(this._getInternal(), path);
				lastParent[path.lastKey] = value;
				this._setInternal(newModel);
			}
		}

		/**
		 * Delete a property.
		 *
		 * @param key {string|Symbol}
		 * @abstract
		 * @protected
		 */
		_delete (key) {
			const path = DataModelUtils.getPathToProperty(this._getInternal(), key);
			if (path.lastParent && path.lastKey) {
				let { newModel, lastParent } = DataModelUtils.shallowCopyByPath(this._getInternal(), path);
				delete lastParent[path.lastKey];
				this._setInternal(newModel);
			}
		}

	}

	return ShallowCowDataModel;
}
