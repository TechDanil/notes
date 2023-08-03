import { INote } from "../../interfaces/INote";
import { FC } from "react";

import styles from './listItem.module.css';

interface INoteItem {
    note: INote
    isSelected: boolean;
    onSelectedHandler: () => void;
}

const ListItem: FC<INoteItem> = ({ 
    note,
    isSelected,
    onSelectedHandler
 }) => {
    return (
        <div 
        className={`${styles.item} ${isSelected ? styles.active : ''}`}
        onClick={onSelectedHandler}
        >
            <h3 className={styles.title}>{note.title}</h3>
            <p className={styles.description}>{note.description}</p>
        </div>
    )
}

export default ListItem;