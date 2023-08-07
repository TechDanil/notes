import { INote } from "../../interfaces/INote";

const createNote = (): INote => {
    return {
        id: Date.now(),
        title: '',
        description: '',
    };
}

export { createNote };