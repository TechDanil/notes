import { FC } from "react";
import { INote } from "../../interfaces/INote";
import { useNoteState } from "../../hooks/useNoteState";
import { useNoteDispatch } from "../../hooks/useNoteDispatch";

import ListItem from "../../components/ListItem";

import styles from './list.module.css';

const List: FC = () => {
    const { notes, selectedNote } = useNoteState();
    const dispatch = useNoteDispatch();

    const selectNote = (note: INote) => {
        console.log(note);
        dispatch({ type: 'selected', note });
    }

    return (
        <ul className={styles.list}>
            {notes.map(note => (
                <ListItem 
                key={note.id} 
                note={note} 
                isSelected={selectedNote?.id === note.id}
                onSelectedHandler = {() => selectNote(note)}
                />
            ))}
        </ul>
    )
}

export default List;