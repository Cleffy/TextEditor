import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

/**
 * @description Method that adds content to the database
 * @param {} content 
 */
export const putDb = async (content) => {
  const contentDB = await openDB('jate', 1);
  const tx = contentDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const result = await store.put(content);
  console.log('Added to database:', result);
};

/**
 * @description Method that retrieves content from the database
 * @returns {Promise<Array>} Array of content
 */
export const getDb = async () => {
  const contentDB = await openDB('jate', 1);
  const tx = contentDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const result = await store.getAll();
  console.log('Retrieved:', result);
  return result;
};

initdb();
