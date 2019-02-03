import {PlainDataModel} from "./PlainDataModel";
import {ShallowCowDataModelFactory} from "../factories";

/**
 * An abstract model class with shallow copy on write implementation of a plain object model.
 *
 * @type {typeof ShallowCowDataModel}
 */
export const ShallowCowDataModel = ShallowCowDataModelFactory(PlainDataModel);
