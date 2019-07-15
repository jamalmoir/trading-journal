import Big from 'big.js';


const CURRENCY_DECIMALS = {
    'AED': Big('2'),
    'AFN': Big('2'),
    'ALL': Big('2'),
    'AMD': Big('2'),
    'ANG': Big('2'),
    'AOA': Big('2'),
    'ARS': Big('2'),
    'AUD': Big('2'),
    'AWG': Big('2'),
    'AZN': Big('2'),
    'BAM': Big('2'),
    'BBD': Big('2'),
    'BDT': Big('2'),
    'BGN': Big('2'),
    'BHD': Big('3'),
    'BIF': Big('0'),
    'BMD': Big('2'),
    'BND': Big('2'),
    'BOB': Big('2'),
    'BOV': Big('2'),
    'BRL': Big('2'),
    'BSD': Big('2'),
    'BTN': Big('2'),
    'BWP': Big('2'),
    'BYN': Big('2'),
    'BZD': Big('2'),
    'CAD': Big('2'),
    'CDF': Big('2'),
    'CHE': Big('2'),
    'CHF': Big('2'),
    'CHW': Big('2'),
    'CLF': Big('4'),
    'CLP': Big('0'),
    'CNY': Big('2'),
    'COP': Big('2'),
    'COU': Big('2'),
    'CRC': Big('2'),
    'CUC': Big('2'),
    'CUP': Big('2'),
    'CVE': Big('2'),
    'CZK': Big('2'),
    'DJF': Big('0'),
    'DKK': Big('2'),
    'DOP': Big('2'),
    'DZD': Big('2'),
    'EGP': Big('2'),
    'ERN': Big('2'),
    'ETB': Big('2'),
    'EUR': Big('2'),
    'FJD': Big('2'),
    'FKP': Big('2'),
    'GBP': Big('2'),
    'GEL': Big('2'),
    'GHS': Big('2'),
    'GIP': Big('2'),
    'GMD': Big('2'),
    'GNF': Big('0'),
    'GTQ': Big('2'),
    'GYD': Big('2'),
    'HKD': Big('2'),
    'HNL': Big('2'),
    'HRK': Big('2'),
    'HTG': Big('2'),
    'HUF': Big('2'),
    'IDR': Big('2'),
    'ILS': Big('2'),
    'INR': Big('2'),
    'IQD': Big('3'),
    'IRR': Big('2'),
    'ISK': Big('0'),
    'JMD': Big('2'),
    'JOD': Big('3'),
    'JPY': Big('0'),
    'KES': Big('2'),
    'KGS': Big('2'),
    'KHR': Big('2'),
    'KMF': Big('0'),
    'KPW': Big('2'),
    'KRW': Big('0'),
    'KWD': Big('3'),
    'KYD': Big('2'),
    'KZT': Big('2'),
    'LAK': Big('2'),
    'LBP': Big('2'),
    'LKR': Big('2'),
    'LRD': Big('2'),
    'LSL': Big('2'),
    'LYD': Big('3'),
    'MAD': Big('2'),
    'MDL': Big('2'),
    'MGA': Big('2'),
    'MKD': Big('2'),
    'MMK': Big('2'),
    'MNT': Big('2'),
    'MOP': Big('2'),
    'MRU': Big('2'),
    'MUR': Big('2'),
    'MVR': Big('2'),
    'MWK': Big('2'),
    'MXN': Big('2'),
    'MXV': Big('2'),
    'MYR': Big('2'),
    'MZN': Big('2'),
    'NAD': Big('2'),
    'NGN': Big('2'),
    'NIO': Big('2'),
    'NOK': Big('2'),
    'NPR': Big('2'),
    'NZD': Big('2'),
    'OMR': Big('3'),
    'PAB': Big('2'),
    'PEN': Big('2'),
    'PGK': Big('2'),
    'PHP': Big('2'),
    'PKR': Big('2'),
    'PLN': Big('2'),
    'PYG': Big('0'),
    'QAR': Big('2'),
    'RON': Big('2'),
    'RSD': Big('2'),
    'RUB': Big('2'),
    'RWF': Big('0'),
    'SAR': Big('2'),
    'SBD': Big('2'),
    'SCR': Big('2'),
    'SDG': Big('2'),
    'SEK': Big('2'),
    'SGD': Big('2'),
    'SHP': Big('2'),
    'SLL': Big('2'),
    'SOS': Big('2'),
    'SRD': Big('2'),
    'SSP': Big('2'),
    'STN': Big('2'),
    'SVC': Big('2'),
    'SYP': Big('2'),
    'SZL': Big('2'),
    'THB': Big('2'),
    'TJS': Big('2'),
    'TMT': Big('2'),
    'TND': Big('3'),
    'TOP': Big('2'),
    'TRY': Big('2'),
    'TTD': Big('2'),
    'TWD': Big('2'),
    'TZS': Big('2'),
    'UAH': Big('2'),
    'UGX': Big('0'),
    'USD': Big('2'),
    'USN': Big('2'),
    'UYI': Big('0'),
    'UYU': Big('2'),
    'UYW': Big('4'),
    'UZS': Big('2'),
    'VES': Big('2'),
    'VND': Big('0'),
    'VUV': Big('0'),
    'WST': Big('2'),
    'XAF': Big('0'),
    'XCD': Big('2'),
    'XOF': Big('0'),
    'XPF': Big('0'),
    'YER': Big('2'),
    'ZAR': Big('2'),
    'ZMW': Big('2'),
    'ZWL': Big('2'),
}

export type CurrencySymbol = 'AED'|'AFN'|'ALL'|'AMD'|'ANG'|'AOA'|'ARS'|'AUD'|'AWG'|'AZN'|'BAM'|'BBD'|'BDT'|'BGN'|'BHD'|'BIF'|'BMD'|'BND'|'BOB'|'BOV'|'BRL'|'BSD'|'BTN'|'BWP'|'BYN'|'BZD'|'CAD'|'CDF'|'CHE'|'CHF'|'CHW'|'CLF'|'CLP'|'CNY'|'COP'|'COU'|'CRC'|'CUC'|'CUP'|'CVE'|'CZK'|'DJF'|'DKK'|'DOP'|'DZD'|'EGP'|'ERN'|'ETB'|'EUR'|'FJD'|'FKP'|'GBP'|'GEL'|'GHS'|'GIP'|'GMD'|'GNF'|'GTQ'|'GYD'|'HKD'|'HNL'|'HRK'|'HTG'|'HUF'|'IDR'|'ILS'|'INR'|'IQD'|'IRR'|'ISK'|'JMD'|'JOD'|'JPY'|'KES'|'KGS'|'KHR'|'KMF'|'KPW'|'KRW'|'KWD'|'KYD'|'KZT'|'LAK'|'LBP'|'LKR'|'LRD'|'LSL'|'LYD'|'MAD'|'MDL'|'MGA'|'MKD'|'MMK'|'MNT'|'MOP'|'MRU'|'MUR'|'MVR'|'MWK'|'MXN'|'MXV'|'MYR'|'MZN'|'NAD'|'NGN'|'NIO'|'NOK'|'NPR'|'NZD'|'OMR'|'PAB'|'PEN'|'PGK'|'PHP'|'PKR'|'PLN'|'PYG'|'QAR'|'RON'|'RSD'|'RUB'|'RWF'|'SAR'|'SBD'|'SCR'|'SDG'|'SEK'|'SGD'|'SHP'|'SLL'|'SOS'|'SRD'|'SSP'|'STN'|'SVC'|'SYP'|'SZL'|'THB'|'TJS'|'TMT'|'TND'|'TOP'|'TRY'|'TTD'|'TWD'|'TZS'|'UAH'|'UGX'|'USD'|'USN'|'UYI'|'UYU'|'UYW'|'UZS'|'VES'|'VND'|'VUV'|'WST'|'XAF'|'XCD'|'XOF'|'XPF'|'YER'|'ZAR'|'ZMW'|'ZWL';

export class Currency {
    symbol: CurrencySymbol;
    decimals: Big;

    constructor(symbol: CurrencySymbol) {
        this.symbol = symbol;
        this.decimals = CURRENCY_DECIMALS[symbol]
    }
}

export class Money {
    amount: Big;
    currency: Currency;

    constructor(amount: string | Big, currency: CurrencySymbol) {
        this.currency = new Currency(currency);
        this.amount = Big(amount);
    }

    toString = () => {
        return this.amount.toPrecision(Number(this.currency.decimals))
    }

    _arithmetic = (op: (a: Big, b?: Big) => Big, other?: Money | Big) => {
        if (other instanceof Money && this.currency.symbol != other.currency.symbol) {
            throw Error("Currencies are different");
        }

        let b = other instanceof Money ? other.amount : other

        return new Money(op(this.amount, b), this.currency.symbol);
    }

    plus = (other: Money) => this._arithmetic((a: Big, b: Big) => a.add(b), other);
    minus = (other: Money) => this._arithmetic((a: Big, b: Big) => a.sub(b), other);
    times = (other: Money | Big) => this._arithmetic((a: Big, b: Big) => a.times(b), other);
    divide = (other: Money | Big) => this._arithmetic((a: Big, b: Big) => a.div(b), other);
    pow = (other: Big) => this._arithmetic((a: Big, b: Big) => a.pow(Number(b)), other);
    sqrt = () => this._arithmetic((a: Big) => a.sqrt());
    abs = () => this._arithmetic((a: Big) => a.abs());
}