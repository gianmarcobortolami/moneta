import {
  insertTransaction,
  removeTransaction,
} from "../database/databaseUtils";

import { Category } from "./Category";
import { Deposit } from "./Deposit";

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
export class Transaction {
  id: number;
  date: Date;
  flow: Flow;
  currency: Currency;
  amount: number;
  category: Category;
  depositOut: Deposit;
  depositIn: Deposit;

  //constructor();
  constructor(
    date?: Date,
    flow?: Flow,
    currency?: Currency,
    amount?: number,
    category?: Category,
    depositOut?: Deposit,
    depositIn?: Deposit
  ) {
    this.id = -1;
    this.date = date || new Date();
    this.flow = flow || Flow.None;
    this.currency = currency || Currency.None;
    this.amount = amount || -1;
    this.category = category || new Category();
    this.depositOut = depositOut || new Deposit();
    this.depositIn = depositIn || new Deposit();
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
    if (
      this.flow == Flow.Deposit2Deposit &&
      !this.depositIn.isInit() &&
      !this.depositOut.isInit()
    ) {
      return false;
    }
    return (
      this.id !== -1 &&
      this.flow !== Flow.None &&
      this.currency !== Currency.None &&
      this.amount !== -1 &&
      this.category.isInit() &&
      this.depositIn.isInit()
    );
  }

  /**
   * Insert into the database the transaction istance.
   */
  insertDB() {
    insertTransaction(this);
  }

  /**
   * Remove from the database the transaction istance.
   */
  removeDB() {
    removeTransaction(this);
  }
}

/**
 * Flow enumeration.
 * - None, default value
 * - Income
 * - Outcome
 * - Deposit2Deposit, when money are transferred from a deposit to another one
 */
export enum Flow {
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
export enum Currency {
  None,
  Euro,
}
