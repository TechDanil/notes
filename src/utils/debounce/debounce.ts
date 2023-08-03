const debounce = (cb: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null; 

    const debounced = (...args: any[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => cb(...args), delay);
    }

    const debouncedCancel = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    }


    return {
        debounced,
        debouncedCancel,
    };
}

export { debounce };