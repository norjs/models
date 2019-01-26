import {InternalObjectModel} from "./InternalObjectModel";
import {PlainObjectModelFactory} from "../factories";

/**
 *
 * @type {typeof PlainObjectModel}
 */
export const PlainObjectModel = PlainObjectModelFactory(InternalObjectModel);
