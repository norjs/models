import _ from 'lodash';

/**
 *
 */
export class DataModelUtils {

	/**
	 * Returns an API for accessing a property in an object.
	 *
	 * The property key can be:
	 *
	 *   - a symbol
	 *
	 *   - a string with dot separated eg. `"foo.bar"` => `model.foo.bar`, or
	 *
	 *   - a path as an array eg. ["foo", "bar"] => `model.foo.bar`
	 *
	 * @param model {object}
	 * @param key {symbol|string|array.<string|symbol>} The path to the property
	 * @return {{parts: Array.<{key: string, parent:{}, value:*}>, lastKey: string, lastParent: {}, lastValue: *}}
	 */
	static getPathToProperty (model, key) {
		if (_.isString(key)) return this.getPathToProperty(model, key.split('.'));
		if (_.isSymbol(key)) return this.getPathToProperty(model, [key]);
		if (!_.isArray(key)) throw new TypeError("key must be an array, string or symbol: " + key);
		const path = {
			parts: [],
			lastKey: undefined,
			lastParent: undefined,
			lastValue: undefined
		};
		path.lastValue = _.reduce(key, (parent, key) => {
			const value = parent && _.has(parent, key) ? parent[key] : undefined;
			path.parts.push({key, parent, value});
			path.lastKey = key;
			path.lastParent = parent;
			return value;
		}, model);
		return path;
	}

	/**
	 * Create a shallow copy of parents of a property in an object.
	 *
	 * @param model {{}}
	 * @param path {parts: Array.<{key: string, parent:{}, value:*}>, lastKey: string, lastParent: {}, lastValue: *}
	 * @returns {{newModel: {}, lastParent: {}|undefined, lastValue: *}}
	 */
	static shallowCopyByPath (model, path) {
		const newModel = _.clone(model);
		let lastParent = undefined;
		const lastValue = _.reduce(
			path.parts,
			(parent, part) => {
				lastParent = parent;
				return parent[part.key] = _.clone(parent[part.key]);
			},
			newModel
		);
		return {newModel, lastParent, lastValue};
	}

}
