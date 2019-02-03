import {ShallowCowDataModel} from "../abstracts/ShallowCowDataModel";
import {InvoiceRowFactory} from "../factories/InvoiceRowFactory";

/**
 *
 * @type {typeof InvoiceRow}
 */
export const InvoiceRow = InvoiceRowFactory(ShallowCowDataModel);
