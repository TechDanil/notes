import { FC, ReactNode } from "react";

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
    return (
        <button 
        onClick={onClick}
        className={`${styles.button} ${isDisabled ? styles.disabled : ""}`}
        disabled={isDisabled}
        >
            {children}
        </button>
    );
}

export default Button;