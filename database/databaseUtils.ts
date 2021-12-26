import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from "react-native-sqlite-storage";
import { Transaction } from "../model/Transaction";

enablePromise(true);

// Database path
const MONETA_DB = "moneta.db";

// Tables name
const TRANSACTION_TB = "TRANSACTION";
const CATEGORY_TB = "CATEGORY";
const DEPOSIT_TB = "DEPOSIT";

/**
 * Insert into the database the transaction istance. Returns -1 if the insertion fails.
 * @param t {Transaction} a transaction instance to insert into TRANSACTION table on MONETA db.
 */
export const insertTransaction = async (t: Transaction) => {
  if (t.isInit()) {
    console.log("[INSERTION FAILED - err:0] " + t.toString());
    return -1;
  }
  // TO-DO: Handle the wrong opening of the database
  const db = await openDatabase({ name: MONETA_DB, location: "default" });
  const insertQuery = `
      INSERT INTO ${TRANSACTION_TB} (date, flow, currency, amount, category_id, deposit_id_in, deposit_id_out)
      VALUES (
        ${t.date.toISOString()}, 
        ${t.flow}, 
        ${t.currency}, 
        ${t.amount}, 
        ${t.category.id}, 
        ${t.depositIn.id}, 
        ${t.depositOut.id}
      )
    `;
  return db.executeSql(insertQuery);
};

/**
 * Insert into the database the transaction istances. Returns -1 if the insertion fails.
 * @param tArray {Transaction[]} array of transaction instances to insert into TRANSACTION table on MONETA db.
 */
export const insertTransactions = async (tArray: Transaction[]) => {
  tArray.map((t) => {
    insertTransaction(t);
  });
};

/**
 * Remove from the database the transaction istance. Returns -1 if the remove fails.
 * @param t {Transaction} a transaction instance to remove from TRANSACTION table on MONETA db.
 */
export const removeTransaction = async (t: Transaction) => {
  if (t.id === -1) {
    console.log("[REMOVE FAILED - err:0] " + t.toString());
    return -1;
  }
  return removeTransactionById(t.id);
};

/**
 * Remove from the database the transaction istance related to the id. Returns -1 if the remove fails.
 * @param id {number} a transaction instance's id to remove from TRANSACTION table on MONETA db.
 */
export const removeTransactionById = async (id: number) => {
  if (id === -1) {
    console.log("[REMOVE FAILED - err:1]");
    return -1;
  }
  const db = await openDatabase({ name: MONETA_DB, location: "default" });
  const removeQuery = `
      DELETE from ${TRANSACTION_TB} where transaction_id = ${id}
    `;
  return db.executeSql(removeQuery);
};

/**
 * Remove from the database the transaction istances. Returns -1 if the insertion fails.
 * @param idArray {number[]} array of the transaction instances' id to remove from TRANSACTION table on MONETA db.
 */
export const removeTransactionsById = async (idArray: number[]) => {
  idArray.map((id) => {
    removeTransactionById(id);
  });
};

/**
 * Remove from the database the transaction istances. Returns -1 if the insertion fails.
 * @param tArray {Transaction[]} array of transaction instances to remove from TRANSACTION table on MONETA db.
 */
export const removeTransactions = async (tArray: Transaction[]) => {
  const idArray = new Array<number>();
  tArray.map((t) => {
    idArray.push(t.id);
  });
  idArray.map((id) => {
    removeTransactionById(id);
  });
};
