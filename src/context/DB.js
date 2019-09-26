// Database functions
import React, { useState, useEffect } from 'react';
// import { SQLite } from 'expo-sqlite'; // no db so far
import { data as dummyData } from './data';

// const db = SQLite.openDatabase('products.db'); // no db so far

// useEffect(() => {
/* only if database is there */
// db.transaction(tx => {
//   tx.executeSql(
//     'create table if not exists products (id integer primary key not null, name text, amount tinyint, category text, label text, bbdate date, notification date, note text);',
//     [],
//     () =>
//       dummyData.forEach(item => {
//         const {
//           name,
//           amount,
//           category,
//           labels,
//           expiryDate,
//           notificationDate,
//           notes,
//         } = item;
//         saveDataToDB(
//           name,
//           amount,
//           category,
//           labels,
//           expiryDate,
//           notificationDate,
//           notes
//         );
//       }),
//     err => console.warn(err)
//   );
// });
/* load */
// }, []);
/* Database methods */
/* load entries from database to the state */
// const getDataFromDB = () => {
//   setError(false);
//   setIsLoading(true);
//   db.transaction(tr =>
//     tr.executeSql('SELECT * FROM products', [], (tx, res) =>
//       setProducts(res.rows._array)));
//   // console.warn(res.rows._array)));
// };

/* evaluate the date of today */
// const todayDate = () => {
//   const myDate = new Date();
//   let month = (myDate.getMonth() + 1).toFixed(0);
//   let day = myDate.getDate().toFixed(0);
//   const year = myDate.getFullYear().toFixed(0);
//   if (month.length < 2) month = `0${month}`;
//   if (day.length < 2) day = `0${day}`;
//   return [year, month, day].join('-');
// };
/* save a new item to the database */

// const saveDataToDB = (
//   name,
//   amount,
//   category,
//   label,
//   expire,
//   notification,
//   notes
// ) => {
//   const labelString = typeof label === 'string' ? label : label.join(',');
//   db.transaction(
//     tx => {
//       tx.executeSql(
//         'insert into products (name, amount, category, label, bbdate, notification, note) values (?,?,?,?,?,?,?)',
//         [name, amount, category, labelString, expire, notification, notes],
//         () => console.warn('insert'),
//         err => console.warn(err)
//       );
//       tx.executeSql('select * from products', [], (_, { rows }) =>
//         console.warn(rows));
//     },
//     null,
//     getDataFromDB
//   );
// };
/* re-adding an item to the database (undo delete) */
// const undoDeleteInDB = () => {
//   const {
//     productName,
//     amount,
//     productCategory,
//     labels,
//     bestBeforeDate,
//     pushNotificationDate,
//     customNote,
//   } = lastDeletedProduct;
//   db.transaction(tr =>
//     tr.executeSql(
//       'INSERT INTO products (productName, amount, productCategory, labels, bestBeforeDate, pushNotificationDate, customNote) VALUES (?,?)',
//       [
//         productName,
//         amount,
//         productCategory,
//         labels,
//         bestBeforeDate,
//         pushNotificationDate,
//         customNote,
//         barcode,
//         dateAdded,
//       ]
//     ));
// };
/* update an item in the database */
// const updateDataInDB = (
//   id,
//   productName,
//   amount,
//   productCategory,
//   labels,
//   bestBeforeDate,
//   pushNotificationDate,
//   customNote
// ) => {
//   db.transaction(tr =>
//     tr.executeSql(
//       'UPDATE products SET productName = ?, amount = ?, productCategory = ?, labels = ?, bestBeforeDate = ?, pushNotificationDate = ?, customNote = ? WHERE id = ?',
//       [
//         productName,
//         amount,
//         productCategory,
//         labels,
//         bestBeforeDate,
//         pushNotificationDate,
//         customNote,
//         id,
//       ]
//     ));
// };

/* update the product name for all products with the same name */
// const updateProductNameInDB = (oldproductName, newproductName) => {
//   db.transaction(tr =>
//     tr.executeSql('UPDATE SET productName = ? WHERE productName = ?', [
//       newproductName,
//       oldproductName,
//     ]));
// };

/* update the category for all products with the same name */
// const updateProductCategoryInDB = (productName, newcat) => {
//   db.transaction(tr =>
//     tr.executeSql('UPDATE SET productCategory = ? WHERE productName = ?', [
//       newcat,
//       productName,
//     ]));
// };
/* delete an item from the database */
// const deleteDataFromDB = id => {
//   db.transaction(tr =>
//     tr.executeSql('DELETE FROM products WHERE id = ?', [id]));
// };
/* delete the whole table */
// const deleteAll = () => {
//   db.transaction(tr =>
//     tr.executeSql(
//       'drop table products',
//       [],
//       () => console.warn('DB deleted'),
//       err => console.warn(err)
//     ));
// };

/* save the new item to the database */
// saveDataToDB(
//   productName,
//   amount,
//   productCategory,
//   labels,
//   bestBeforeDate,
//   pushNotificationDate,
//   customNote
// );
// console.warn('stored');

/* Delete from the database within deleteProduct in Context.js */
// deleteDataFromDB(productId);

/* Update data in DB within updateProduct in Context.js */
// updateDataInDB(
//   data[index].id,
//   productName,
//   amount,
//   productCategory,
//   labels,
//   bestBeforeDate,
//   pushNotificationDate,
//   customNote
// );
