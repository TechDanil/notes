import { FC, ReactNode, memo } from "react";

import styles from './button.module.css';

interface IButton {
    onClick?: () => void
    children: ReactNode;
    isDisabled?: boolean;
}

const Button: FC<IButton> = ({ 
    children, 
    onClick,
    isDisabled
}) => {
    console.log(isDisabled);

    return (
        <button 
        onClick={onClick}
        className={`${styles.button} ${isDisabled === true ? styles.disabled : ""}`}
        disabled={isDisabled}
        >
            {children}
        </button>
    );
}

export default memo(Button, (prevState, nextState) => {
    return prevState.isDisabled === nextState.isDisabled;
});