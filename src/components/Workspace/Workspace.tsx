import { FC, Fragment, useEffect, ChangeEvent } from "react";
import { debounce } from "../../utils/debounce/debounce";
import { DEBOUNCE_TIME } from "../../constants/constants";
import { useNoteState } from "../../hooks/useNoteState";
import { useInput } from "../../hooks/useInput";

import { INote } from "../../interfaces/INote";

import styles from './workspace.module.css';

interface IWorkspace {
    handleEditNote: (note: INote) => void;
}

const Workspace: FC<IWorkspace> = ({ handleEditNote }) => {
    const { selectedNote } = useNoteState();
    const title = useInput('');
    const description = useInput('');

    useEffect(() => {
        if (selectedNote) {
            title.setValue(selectedNote.title);
            description.setValue(selectedNote.description);
        }
    }, [selectedNote]);

    useEffect(() => {
        const saveNote = () => {
            if (selectedNote) {
                handleEditNote({
                    ...selectedNote,
                    title: title.value,
                    description: description.value,
                });
            }
        }

        const { debounced, debouncedCancel } = debounce(saveNote, DEBOUNCE_TIME);
     
        debounced();

        return () => {
            debouncedCancel();
        };

    }, [selectedNote, title, description]);

    console.log(title);
    console.log(description);

    return (
        <div className={styles.workspace}>
            {selectedNote && (
                <Fragment>
                    <input
                        className={styles.title}
                        type="text"
                        value={title.value}
                        onChange={title.onChange as (e: ChangeEvent<HTMLInputElement>) => void}
                    />

                    <textarea
                        value={description.value} 
                        className={styles.description}
                        onChange={description.onChange as (e: ChangeEvent<HTMLTextAreaElement>) => void}
                    />
                </Fragment>
            )}
        </div>
    )
}

export default Workspace;