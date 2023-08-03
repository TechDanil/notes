import { INote } from "../../interfaces/INote";

const createNote = (): INote => {
    return {
        id: Date.now(),
        title: 'New title',
        description: 'descr',
    };
}

export { createNote };