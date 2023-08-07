import { FC, useEffect, useContext, useState, useCallback } from "react";
import { db } from "../../utils/db";
import { STORE_NAME } from "../../settings/settings";
import { INote } from "../../interfaces/INote";
import { NoteDispatchContext } from "../../context/NoteContext";
import { useNoteState } from "../../hooks/useNoteState";
import { NoteAction } from "../../enums/NoteAction";

import Button from "../Button";
import Modal from "../Modal";
import NoteHeader from "../NoteHeader";
import Workspace from "../Workspace";
import SideBar from "../Sidebar";
import styles from './app.module.css';

const App: FC = () => {
    const { selectedNote } = useNoteState();
    const dispatch = useContext(NoteDispatchContext);

    const [isModalActive, setIsModalActive] = useState(false);

    useEffect(() => {
        const loadNotesFromDB = async () => {
            try {
                const database = await db;
                const dbNotes = await database.getAll(STORE_NAME);
                console.log(dbNotes);
                dispatch?.({ type: NoteAction.LOAD, notes: dbNotes, initialNotes: dbNotes });
            } catch(error) {
                throw new Error('Ошибка загрузки записок из indexedDB.', (error as ErrorOptions | undefined));
            }
        }

        loadNotesFromDB();
    }, []);

    const handleAddNote = useCallback(async (item: INote) => {
        try {
            const database = await db;
            await database.add(STORE_NAME, item);
            dispatch?.({ type: NoteAction.ADD, note: item });
        } catch (error) {
            throw new Error('Ошибка добавления записки в бд', (error as ErrorOptions | undefined));
        }
    }, []);

    const handleRemoveNote = async (id: number) => {
        try {
            const database = await db;
            await database.delete(STORE_NAME, id)
            dispatch?.({ type: NoteAction.DELETE, id });
        } catch(error) {
            throw new Error('Ошибка удаления записки в бд', (error as ErrorOptions | undefined));
        }
    }

    const handleEditNote = useCallback(async (note: INote) => {
        try {
            const database = await db;
            await database.put(STORE_NAME, note);
            dispatch?.({ type: NoteAction.EDIT, note });
        } catch(error) {
            throw new Error('Ошибка редактирования записки в бд', (error as ErrorOptions | undefined));
        }
    }, []);
    
    const deleteNote = useCallback(() => {
        if (selectedNote) {
            const { id } = selectedNote as INote;
            handleRemoveNote(id);
            console.log(id);
            dispatch?.({ type: NoteAction.DELETE, id });
        }

        setIsModalActive(false);
    }, [selectedNote]);

    const closeModal = () => {
        console.log('closed');
        setIsModalActive(false);
    }

    const openModal = useCallback(() => {
        console.log('worked');
        setIsModalActive(true);
    }, [selectedNote]);

    console.log(isModalActive);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <NoteHeader
                        handleAddNote={handleAddNote}
                        openModal={openModal}
                    />
                    <div className={styles.content}>
                        <SideBar />
                        <Workspace
                            handleEditNote={handleEditNote}
                        />
                    </div>
                </div>
            </div>

            {isModalActive && (
                <Modal onCloseModalHandler={closeModal}>
                    <p>Вы уверены что хотите удалить заметку?</p>
                    <Button onClick={deleteNote}>Да</Button>
                </Modal>
            )}
        </>
    );
}

export default App;