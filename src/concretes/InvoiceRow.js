import {ShallowCowModel} from "../abstracts/ShallowCowModel";
import {InvoiceRowFactory} from "../factories/InvoiceRowFactory";

/**
 *
 * @type {typeof InvoiceRow}
 */
export const InvoiceRow = InvoiceRowFactory(ShallowCowModel);
