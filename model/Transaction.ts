import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from "react-native-sqlite-storage";

enablePromise(true);
const MONETA_DB = "../database/moneta.db";

/**
 * Business logic atomic unit. It describes all necessary info about a single transaction.
 * - id (string), transaction uniquely identifier
 * - date (Date), when the transaction is performed (ISO8601)
 * - flow (TransactionFlow), the direction of the transaction
 * - currency (Currency), the currency of the transaction
 * - amount (number), the amount of the transaction referred to the currency
 * - category (TransactionCategory), the category to which the transaction belongs
 * - depositOutcoming (TransactionDeposit), the deposit where transaction flow out
 * - depositIncoming (TransactionDeposit), the deposit where transaction flow in
 */
class Transaction {
  id: number;
  date: Date;
  flow: Flow;
  currency: Currency;
  amount: number;
  category: Category;
  depositOut: Deposit;
  depositIn: Deposit;

  constructor() {
    this.id = 0;
    this.date = new Date();
    this.flow = Flow.None;
    this.currency = Currency.None;
    this.amount = -1;
    this.category = new Category();
    this.depositOut = new Deposit();
    this.depositIn = new Deposit();
  }

  /**
   * Description of Transaction instance
   */
  toString(): string {
    return (
      "Transaction(" +
      "id:" +
      this.id +
      ",date:" +
      this.date.toISOString() +
      ",flow:" +
      this.flow +
      ",currency:" +
      this.currency +
      ",amount:" +
      this.amount +
      ",category:" +
      this.category.toString() +
      ",depositOut:" +
      this.depositOut.toString() +
      ",depositIn:" +
      this.depositIn.toString() +
      ")"
    );
  }

  /**
   * Check if the transaction isn't initialized.
   * @returns True if currency isn't None or amount isn't -1 or category, deposit in or deposit out aren't initialized, False otherwise.
   */
  isInit(): boolean {
    if (this.flow == Flow.Deposit2Deposit) {
      return (
        this.currency !== Currency.None &&
        this.amount !== -1 &&
        this.category.isInit() &&
        this.depositIn.isInit() &&
        this.depositOut.isInit()
      );
    }
    return (
      this.flow !== Flow.None &&
      this.currency !== Currency.None &&
      this.amount !== -1 &&
      this.category.isInit() &&
      this.depositIn.isInit()
    );
  }

  /**
   * Insert into the table TRANSACTION the transaction istance.
   */
  async insert() {
    if (this.isInit()) {
      console.log(
        this.toString() +
          " not inserted, becasue doesn't initialized correctly."
      );
      return;
    }
    const db = await openDatabase({ name: MONETA_DB, location: "default" });
    const table = "TRANSACTION";
    const insertQuery = `
      INSERT INTO ${table} (date, flow, currency, amount, category_id, deposit_id_in, deposit_id_out)
      VALUES (
        ${this.date.toISOString()}, 
        ${this.flow}, 
        ${this.currency}, 
        ${this.amount}, 
        ${this.category.id}, 
        ${this.depositIn.id}, 
        ${this.depositOut.id}
      )
    `;
    return db.executeSql(insertQuery);
  }

  async remove() {
    const db = await openDatabase({ name: MONETA_DB, location: "default" });
    const table = "TRANSACTION";
    const removeQuery = `
      DELETE from ${table} where transaction_id = ${this.id}
    `;
    return db.executeSql(removeQuery);
  }
}

/**
 * Flow enumeration.
 * - None, default value
 * - Income
 * - Outcome
 * - Deposit2Deposit, when money are transferred from a deposit to another one
 */
enum Flow {
  None,
  Income,
  Outcome,
  Deposit2Deposit,
}

/**
 * Transaction currency enumeration.
 * - None, default value
 * - Euro
 */
enum Currency {
  None,
  Euro,
}
