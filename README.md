# Bank Al Bilad SMS Parser
[![](https://img.shields.io/circleci/project/github/obahareth/bank-al-bilad-sms-parser/master.svg?style=popout)](https://circleci.com/gh/obahareth/bank-al-bilad-sms-parser)
[![](https://img.shields.io/npm/v/bank-al-bilad-sms-parser.svg?style=popout)](https://www.npmjs.com/package/bank-al-bilad-sms-parser)

This library parses SMS messages sent from [Bank Al Bilad](https://bankalbilad.com) which look like this for credit card transactions

```
شراء عبر نقاط البيع
بطاقة: **1234;الإئتمانية
لدى: Some merchant I paid with a credit card
دولة: السعودية
مبلغ: 12.00 SAR
رصيد: 1234.56 SAR
في: 2019-05-07 23:44
```

and like this for debit card transactions

```
مشتريات نقاط البيع
بطاقة: **4567;مدى
من: xx005
مبلغ: 34.00 SAR
لدى: Some restaurant I paid with a credit card
دولة: السعودية
في: 2019/05/07 01:29
```

You can use this library to parse specific parts from the message body.

## Examples

```ts
// Assuming that `message` is the credit card message above.

BankAlBiladSMSParser.isDeduction(message)
// true or false

BankAlBiladSMSParser.getCardType(message)
// "credit_card", or null if not parse-able ("debit_card" for debit)

BankAlBiladSMSParser.getLast4CardDigits(message)
// "1234" or null if not parse-able

BankAlBiladSMSParser.getAmount(message)
// "12.00" or null if not parse-able

BankAlBiladSMSParser.getPayee(message)
// "Some merchant I paid with a credit card" null if not parse-able

BankAlBiladSMSParser.getDate(message)
// A JS Date object in the UTC time zone or null if not parse-able
```
