import BankAlBiladSMSParser from '../src/index'

const creditCardSMS = `شراء عبر نقاط البيع
بطاقة: **1234;الإئتمانية
لدى: Some merchant I paid with a credit card
دولة: السعودية
مبلغ: 12.00 SAR
رصيد: 1234.56 SAR
في: 2019-05-07 23:44`

const debitCardSMS = `مشتريات نقاط البيع
بطاقة: **4567;مدى
من: xx005
مبلغ: 34.00 SAR
لدى: Some restaurant I paid with a credit card
دولة: السعودية
في: 2019/05/07 01:29`

const badInput = 'Some str'

describe('BankAlBiladSMSParser', () => {
  describe('isDeduction', () => {
    it('returns true for credit card SMS', () => {
      expect(BankAlBiladSMSParser.isDeduction(creditCardSMS)).toBe(true)
    })

    it('returns true for debit card SMS', () => {
      expect(BankAlBiladSMSParser.isDeduction(debitCardSMS)).toBe(true)
    })

    it('returns false for any other string', () => {
      const str = 'Some str'
      expect(BankAlBiladSMSParser.isDeduction(badInput)).toBe(false)
    })
  })

  describe('getCardType', () => {
    it('returns CardType.CreditCard for credit card SMS', () => {
      expect(BankAlBiladSMSParser.getCardType(creditCardSMS)).toEqual(
        BankAlBiladSMSParser.CardType.CreditCard
      )
    })

    it('returns CardType.DebitCard for debit card SMS', () => {
      expect(BankAlBiladSMSParser.getCardType(debitCardSMS)).toEqual(
        BankAlBiladSMSParser.CardType.DebitCard
      )
    })

    it('returns null for any other string', () => {
      const str = 'Some str'
      expect(BankAlBiladSMSParser.getCardType(badInput)).toBe(null)
    })
  })

  describe('getLast4CardDigits', () => {
    it('returns last 4 digits for credit card SMS', () => {
      expect(BankAlBiladSMSParser.getLast4CardDigits(creditCardSMS)).toEqual(
        '1234'
      )
    })

    it('returns last 4 digits for debit card SMS', () => {
      expect(BankAlBiladSMSParser.getLast4CardDigits(debitCardSMS)).toEqual(
        '4567'
      )
    })

    it('returns null for any other string', () => {
      const str = 'Some str'
      expect(BankAlBiladSMSParser.getLast4CardDigits(badInput)).toBe(null)
    })
  })

  describe('getAmount', () => {
    it('returns amount for credit card SMS', () => {
      expect(BankAlBiladSMSParser.getAmount(creditCardSMS)).toEqual('12.00')
    })

    it('returns amount for debit card SMS', () => {
      expect(BankAlBiladSMSParser.getAmount(debitCardSMS)).toEqual('34.00')
    })

    it('returns null for any other string', () => {
      const str = 'Some str'
      expect(BankAlBiladSMSParser.getAmount(badInput)).toBe(null)
    })
  })

  describe('getPayee', () => {
    it('returns payee for credit card SMS', () => {
      const payee = 'Some merchant I paid with a credit card'
      expect(BankAlBiladSMSParser.getPayee(creditCardSMS)).toEqual(payee)
    })

    it('returns payee for debit card SMS', () => {
      const payee = 'Some restaurant I paid with a credit card'
      expect(BankAlBiladSMSParser.getPayee(debitCardSMS)).toEqual(payee)
    })

    it('returns null for any other string', () => {
      const str = 'Some str'
      expect(BankAlBiladSMSParser.getPayee(badInput)).toBe(null)
    })
  })

  describe('getDate', () => {
    it('returns date for credit card SMS', () => {
      const expectedDate = new Date('2019-05-07 23:44')
      expect(BankAlBiladSMSParser.getDate(creditCardSMS)).toEqual(expectedDate)
    })

    it('returns date for debit card SMS', () => {
      const expectedDate = new Date('2019-05-07 01:29')
      expect(BankAlBiladSMSParser.getDate(debitCardSMS)).toEqual(expectedDate)
    })

    it('returns null for any other string', () => {
      expect(BankAlBiladSMSParser.getDate(badInput)).toBe(null)
    })
  })
})
