import { FC } from "react";

import { INote } from "../../interfaces/INote";
import { createNote } from "../../utils/createNote/createNote";
import { useNoteState } from "../../hooks/useNoteState";

import SearchBox from "../SearchBox";
import Button from "../Button";

import styles from './noteHeader.module.css';

interface INoteHeader {
    handleAddNote: (note: INote) => void;
}

const NoteHeader: FC<INoteHeader> = ({
    handleAddNote,
}) => {
    const { selectedNote } = useNoteState();

    const onAddNoteHandler = () => {
        const note = createNote();
        handleAddNote(note);
    }

    return (
        <div className={styles.header}>
            <div className={styles.buttons}>
                <Button onClick={onAddNoteHandler}>+</Button>
                <Button
                    isDisabled={!selectedNote}
                >
                    del
                </Button>

                <Button
                    isDisabled={!selectedNote}
                >
                    edit
                </Button>
            </div>
            <SearchBox />
        </div>
    );
}

export default NoteHeader;