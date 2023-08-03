import { FC, ReactNode, useEffect, useState  } from 'react'; 
import { Context } from '../../context/Context';
import { db } from '../../utils/db';

import { INote } from '../../interfaces/INote';
import { STORE_NAME } from 'settings/settings';

interface IContextProvider {
    children: ReactNode;
}

const ContextProvider: FC<IContextProvider> = ({ children })=> {
    const [notes, setNotes] = useState<INote[]>([]);
    const [selectedNote, setSelectedNote] = useState<INote | null>(null);

    useEffect(() => {
        const loadNotesFromDB = async () => {
            try {
                const database = await db;
                const dbNotes = await database.getAll(STORE_NAME);
                console.log(dbNotes);
                setNotes(dbNotes);
            } catch(error) {
                throw new Error('Ошибка загрузки записок из indexedDB.', (error as ErrorOptions | undefined));
            }
        }

        loadNotesFromDB();
    }, []);

    const handleAddNote = async (item: INote) => {
        try {
            const database = await db;
            await database.add(STORE_NAME, item);
            setNotes([...notes, item]);
        } catch (error) {
            throw new Error('Ошибка добавления записки в бд', (error as ErrorOptions | undefined));
        }
    }

    const handleRemoveNote = async (id: number) => {
        try {
            const database = await db;
            await database.delete(STORE_NAME, id)
            setNotes(notes.filter(note => note.id !== id));
            setSelectedNote(null);
        } catch(error) {
            throw new Error('Ошибка удаления записки в бд', (error as ErrorOptions | undefined));
        }
    }

    const handleEditNote = async (note: INote) => {
        try {
            const database = await db;
            await database.put(STORE_NAME, note);
            setNotes(notes.map(item => item.id === note.id ? note : item));
        } catch(error) {
            throw new Error('Ошибка редактирования записки в бд', (error as ErrorOptions | undefined));
        }
    }

    const handleSelectNote = (note: INote) => {
        setSelectedNote?.(note);
    }
 
    return (
        <Context.Provider value={{
            notes,
            selectedNote,
            addNote: handleAddNote,
            removeNote: handleRemoveNote,
            selectNote: handleSelectNote,
            editNote: handleEditNote,
        }}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;