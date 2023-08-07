import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEBOUNCE_SEARCH_TIME } from '../../constants/constants';
import { debounce } from '../../utils/debounce/debounce';
import { useNoteDispatch } from '../../hooks/useNoteDispatch';
import { useInput } from '../../hooks/useInput';
import { NoteAction } from '../../enums/NoteAction';

import styles from './searchBox.module.css';

const SearchBox: FC = () => {
    const dispatch = useNoteDispatch();
    const navigate = useNavigate();
    const searchQuery = useInput('');

    const { debounced, debouncedCancel } = debounce((query: string) => {
        if (query.trim() !== '') {
            dispatch?.({ type: NoteAction.SEARCH, query });
            navigate('/search');
        } else {
            dispatch?.({ type: NoteAction.CLEARSEARCH });
            navigate('/all');
        }
    }, DEBOUNCE_SEARCH_TIME);

    useEffect(() => {
        if (!searchQuery.value) {
            debouncedCancel();
            dispatch?.({ type: NoteAction.CLEARSEARCH });
            navigate('/all');
        } else {
            debounced(searchQuery.value);
        }
    }, [searchQuery.value]);

    return (
        <>
            <input
                className={styles.search}
                type="text"
                placeholder="Search"
                value={searchQuery.value}
                onChange={searchQuery.onChange}
            />
        </>
    )
}

export default SearchBox;