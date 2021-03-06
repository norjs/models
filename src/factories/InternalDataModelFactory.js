import _ from 'lodash';

/**
 * Construct an abstract model class with an implementation of an internal plain
 * object for storing the value of a model.
 *
 * This abstract class does not implement key-value property setters, getters or delete.
 *
 * @param DataModel {typeof DataModel}
 * @return {typeof InternalDataModel}
 */
export function InternalDataModelFactory (DataModel) {

	/**
	 * Symbol for internal plain object which contains all the properties.
	 */
	const INTERNAL = Symbol('_internal');

	/**
	 * @abstract
	 */
	class InternalDataModel extends DataModel {

		/**
		 *
		 * @param value {Object}
		 */
		constructor (value = {}) {
			super();
			this._setInternal(value);
		}

		/**
		 * Returns the internal plain object which contains model properties.
		 *
		 * @returns {Object}
		 * @protected
		 */
		_getInternal () {
			return this[INTERNAL];
		}

		/**
		 * Sets the internal plain object which contains model properties.
		 *
		 * @param value {Object}
		 * @returns {Object}
		 * @protected
		 */
		_setInternal (value) {
			if (!_.isPlainObject(value)) throw new TypeError("value was not plain object: " + value);
			this[INTERNAL] = value;
			return this[INTERNAL];
		}

	}

	return InternalDataModel;
}
