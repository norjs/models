import {PlainObjectModel} from "./PlainObjectModel";
import {ShallowCowModelFactory} from "../factories";

/**
 *
 * @type {typeof ShallowCowModel}
 */
export const ShallowCowModel = ShallowCowModelFactory(PlainObjectModel);
