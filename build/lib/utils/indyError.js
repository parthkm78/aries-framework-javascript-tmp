"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIndyError = exports.indyErrors = void 0;
exports.indyErrors = {
    100: 'CommonInvalidParam1',
    101: 'CommonInvalidParam2',
    102: 'CommonInvalidParam3',
    103: 'CommonInvalidParam4',
    104: 'CommonInvalidParam5',
    105: 'CommonInvalidParam6',
    106: 'CommonInvalidParam7',
    107: 'CommonInvalidParam8',
    108: 'CommonInvalidParam9',
    109: 'CommonInvalidParam10',
    110: 'CommonInvalidParam11',
    111: 'CommonInvalidParam12',
    112: 'CommonInvalidState',
    113: 'CommonInvalidStructure',
    114: 'CommonIOError',
    115: 'CommonInvalidParam13',
    116: 'CommonInvalidParam14',
    200: 'WalletInvalidHandle',
    201: 'WalletUnknownTypeError',
    202: 'WalletTypeAlreadyRegisteredError',
    203: 'WalletAlreadyExistsError',
    204: 'WalletNotFoundError',
    205: 'WalletIncompatiblePoolError',
    206: 'WalletAlreadyOpenedError',
    207: 'WalletAccessFailed',
    208: 'WalletInputError',
    209: 'WalletDecodingError',
    210: 'WalletStorageError',
    211: 'WalletEncryptionError',
    212: 'WalletItemNotFound',
    213: 'WalletItemAlreadyExists',
    214: 'WalletQueryError',
    300: 'PoolLedgerNotCreatedError',
    301: 'PoolLedgerInvalidPoolHandle',
    302: 'PoolLedgerTerminated',
    303: 'LedgerNoConsensusError',
    304: 'LedgerInvalidTransaction',
    305: 'LedgerSecurityError',
    306: 'PoolLedgerConfigAlreadyExistsError',
    307: 'PoolLedgerTimeout',
    308: 'PoolIncompatibleProtocolVersion',
    309: 'LedgerNotFound',
    400: 'AnoncredsRevocationRegistryFullError',
    401: 'AnoncredsInvalidUserRevocId',
    404: 'AnoncredsMasterSecretDuplicateNameError',
    405: 'AnoncredsProofRejected',
    406: 'AnoncredsCredentialRevoked',
    407: 'AnoncredsCredDefAlreadyExistsError',
    500: 'UnknownCryptoTypeError',
    600: 'DidAlreadyExistsError',
    700: 'PaymentUnknownMethodError',
    701: 'PaymentIncompatibleMethodsError',
    702: 'PaymentInsufficientFundsError',
    703: 'PaymentSourceDoesNotExistError',
    704: 'PaymentOperationNotSupportedError',
    705: 'PaymentExtraFundsError',
    706: 'TransactionNotAllowedError',
};
function isIndyError(error, errorName) {
    const indyError = error.name === 'IndyError';
    // if no specific indy error name is passed
    // or the error is no indy error
    // we can already return
    if (!indyError || !errorName)
        return indyError;
    // NodeJS Wrapper is missing some type names. When a type is missing it will
    // only have the error code as string in the message field
    // Until that is fixed we take that into account to make AFJ work with rn-indy-sdk
    // See: https://github.com/AbsaOSS/rn-indy-sdk/pull/24
    // See: https://github.com/hyperledger/indy-sdk/pull/2283
    if (!error.indyName) {
        const errorCode = Number(error.message);
        if (!isNaN(errorCode) && exports.indyErrors.hasOwnProperty(errorCode)) {
            return errorName === exports.indyErrors[errorCode];
        }
        throw new Error(`Could not determine errorName of indyError ${error.message}`);
    }
    return error.indyName === errorName;
}
exports.isIndyError = isIndyError;
