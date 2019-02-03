/**
 * Construct an Invoice class using a specific abstract Model implementation.
 *
 * @param DataModel {typeof PlainDataModel}
 * @return {typeof Invoice}
 */
export function InvoiceFactory (DataModel) {

	class Invoice extends DataModel {

		/**
		 *
		 * @param value {object}
		 */
		constructor (value = {}) {
			super(value);
		}

		/**
		 *
		 */
		getId () {
			return this.invoiceId;
		}

		/**
		 *
		 */
		setId (value) {
			this.invoiceId = value;
			return value;
		}

		get invoiceId () {
			return this._get('invoiceId');
		}

		get clientId () {
			return this._get('clientId');
		}

		get campaignId () {
			return this._get('campaignId');
		}

		get groupId () {
			return this._get('groupId');
		}

		get bankAccountId () {
			return this._get('bankAccountId');
		}

		get wcOrderId () {
			return this._get('wcOrderId');
		}

		get updated () {
			return this._get('updated');
		}

		get creation () {
			return this._get('creation');
		}

		get date () {
			return this._get('date');
		}

		get dueDate () {
			return this._get('dueDate');
		}

		get remindDate () {
			return this._get('remindDate');
		}

		get checkoutDate () {
			return this._get('checkoutDate');
		}

		get referenceNumber () {
			return this._get('referenceNumber');
		}

		get internalNote () {
			return this._get('internalNote');
		}

		get extraNotice () {
			return this._get('extraNotice');
		}

		get webSecret () {
			return this._get('webSecret');
		}

		get checkoutStamp () {
			return this._get('checkoutStamp');
		}

		get onHold () {
			return this._get('onHold');
		}

		get isReminded () {
			return this._get('isReminded');
		}

		get onCollection () {
			return this._get('onCollection');
		}

		get isTerminated () {
			return this._get('isTerminated');
		}

		get buildDocuments () {
			return this._get('buildDocuments');
		}

		get sendDocuments () {
			return this._get('sendDocuments');
		}

		get dueDays () {
			return this._get('dueDays');
		}


		set invoiceId (value) {
			this._set('invoiceId', value);
		}

		set clientId (value) {
			this._set('clientId', value);
		}

		set campaignId (value) {
			this._set('campaignId', value);
		}

		set groupId (value) {
			this._set('groupId', value);
		}

		set bankAccountId (value) {
			this._set('bankAccountId', value);
		}

		set wcOrderId (value) {
			this._set('wcOrderId', value);
		}

		set updated (value) {
			this._set('updated', value);
		}

		set creation (value) {
			this._set('creation', value);
		}

		set date (value) {
			this._set('date', value);
		}

		set dueDate (value) {
			this._set('dueDate', value);
		}

		set remindDate (value) {
			this._set('remindDate', value);
		}

		set checkoutDate (value) {
			this._set('checkoutDate', value);
		}

		set referenceNumber (value) {
			this._set('referenceNumber', value);
		}

		set internalNote (value) {
			this._set('internalNote', value);
		}

		set extraNotice (value) {
			this._set('extraNotice', value);
		}

		set webSecret (value) {
			this._set('webSecret', value);
		}

		set checkoutStamp (value) {
			this._set('checkoutStamp', value);
		}

		set onHold (value) {
			this._set('onHold', value);
		}

		set isReminded (value) {
			this._set('isReminded', value);
		}

		set onCollection (value) {
			this._set('onCollection', value);
		}

		set isTerminated (value) {
			this._set('isTerminated', value);
		}

		set buildDocuments (value) {
			this._set('buildDocuments', value);
		}

		set sendDocuments (value) {
			this._set('sendDocuments', value);
		}

		set dueDays (value) {
			this._set('dueDays', value);
		}

		/**
		 * @returns {Array.<InvoiceRow>}
		 */
		get rows () {
			return this._get('rows');
		}

		/**
		 *
		 * @param rows {Array.<InvoiceRow>}
		 */
		setRows (rows) {
			this._set('rows', rows);
		}

	}

	return Invoice;
}