import { ChangeEvent, useState } from "react";

const useInput = <T> (initialValue: T) => {
    const [value, setValue] = useState(initialValue);
    return {
        value,
        setValue,
        onChange: (e: ChangeEvent<any>) => setValue(e.target.value),
    }
}

export { useInput };