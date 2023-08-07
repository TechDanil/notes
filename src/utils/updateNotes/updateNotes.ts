import { INote } from "../../interfaces/INote";

const updateNotes = (notes: INote[], updatedNote: INote): INote[] => {
    return notes.map(note => note.id === updatedNote.id ? updatedNote : note);
}

export { updateNotes };