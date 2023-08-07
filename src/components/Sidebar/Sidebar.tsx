import { FC } from "react";
import List from "../List/List";
import styles from './sidebar.module.css';

const SideBar: FC = () => {
    console.log('render');
    return (
        <div className={styles.sidebar}>
            <List />
        </div>
    )
}

export default SideBar;