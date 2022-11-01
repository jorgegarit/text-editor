import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

const initdb = async () =>
  // this will create a new databse caled 'jate' this will be version 1
  openDB('jate', 1, {
    // this will add the database schema if not already initialized
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // new object store created for the data with key name of 'id'
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// PUT function for IndexedDb databse
export const putDb = async (content) => {
  console.log('PUT to the database');

  // create connection to the database and the specific version
  const jateDb = await openDB('jate', 1);

  // create a new transaction with specified store and data priviledges
  const tx = jateDb.transaction('jate', 'readwrite');

  // open the desired object store
  const store = tx.objectStore('jate');

  // use the put method to update object in the database
  const request = store.put({ jate: content });

  // get confirmation of the PUT request
  const result = await request;
  console.log('the data has been saved to the databse', result);
};

// GET function for IndexedDb database
export const getDb = async () => {
  console.log('GET from the database');

  // create connection to the database and the specific version
  const jateDb = await openDB('jate', 1);

  // create a new transaction with specified store and data priviledges
  const tx = jateDb.transaction('jate', 'readonly');

  // open the desired object store
  const store = tx.objectStore('jate');

  // use the get method to get all the data in the database
  const request = store.getAll();

  // get confirmation of the GET request
  const result = await request;
  console.log('result.value', result);
};

initdb();
