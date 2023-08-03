import { createContext } from "react";
import { INote } from "../interfaces/INote";

interface IContext {
    notes: INote[];
    selectedNote: INote | null;
    selectNote: (note: INote) => void
    addNote: (item: INote) => void;
    removeNote: (id: number) => void;
    editNote: (note: INote) => void;
}

const initialContext: IContext = {
    notes: [],
    selectedNote: null,
    selectNote: () => {},
    addNote: () => {},
    removeNote: () => {},
    editNote: () => {},
}

const Context = createContext<IContext>(initialContext);

export { Context };