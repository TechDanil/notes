import { INote } from "../../interfaces/INote";

const filterNoteById = (notes: INote[], id: number): INote[] => {
    return notes.filter(note => note.id !== id);
}

export { filterNoteById };