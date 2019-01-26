import {ShallowCowModel} from "../abstracts/ShallowCowModel";
import {InvoiceFactory} from "../factories/InvoiceFactory";

/**
 *
 * @type {typeof Invoice}
 */
export const Invoice = InvoiceFactory(ShallowCowModel);
