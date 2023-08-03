import { FC, useEffect, useContext } from "react";
import { db } from "../../utils/db";
import { STORE_NAME } from "../../settings/settings";
import { INote } from "../../interfaces/INote";
import { NoteDispatchContext } from "../../context/NoteContext";

import NoteHeader from "../NoteHeader";
import Workspace from "../Workspace";
import SideBar from "../Sidebar";
import styles from './app.module.css';

const App: FC = () => {
    const dispatch = useContext(NoteDispatchContext);

    useEffect(() => {
        const loadNotesFromDB = async () => {
            try {
                const database = await db;
                const dbNotes = await database.getAll(STORE_NAME);
                console.log(dbNotes);
                dispatch?.({ type: 'load', notes: dbNotes });
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
            dispatch?.({ type: 'add', note: item });
        } catch (error) {
            throw new Error('Ошибка добавления записки в бд', (error as ErrorOptions | undefined));
        }
    }

    const handleRemoveNote = async (id: number) => {
        try {
            const database = await db;
            await database.delete(STORE_NAME, id)
            dispatch?.({ type: 'delete', id });
        } catch(error) {
            throw new Error('Ошибка удаления записки в бд', (error as ErrorOptions | undefined));
        }
    }

    const handleEditNote = async (note: INote) => {
        try {
            const database = await db;
            await database.put(STORE_NAME, note);
            dispatch?.({ type: 'edit', note });
        } catch(error) {
            throw new Error('Ошибка редактирования записки в бд', (error as ErrorOptions | undefined));
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <NoteHeader
                    handleAddNote={handleAddNote}
                />
                <div className={styles.content}>
                    <SideBar />
                    <Workspace
                        handleEditNote={handleEditNote}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;