import { FC, Fragment, useEffect, memo } from "react";
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
    const { selectedNote, isActiveEditMode } = useNoteState();
    const title = useInput('');
    const description = useInput('');

    useEffect(() => {
        if (selectedNote) {
            title.setValue(selectedNote.title);
            description.setValue(selectedNote.description);
        } else {
            title.setValue("");
            description.setValue("");
        }
    }, [selectedNote]);
   

    useEffect(() => {
        const saveNote = () => {
            if (!selectedNote) {
                return;
            }
            
            handleEditNote({
                ...selectedNote,
                title: title.value,
                description: description.value,
            });
        }

        const { debounced, debouncedCancel } = debounce(saveNote, DEBOUNCE_TIME);
        
        debounced();

        return () => {
            debouncedCancel();
        };

    }, [selectedNote, title.value, description.value]);


    return (
        <div className={styles.workspace}>
            {selectedNote && isActiveEditMode && (
                <Fragment>
                    <input
                        className={styles.title}
                        type="text"
                        value={title.value}
                        onChange={title.onChange}
                    />

                    <textarea
                        value={description.value} 
                        className={styles.description}
                        onChange={description.onChange}
                    />
                </Fragment>
            )}
        </div>
    )
}

export default memo(Workspace);