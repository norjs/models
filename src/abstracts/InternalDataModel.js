import {DataModel} from "./DataModel";
import {InternalDataModelFactory} from "../factories";

/**
 *
 * @type {typeof InternalDataModel}
 */
export const InternalDataModel = InternalDataModelFactory(DataModel);
