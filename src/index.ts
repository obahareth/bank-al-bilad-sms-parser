enum CardType {
  DebitCard = 'debit_card',
  CreditCard = 'credit_card'
}

class BankAlBiladSMSParser {
  public static CardType = CardType

  public static isDeduction(text: string): boolean {
    return text.includes('شراء') || text.includes('مشتريات')
  }

  public static getCardType(text: string): CardType | null {
    if (text.includes('مدى')) {
      return CardType.DebitCard
    } else if (text.includes('الإئتمانية')) {
      return CardType.CreditCard
    }

    return null
  }

  public static getLast4CardDigits(text: string): string | null {
    const digitsRegex = /بطاقة: \*\*(?<digits>\d{1,})/g
    return BankAlBiladSMSParser.getRegexGroup(digitsRegex, text, 'digits')
  }

  public static getAmount(text: string): string | null {
    const amountRegex = /مبلغ: (?<amount>\d{1,}\.\d{1,})/g
    return BankAlBiladSMSParser.getRegexGroup(amountRegex, text, 'amount')
  }

  public static getPayee(text: string): string | null {
    const payeeRegex = /لدى: (?<payee>.*)/g

    return BankAlBiladSMSParser.getRegexGroup(payeeRegex, text, 'payee')
  }

  public static getDate(text: string): Date | null {
    const dateRegex = /في: (?<date>.*)/g
    const dateStr = BankAlBiladSMSParser.getRegexGroup(dateRegex, text, 'date')

    return dateStr !== null ? new Date(dateStr) : null
  }

  static getRegexGroup(
    regex: RegExp,
    str: string,
    groupName: string
  ): string | null {
    const match = regex.exec(str)

    if (match && match.groups && match.groups[groupName]) {
      return match.groups[groupName]
    }

    return null
  }
}

export = BankAlBiladSMSParser
