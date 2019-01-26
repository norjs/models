/**
 * Construct an InvoiceRow class using a specific abstract Model implementation.
 *
 * @param Model {typeof PlainObjectModel}
 * @return {typeof InvoiceRow}
 */
export function InvoiceRowFactory (Model) {

	class InvoiceRow extends Model {

		/**
		 *
		 * @param invoiceRowId {number|undefined}
		 * @param invoiceId {number|undefined}
		 * @param paymentId {number|undefined}
		 * @param campaignId {number|undefined}
		 * @param campaignPaymentId {number|undefined}
		 * @param productId {number|undefined}
		 * @param updated {string|undefined}
		 * @param creation {string|undefined}
		 * @param startDate {string|undefined}
		 * @param endDate {string|undefined}
		 * @param description {string}
		 * @param internalNote {string}
		 * @param amount {number}
		 * @param price {number}
		 * @param vatPercent {number}
		 * @param discountPercent {number}
		 */
		constructor ({
			invoiceRowId = undefined,
			invoiceId = undefined,
			paymentId = undefined,
			campaignId = undefined,
			campaignPaymentId = undefined,
			productId = undefined,
			updated = undefined,
			creation = undefined,
			startDate = undefined,
			endDate = undefined,
			description = '',
			internalNote = '',
			amount = 0,
			price = 0,
			vatPercent = 0,
			discountPercent = 0
		} = {}) {
			super();
			this.invoiceRowId = invoiceRowId;
			this.invoiceId = invoiceId;
			this.paymentId = paymentId;
			this.campaignId = campaignId;
			this.campaignPaymentId = campaignPaymentId;
			this.productId = productId;
			this.updated = updated;
			this.creation = creation;
			this.startDate = startDate;
			this.endDate = endDate;
			this.description = description;
			this.internalNote = internalNote;
			this.amount = amount;
			this.price = price;
			this.vatPercent = vatPercent;
			this.discountPercent = discountPercent;
		}

		/**
		 *
		 */
		getId () {
			return this.invoiceRowId;
		}

		/**
		 *
		 */
		setId (value) {
			this.invoiceRowId = value;
			return value;
		}

		get invoiceRowId () {
			return this._get('invoiceRowId');
		}

		get invoiceId () {
			return this._get('invoiceId');
		}

		get paymentId () {
			return this._get('paymentId');
		}

		get campaignId () {
			return this._get('campaignId');
		}

		get campaignPaymentId () {
			return this._get('campaignPaymentId');
		}

		get productId () {
			return this._get('productId');
		}

		get updated () {
			return this._get('updated');
		}

		get creation () {
			return this._get('creation');
		}

		get startDate () {
			return this._get('startDate');
		}

		get endDate () {
			return this._get('endDate');
		}

		get description () {
			return this._get('description');
		}

		get internalNote () {
			return this._get('internalNote');
		}

		get amount () {
			return this._get('amount');
		}

		get price () {
			return this._get('price');
		}

		get vatPercent () {
			return this._get('vatPercent');
		}

		get discountPercent () {
			return this._get('discountPercent');
		}


		set invoiceRowId (value) {
			this._set('invoiceRowId', value);
		}

		set invoiceId (value) {
			this._set('invoiceId', value);
		}

		set paymentId (value) {
			this._set('paymentId', value);
		}

		set campaignId (value) {
			this._set('campaignId', value);
		}

		set campaignPaymentId (value) {
			this._set('campaignPaymentId', value);
		}

		set productId (value) {
			this._set('productId', value);
		}

		set updated (value) {
			this._set('updated', value);
		}

		set creation (value) {
			this._set('creation', value);
		}

		set startDate (value) {
			this._set('startDate', value);
		}

		set endDate (value) {
			this._set('endDate', value);
		}

		set description (value) {
			this._set('description', value);
		}

		set internalNote (value) {
			this._set('internalNote', value);
		}

		set amount (value) {
			this._set('amount', value);
		}

		set price (value) {
			this._set('price', value);
		}

		set vatPercent (value) {
			this._set('vatPercent', value);
		}

		set discountPercent (value) {
			this._set('discountPercent', value);
		}

	}

	return InvoiceRow;
}