import { openDB, DBSchema } from 'idb';
import { INote } from 'interfaces/INote';
import { DB_NAME, DB_VERSION, STORE_NAME } from 'settings/settings';

interface INotesDB extends DBSchema {
    notes: {
        key: number;
        value: INote;
    };
}

const db = openDB<INotesDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
    }
});

db.catch((error: unknown) => {
    throw new Error('Ошбика при открытии бд', (error as ErrorOptions | undefined));
});

export { db };