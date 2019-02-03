import {InternalDataModel} from "./InternalDataModel";
import {PlainDataModelFactory} from "../factories";

/**
 * An abstract model class with a plain object implementation for storing properties.
 *
 * @type {typeof PlainDataModel}
 */
export const PlainDataModel = PlainDataModelFactory(InternalDataModel);
