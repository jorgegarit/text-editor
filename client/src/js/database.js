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
export const putDb = async (content) => 

// GET function for IndexedDb database
export const getDb = async () => console.error('getDb not implemented');

initdb();
