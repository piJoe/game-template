import Database from "better-sqlite3";
import flat from "flat";

// fs.copyFileSync("/animedb.sqlite", "/animedb_copy.sqlite");
const fileDB = new Database("/animedb.sqlite", {
  readonly: true,
});
const buffer = fileDB.serialize();
fileDB.close();
const db = new Database(buffer);

process.on("exit", () => db.close());

export function queryFirst(query, ...params) {
  return new Promise((res, rej) => {
    const q = db.prepare(query);
    const row = q.get(...params);
    return res(flat.unflatten(row));
  });
}

export function queryAll(query, ...params) {
  return new Promise((res, rej) => {
    const q = db.prepare(query);
    const rows = q.all(...params);
    return res(flat.unflatten(rows));
  });
}
