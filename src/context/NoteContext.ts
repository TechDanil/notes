import { INote } from "../interfaces/INote";
import { createContext } from "react";

type Action =
    | { type: 'add'; note: INote, }
    | { type: 'delete'; id: number}
    | { type: 'edit'; note: INote }
    | { type: 'load'; notes: INote[]; initialNotes: INote[]; }
    | { type: 'select', note: INote }
    | { type: 'search', query: string }
    | { type: 'clearSearch' }

type Dispatch = (action: Action) => void;

type State = { 
    notes: INote[];
    initialNotes: INote[];
    selectedNote: INote | null;
    query: string;
};

const NoteStateContext = createContext<State | undefined>(undefined);

const NoteDispatchContext = createContext<Dispatch | undefined>(undefined);

export { State, Action, NoteStateContext, NoteDispatchContext };
