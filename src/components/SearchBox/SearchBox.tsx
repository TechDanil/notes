import { FC } from 'react';

import styles from './searchBox.module.css';

const SearchBox: FC = () => {
    return (
        <>
            <input
                className={styles.search}
                type="text" 
                placeholder="Search"
            />
        </>
    )
}

export default SearchBox;