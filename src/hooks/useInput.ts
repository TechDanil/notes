import { ChangeEvent, useState, useCallback } from "react";

const useInput = <T> (initialValue: T) => {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback((e: ChangeEvent<any>) => {
        setValue(e.target.value);
    }, []);
    
    return {
        value,
        setValue,
        onChange,
    };
}

export { useInput };