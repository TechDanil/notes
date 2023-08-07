import { FC, memo } from "react";

import { INote } from "../../interfaces/INote";
import { createNote } from "../../utils/createNote/createNote";
import { useNoteState } from "../../hooks/useNoteState";
import { QueryStatus } from "../../enums/QueryStatus";


import SearchBox from "../SearchBox";
import Button from "../Button";

import styles from './noteHeader.module.css';

interface INoteHeader {
    handleAddNote: (note: INote) => void;
    openModal: () => void;
}

const NoteHeader: FC<INoteHeader> = ({
    handleAddNote,
    openModal
}) => {
    const { selectedNote, query } = useNoteState();

    const onAddNoteHandler = () => {
        const note = createNote();
        handleAddNote(note);
    }

    const onDeleteNote = () => {
        openModal();
    }

    return (
        <div className={styles.header}>
            <div className={styles.buttons}>
                <Button 
                onClick={onAddNoteHandler}
                    isDisabled={query === QueryStatus.SEARCH}
                >
                    +
                </Button>
                <Button
                    isDisabled={selectedNote === null}
                    onClick={onDeleteNote}
                >
                    del
                </Button>

                <Button
                    isDisabled={selectedNote === null}
                >
                    edit
                </Button>
            </div>
            <SearchBox />
        </div>
    );
}

export default memo(NoteHeader);