import sqlite3 from "sqlite3";
import flat from "flat";

const db = new sqlite3.Database("/animedb.sqlite");

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
  return new Promise((res, rej) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        return rej(err);
      }

      return res(rows.map((r) => flat.unflatten(r)));
    });
  });
}
