import {DataModelUtils} from "../utils/DataModelUtils";

/**
 * Construct an abstract model class with a plain object implementation for storing key-value properties.
 *
 * This abstract class does not implement internal model setter / getter.
 *
 * @param InternalDataModel {typeof InternalDataModel}
 * @return {typeof PlainDataModel}
 */
export function PlainDataModelFactory (InternalDataModel) {

	/**
	 * @abstract
	 */
	class PlainDataModel extends InternalDataModel {

		/**
		 *
		 * @param value {Object}
		 */
		constructor (value) {
			super(value);
		}

		/**
		 * Returns true if this property exists
		 *
		 * @return {boolean}
		 * @abstract
		 * @protected
		 */
		_has (key) {
			const path = DataModelUtils.getPathToProperty(this._getInternal(), key);
			if (path.lastParent && path.lastKey) {
				return path.lastParent[path.lastKey];
			}
		}

		/**
		 * Returns the property value for specific keyword.
		 *
		 * @param key {string|Symbol}
		 * @return {*}
		 * @abstract
		 * @protected
		 */
		_get (key) {
			const path = DataModelUtils.getPathToProperty(this._getInternal(), key);
			if (path.lastParent && path.lastKey) {
				return path.lastParent[path.lastKey];
			}
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
				path.lastParent[path.lastKey] = value;
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
				delete path.lastParent[path.lastKey];
			}
		}

	}

	return PlainDataModel;
}
