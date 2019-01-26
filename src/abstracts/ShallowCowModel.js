import {PlainObjectModel} from "./PlainObjectModel";
import {ShallowCowModelFactory} from "../factories";

/**
 * An abstract model class with shallow copy on write implementation of a plain object model.
 *
 * @type {typeof ShallowCowModel}
 */
export const ShallowCowModel = ShallowCowModelFactory(PlainObjectModel);
