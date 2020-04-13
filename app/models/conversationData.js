class ConversationData {
    constructor(clientName, payerName, payerEmail, payerBirthDate, payerCpfCnpj, requestPayment, requestOrderDay, requestDeliveryDate,
        requestCurrency, requestShipping, requestConfirm, addresseCountry, addresseCep, addresseState, addresseCity, addresseDistrict,
        addresseStreet, addresseNumber, addresseComplement, financialInstrumentDescription, financialInstrumentExpirationMonth,
        financialInstrumentExpirationYear, addresseConfirm, addresseConfirmEnd, financialInstrumentCardNumber, financialInstrumentCVC,
        financialInstrumentName, financialInstrumentBirthDate, financialInstrumentCpfCnpj, phoneDDI, phoneDDD, phoneNumber,
        phoneDescription, loopPhone, productDescription, productCategory, productDetails, productPrice, productAmount, loopProduct,
        rhpUnitPrice, rhpAmount, rhpTotalPrice, rhpAddition, rhpDiscount) {
        // Clients
        this.clientName = clientName || undefined;

        // Payers
        this.payerName = payerName || undefined;
        this.payerEmail = payerEmail || undefined;
        this.payerBirthDate = payerBirthDate || undefined;
        this.payerCpfCnpj = payerCpfCnpj || undefined;

        // Requests
        this.requestPayment = requestPayment || undefined;
        this.requestOrderDay = requestOrderDay || undefined;
        this.requestDeliveryDate = requestDeliveryDate || undefined;
        this.requestCurrency = requestCurrency || undefined;
        this.requestShipping = requestShipping || undefined;
        this.requestConfirm = requestConfirm || undefined;

        // Adresses
        this.addresseCountry = addresseCountry || undefined;
        this.addresseCep = addresseCep || undefined;
        this.addresseState = addresseState || undefined;
        this.addresseCity = addresseCity || undefined;
        this.addresseDistrict = addresseDistrict || undefined;
        this.addresseStreet = addresseStreet || undefined;
        this.addresseNumber = addresseNumber || undefined;
        this.addresseComplement = addresseComplement || undefined;
        this.addresseConfirm = addresseConfirm || undefined;
        this.addresseConfirmEnd = addresseConfirmEnd || undefined;

        // Financial Instruments
        this.financialInstrumentDescription = financialInstrumentDescription || undefined;
        this.financialInstrumentExpirationMonth = financialInstrumentExpirationMonth || undefined;
        this.financialInstrumentExpirationYear = financialInstrumentExpirationYear || undefined;
        this.financialInstrumentCardNumber = financialInstrumentCardNumber || undefined;
        this.financialInstrumentCVC = financialInstrumentCVC || undefined;
        this.financialInstrumentName = financialInstrumentName || undefined;
        this.financialInstrumentBirthDate = financialInstrumentBirthDate || undefined;
        this.financialInstrumentCpfCnpj = financialInstrumentCpfCnpj || undefined;

        // Phones
        this.phoneDDI = phoneDDI || undefined;
        this.phoneDDD = phoneDDD || undefined;
        this.phoneNumber = phoneNumber || undefined;
        this.phoneDescription = phoneDescription || undefined;
        this.loopPhone = loopPhone;

        // Products
        this.productDescription = productDescription || undefined;
        this.productCategory = productCategory || undefined;
        this.productDetails = productDetails || undefined;
        this.productPrice = productPrice || undefined;
        this.productAmount = productAmount || undefined;
        this.loopProduct = loopProduct || undefined;

        // Requests has Products
        this.rhpUnitPrice = rhpUnitPrice || undefined;
        this.rhpAmount = rhpAmount || undefined;
        this.rhpTotalPrice = rhpTotalPrice || undefined;
        this.rhpAddition = rhpAddition || undefined;
        this.rhpDiscount = rhpDiscount || undefined;
    }
};

exports.ConversationData = ConversationData;
