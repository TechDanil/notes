import { FC, useCallback } from "react";
import { INote } from "../../interfaces/INote";
import { useNoteState } from "../../hooks/useNoteState";
import { useNoteDispatch } from "../../hooks/useNoteDispatch";
import { NoteAction } from "../../enums/NoteAction";

import ListItem from "../../components/ListItem";

import styles from './list.module.css';

const List: FC = () => {
    const { notes, selectedNote } = useNoteState();
    const dispatch = useNoteDispatch();

    const selectNote = useCallback((note: INote) => {
        dispatch({ type: NoteAction.SELECT, note });
    }, []);

    return (
        <ul className={styles.list}>
            {notes.length === 0 ? (
                <p className={styles.empty}>Записок нет</p>
            ) : (
                notes.map(note => (
                    <ListItem
                        key={note.id}
                        note={note}
                        isSelected={selectedNote?.id === note.id}
                        onSelectedHandler={() => selectNote(note)}
                    />
                ))
            )}
        </ul>
    )
}

export default List;