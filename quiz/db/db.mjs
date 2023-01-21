import sqlite3 from "sqlite3";
import flat from "flat";
import fs from "fs";

fs.copyFileSync("/animedb.sqlite", "/animedb_copy.sqlite");
const db = new sqlite3.Database("/animedb_copy.sqlite", sqlite3.OPEN_READONLY);

export function queryFirst(query, ...params) {
  return new Promise((res, rej) => {
    db.get(query, params, (err, singleRow) => {
      if (err) {
        return rej(err);
      }

      return res(flat.unflatten(singleRow));
    });
  });
}

export function queryAll(query, ...params) {
  console.time("query");
  return new Promise((res, rej) => {
    db.all(query, params, (err, rows) => {
      console.timeEnd("query");
      if (err) {
        return rej(err);
      }

      return res(rows.map((r) => flat.unflatten(r)));
    });
  });
}
