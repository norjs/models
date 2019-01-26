/**
 *
 * @abstract
 */
export class Model {

	/**
	 *
	 * @param value {*}
	 */
	constructor (value) {}

	/**
	 * Create instance of the class and seal it.
	 *
	 * @param value {*}
	 * @returns {Model}
	 */
	static create (value) {
		const obj = new this(value);
		Object.seal(obj);
		return obj;
	}

	/**
	 * Returns the internal plain object which contains model properties.
	 *
	 * @returns {Object}
	 * @abstract
	 * @protected
	 */
	_getInternal () {}

	/**
	 * Returns the internal plain object which contains model properties.
	 *
	 * @returns {Object}
	 * @public
	 */
	valueOf () {
		return this._getInternal();
	}

	/**
	 * Sets the internal plain object which contains model properties.
	 *
	 * @param value {Object}
	 * @returns {Object}
	 * @abstract
	 * @protected
	 */
	_setInternal (value) {}

	/**
	 * Returns true if this property exists
	 *
	 * @return {boolean}
	 * @abstract
	 * @protected
	 */
	_has (key) {}

	/**
	 * Returns the property value for specific keyword.
	 *
	 * @param key {string|Symbol}
	 * @return {*}
	 * @abstract
	 * @protected
	 */
	_get (key) {}

	/**
	 * Sets the property value for specific keyword.
	 *
	 * @param key {string|Symbol}
	 * @param value {*}
	 * @return {string}
	 * @abstract
	 * @protected
	 */
	_set (key, value) {}

	/**
	 * Delete a property for specified keyword.
	 *
	 * @param key {string|Symbol}
	 * @abstract
	 * @protected
	 */
	_delete (key) {}

	/**
	 * Delete a property for specified keyword.
	 *
	 * @param key {string|Symbol}
	 * @public
	 */
	static deleteProperty (obj, key) {
		obj._delete(key);
	}

	/**
	 * Returns the primary ID for this object.
	 *
	 * @abstract
	 * @return {*}
	 */
	getId () {}

	/**
	 * Set the primary ID for this object.
	 *
	 * @abstract
	 * @param value {*}
	 * @return {*}
	 */
	setId (value) {}

}
