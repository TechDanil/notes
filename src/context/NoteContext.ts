import { INote } from "interfaces/INote";
import { createContext } from "react";

type Action =
    | { type: 'add'; note: INote }
    | { type: 'delete'; id: number}
    | { type: 'edit'; note: INote }
    | { type: 'load'; notes: INote[] }
    | { type: 'selected', note: INote }

type Dispatch = (action: Action) => void;

type State = { 
    notes: INote[];
    selectedNote: INote | null;
};

const NoteStateContext = createContext<State | undefined>(undefined);

const NoteDispatchContext = createContext<Dispatch | undefined>(undefined);

export { State, Action, NoteStateContext, NoteDispatchContext };
