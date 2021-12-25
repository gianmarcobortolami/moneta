/**
 * Business logic atomic unit. It describes all necessary info about a single transaction.
 * @param {string} id transaction uniquely identifier
 * @param {Date} date when the transaction is performed
 * @param {TransactionFlow} flow the direction of the transaction
 * @param {Currency} currency the currency of the transaction
 * @param {number} amount the amount of the transaction referred to the currency
 * @param {TransactionCategory} category the category to which the transaction belongs
 * @param {TransactionDeposit} depositOutcoming the deposit where transaction flow out
 * @param {TransactionDeposit} depositIncoming the deposit where transaction flow in
 */
class Transaction {
  id: string;
  date: Date;
  flow: TransactionFlow;
  currency: Currency;
  amount: number;
  category: TransactionCategory;
  depositOutcoming: TransactionDeposit;
  depositIncoming: TransactionDeposit;

  /**
   * Empty constructor. Initialize all properties with our empty constructor (if exist) or with default values.
   */
  constructor() {
    this.id = "";
    this.date = new Date();
    this.flow = TransactionFlow.None;
    this.currency = Currency.None;
    this.amount = -1;
    this.category = new TransactionCategory();
    this.depositOutcoming = new TransactionDeposit();
    this.depositIncoming = new TransactionDeposit();
  }
}

/**
 * Transaction flow enumeration.
 */
enum TransactionFlow {
  None,
  Income,
  Outcome,
  Deposit2Deposit,
}

/**
 * Transaction currency enumeration.
 */
enum Currency {
  None,
  Euro,
}

/**
 * Transaction category to which each transaction belongs to. It provides a brief description of the transaction causal.
 */
class TransactionCategory {
  id: string;
  name: string;

  /**
   * Empty constructor. Initialize all properties with default values.
   */
  constructor() {
    this.id = "";
    this.name = "";
  }
}

/**
 * Transaction deposit where the transaction flow in/out. It describes a money deposit.
 */
class TransactionDeposit {
  id: string;
  name: string;
  amount: number;

  /**
   * Empty constructor. Initialize all properties with default values.
   */
  constructor() {
    this.id = "";
    this.name = "";
    this.amount = -1;
  }
}
