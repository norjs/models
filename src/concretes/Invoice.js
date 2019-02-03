import {ShallowCowDataModel} from "../abstracts/ShallowCowDataModel";
import {InvoiceFactory} from "../factories/InvoiceFactory";

/**
 *
 * @type {typeof Invoice}
 */
export const Invoice = InvoiceFactory(ShallowCowDataModel);
