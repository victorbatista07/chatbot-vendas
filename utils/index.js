// #region Validators
// Addresse
const { addresseCepValidator } = require('./validators/addresse/addresseCepValidator');
const { addresseComplementValidator } = require('./validators/addresse/addresseComplementValidator');
const { addresseDistrictValidator } = require('./validators/addresse/addresseDistrictValidator');
const { addresseNumberStreetValidator } = require('./validators/addresse/addresseNumberStreetValidator');
const { addresseStreetValidator } = require('./validators/addresse/addresseStreetValidator');

// Bot
const { botDescriptionValidator } = require('./validators/bot/botDescriptionValidator');
const { botRegisterValidator } = require('./validators/bot/botRegisterValidator');

// Client
const { clientNameValidator } = require('./validators/client/clientNameValidator');

// Conversation
const { conversationActiveValidator } = require('./validators/conversation/conversationActiveValidator');
const { conversationChannelValidator } = require('./validators/conversation/conversationChannelValidator');
const { conversationGreetingValidator } = require('./validators/conversation/conversationGreetingValidator');
const { conversationLastIntentValidator } = require('./validators/conversation/conversationLastIntentValidator');
const { conversationQtdNoneValidator } = require('./validators/conversation/conversationQtdNoneValidator');
const { conversationRegisterValidator } = require('./validators/conversation/conversationRegisterValidator');
const { conversationURLValidator } = require('./validators/conversation/conversationURLValidator');
const { conversationVoteResponseValidator } = require('./validators/conversation/conversationVoteResponseValidator');
const { conversationVoteServiceValidator } = require('./validators/conversation/conversationVoteServiceValidator');

// Financial Instrument
const { financialInstrumentCardNumberValidator } = require('./validators/financialInstrument/financialInstrumentCardNumberValidator');
const { financialInstrumentCpfCnpjValidator } = require('./validators/financialInstrument/financialInstrumentCpfCnpjValidator');
const { financialInstrumentCVCValidator } = require('./validators/financialInstrument/financialInstrumentCVCValidator');
const { financialInstrumentDescriptionValidator } = require('./validators/financialInstrument/financialInstrumentDescriptionValidator');
const { financialInstrumentExpirationMonthValidator } = require('./validators/financialInstrument/financialInstrumentExpirationMonthValidator');
const { financialInstrumentExpirationYearValidator } = require('./validators/financialInstrument/financialInstrumentExpirationYearValidator');
const { financialInstrumentNameValidator } = require('./validators/financialInstrument/financialInstrumentNameValidator');

// Payer
const { payerCpfCnpjValidator } = require('./validators/payer/payerCpfCnpjValidator');
const { payerEmailValidator } = require('./validators/payer/payerEmailValidator');
const { payerNameValidator } = require('./validators/payer/payerNameValidator');

// Phone
const { phoneDescriptionValidator } = require('./validators/phone/phoneDescriptionValidator');
const { phoneValidator } = require('./validators/phone/phoneValidator');

// Product
const { productAmountValidator } = require('./validators/product/productAmountValidator');
const { productCategoryValidator } = require('./validators/product/productCategoryValidator');
const { productDescriptionValidator } = require('./validators/product/productDescriptionValidator');
const { productDetailsValidator } = require('./validators/product/productDetailsValidator');
const { productValidator } = require('./validators/product/productValidator');

// Request
const { requestCurrencyValidator } = require('./validators/request/requestCurrencyValidator');
const { requestPaymentValidator } = require('./validators/request/requestPaymentValidator');
const { requestShippingValidator } = require('./validators/request/requestShippingValidator');

// Resquest has Product
const { requestHasProductAdditionValidator } = require('./validators/requestHasProduct/requestHasProductAdditionValidator');
const { requestHasProductAmountValidator } = require('./validators/requestHasProduct/requestHasProductAmountValidator');
const { requestHasProductDiscountValidator } = require('./validators/requestHasProduct/requestHasProductDiscountValidator');
const { requestHasProductTotalPriceValidator } = require('./validators/requestHasProduct/requestHasProductTotalPriceValidator');
const { requestHasProductUnitPriceValidator } = require('./validators/requestHasProduct/requestHasProductUnitPriceValidator');

// Response Quality
const { responseQualityResponseValidator } = require('./validators/responseQuality/responseQualityResponseValidator');

// Service Quality
const { serviceQualityResponseValidator } = require('./validators/serviceQuality/serviceQualityResponseValidator');

// User
const { userNameValidator } = require('./validators/user/userNameValidator');
const { userRegisterValidator } = require('./validators/user/userRegisterValidator');

const { amountValidator } = require('./validators/amountValidator');
const { confirmationValidator } = require('./validators/confirmationValidator');
// #endregion

// #region Wartefalls
const { initializeRequestStep, promptForNameStep, promptForPaymentStep, startSelectionStep, initializeAddresseStep, initializePhoneStep, displaySummaryStep, endRequestStep } = require('./wartefalls/requestWartefall');
const { promptForProductStep, promptForAmountProductStep, loopProductStep, endProductDialog } = require('./wartefalls/productWartefall');
const { promptForCepStep, promptForStreetStep, promptForNumberStreetStep, addresseComplementStep, loopAddresseDialog, endAddresseDialog } = require('./wartefalls/addresseWartefall');
const { promptForPhoneStep, promptForPhoneDescription, loopPhonesDialog, endPhoneDialog } = require('./wartefalls/phoneWartefall');
// #endregion

// #region IDs
const {
    // Dialog ID
    CONTACT_DIALOG,
    GREETING_DIALOG,
    REQUEST_DIALOG,

    // Dialog Property
    DIALOG_STATE_PROPERTY,
    USER_PROFILE_PROPERTY,

    // LUIS Intent
    CANCELORDER_INTENT,
    CONTACT_INTENT,
    CONTINUITY_INTENT,
    FEEDBACK_INTENT,
    GREETING_INTENT,
    IDENTITY_INTENT,
    MATERIAL_INTENT,
    NONE_INTENT,
    PARTING_INTENT,
    PRODUCTS_INTENT,
    QUALITY_INTENT,
    QUITTING_INTENT,
    REGIME_INTENT,
    REQUEST_INTENT,
    STORE_INTENT,

    // Step
    ADDRESSE_STEP,
    PAYER_STEP,
    PHONE_STEP,
    PRODUCT_STEP,
    REGISTER_STEP,

    // Prompt
    ADDRESSE_COMPLEMENT_PROMPT,
    AMOUNT_PRODUCT_PROMPT,
    CEP_PROMPT,
    CONFIRM_PROMPT,
    DISTRICT_PROMPT,
    DESCRIPTION_PROMPT,
    NAME_PROMPT,
    NUMBER_STREET_PROMPT,
    PAYMENT_PROMPT,
    PHONE_PROMPT,
    PRODUCT_PROMPT,
    STREET_PROMPT
} = require('./ids/ids');
// #endregion

// #region Exports of the Validators
// Addresse
exports.AddresseCepValidator = addresseCepValidator;
exports.AddresseComplementValidator = addresseComplementValidator;
exports.AddresseDistrictValidator = addresseDistrictValidator;
exports.AddresseNumberStreetValidator = addresseNumberStreetValidator;
exports.AddresseStreetValidator = addresseStreetValidator;

// Bot
exports.BotDescriptionValidator = botDescriptionValidator;
exports.BotRegisterValidator = botRegisterValidator;

// Client
exports.ClientNameValidator = clientNameValidator;

// Conversation
exports.ConversationActiveValidator = conversationActiveValidator;
exports.ConversationChannelValidator = conversationChannelValidator;
exports.ConversationGreetingValidator = conversationGreetingValidator;
exports.ConversationLastIntentValidator = conversationLastIntentValidator;
exports.ConversationQtdNoneValidator = conversationQtdNoneValidator;
exports.ConversationRegisterValidator = conversationRegisterValidator;
exports.ConversationURLValidator = conversationURLValidator;
exports.ConversationVoteResponseValidator = conversationVoteResponseValidator;
exports.ConversationVoteServiceValidator = conversationVoteServiceValidator;

// Financial Instrument
exports.FinancialInstrumentCardNumberValidator = financialInstrumentCardNumberValidator;
exports.FinancialInstrumentCpfCnpjValidator = financialInstrumentCpfCnpjValidator;
exports.FinancialInstrumentCVCValidator = financialInstrumentCVCValidator;
exports.FinancialInstrumentDescriptionValidator = financialInstrumentDescriptionValidator;
exports.FinancialInstrumentExpirationMonthValidator = financialInstrumentExpirationMonthValidator;
exports.FinancialInstrumentExpirationYearValidator = financialInstrumentExpirationYearValidator;
exports.FinancialInstrumentNameValidator = financialInstrumentNameValidator;

// Payer
exports.PayerCpfCnpjValidator = payerCpfCnpjValidator;
exports.PayerEmailValidator = payerEmailValidator;
exports.PayerNameValidator = payerNameValidator;

// Phone
exports.PhoneDescriptionValidator = phoneDescriptionValidator;
exports.PhoneValidator = phoneValidator;

// Product
exports.ProductAmountValidator = productAmountValidator;
exports.ProductCategoryValidator = productCategoryValidator;
exports.ProductDescriptionValidator = productDescriptionValidator;
exports.ProductDetailsValidator = productDetailsValidator;
exports.ProductValidator = productValidator;

// Request
exports.RequestCurrencyValidator = requestCurrencyValidator;
exports.RequestPaymentValidator = requestPaymentValidator;
exports.RequestShippingValidator = requestShippingValidator;

// Request has Product
exports.RequestHasProductAdditionValidator = requestHasProductAdditionValidator;
exports.RequestHasProductAmountValidator = requestHasProductAmountValidator;
exports.RequestHasProductDiscountValidator = requestHasProductDiscountValidator;
exports.RequestHasProductTotalPriceValidator = requestHasProductTotalPriceValidator;
exports.RequestHasProductUnitPriceValidator = requestHasProductUnitPriceValidator;

// Response Quality
exports.ResponseQualityResponseValidator = responseQualityResponseValidator;

// Service Quality
exports.ServiceQualityResponseValidator = serviceQualityResponseValidator;

// User
exports.UserNameValidator = userNameValidator;
exports.UserRegisterValidator = userRegisterValidator;

exports.AmountValidator = amountValidator;
exports.ConfirmationValidator = confirmationValidator;
// #endregion

// #region Exportation of Waterfalls of Request
exports.InitializeRequestStep = initializeRequestStep;
exports.PromptForNameStep = promptForNameStep;
exports.PromptForPaymentStep = promptForPaymentStep;
exports.StartSelectionStep = startSelectionStep;
exports.InitializeAddresseStep = initializeAddresseStep;
exports.InitializePhoneStep = initializePhoneStep;
exports.DisplaySummaryStep = displaySummaryStep;
exports.EndRequestStep = endRequestStep;
// #endregion

// #region Exportation of Waterfalls of Product
exports.PromptForProductStep = promptForProductStep;
exports.PromptForAmountProductStep = promptForAmountProductStep;
exports.LoopProductStep = loopProductStep;
exports.EndProductDialog = endProductDialog;
// #endregion

// #region Exportation of Waterfalls of Addresse
exports.PromptForCepStep = promptForCepStep;
exports.PromptForStreetStep = promptForStreetStep;
exports.PromptForNumberStreetStep = promptForNumberStreetStep;
exports.AddresseComplementStep = addresseComplementStep;
exports.LoopAddresseDialog = loopAddresseDialog;
exports.EndAddresseDialog = endAddresseDialog;
// #endregion

// #region Exportation of Waterfalls of Phone
exports.PromptForPhoneStep = promptForPhoneStep;
exports.PromptForPhoneDescription = promptForPhoneDescription;
exports.LoopPhonesDialog = loopPhonesDialog;
exports.EndPhoneDialog = endPhoneDialog;
// #endregion

// #region Exportation of IDs
// Dialog ID
exports.CONTACT_DIALOG = CONTACT_DIALOG;
exports.GREETING_DIALOG = GREETING_DIALOG;
exports.REQUEST_DIALOG = REQUEST_DIALOG;

// Dialog Property
exports.DIALOG_STATE_PROPERTY = DIALOG_STATE_PROPERTY;
exports.USER_PROFILE_PROPERTY = USER_PROFILE_PROPERTY;

// LUIS Intent
exports.CANCELORDER_INTENT = CANCELORDER_INTENT;
exports.CONTACT_INTENT = CONTACT_INTENT;
exports.CONTINUITY_INTENT = CONTINUITY_INTENT;
exports.FEEDBACK_INTENT = FEEDBACK_INTENT;
exports.GREETING_INTENT = GREETING_INTENT;
exports.IDENTITY_INTENT = IDENTITY_INTENT;
exports.MATERIAL_INTENT = MATERIAL_INTENT;
exports.NONE_INTENT = NONE_INTENT;
exports.PARTING_INTENT = PARTING_INTENT;
exports.PRODUCTS_INTENT = PRODUCTS_INTENT;
exports.QUALITY_INTENT = QUALITY_INTENT;
exports.QUITTING_INTENT = QUITTING_INTENT;
exports.REGIME_INTENT = REGIME_INTENT;
exports.REQUEST_INTENT = REQUEST_INTENT;
exports.STORE_INTENT = STORE_INTENT;

// Step
exports.ADDRESSE_STEP = ADDRESSE_STEP;
exports.PAYER_STEP = PAYER_STEP;
exports.PHONE_STEP = PHONE_STEP;
exports.PRODUCT_STEP = PRODUCT_STEP;
exports.REGISTER_STEP = REGISTER_STEP;

// Prompt
exports.ADDRESSE_COMPLEMENT_PROMPT = ADDRESSE_COMPLEMENT_PROMPT;
exports.AMOUNT_PRODUCT_PROMPT = AMOUNT_PRODUCT_PROMPT;
exports.CEP_PROMPT = CEP_PROMPT;
exports.CONFIRM_PROMPT = CONFIRM_PROMPT;
exports.DISTRICT_PROMPT = DISTRICT_PROMPT;
exports.DESCRIPTION_PROMPT = DESCRIPTION_PROMPT;
exports.NAME_PROMPT = NAME_PROMPT;
exports.NUMBER_STREET_PROMPT = NUMBER_STREET_PROMPT;
exports.PAYMENT_PROMPT = PAYMENT_PROMPT;
exports.PHONE_PROMPT = PHONE_PROMPT;
exports.PRODUCT_PROMPT = PRODUCT_PROMPT;
exports.STREET_PROMPT = STREET_PROMPT;
// #endregion
