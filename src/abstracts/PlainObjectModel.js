import {InternalObjectModel} from "./InternalObjectModel";
import {PlainObjectModelFactory} from "../factories";

/**
 * An abstract model class with a plain object implementation for storing properties.
 *
 * @type {typeof PlainObjectModel}
 */
export const PlainObjectModel = PlainObjectModelFactory(InternalObjectModel);
