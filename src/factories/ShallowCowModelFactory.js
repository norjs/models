import {ModelUtils} from "../utils/ModelUtils";

/**
 * Construct an abstract model class with a plain object implementation for storing properties.
 *
 * @param PlainObjectModel {typeof PlainObjectModel}
 * @return {typeof ShallowCowModel}
 */
export function ShallowCowModelFactory (PlainObjectModel) {

	/**
	 * @abstract
	 */
	class ShallowCowModel extends PlainObjectModel {

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
			const path = ModelUtils.getPathToProperty(this._getInternal(), key);
			if (path.lastParent && path.lastKey) {
				const { newModel, lastParent } = ModelUtils.shallowCopyByPath(this._getInternal(), path);
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
			const path = ModelUtils.getPathToProperty(this._getInternal(), key);
			if (path.lastParent && path.lastKey) {
				let { newModel, lastParent } = ModelUtils.shallowCopyByPath(this._getInternal(), path);
				delete lastParent[path.lastKey];
				this._setInternal(newModel);
			}
		}

	}

	return ShallowCowModel;
}
