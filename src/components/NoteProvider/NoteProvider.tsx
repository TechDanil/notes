import { FC, ReactNode, useReducer } from "react";
import { noteReducer } from "../../reducer/noteReducer";
import { NoteDispatchContext, NoteStateContext } from "context/NoteContext";

interface INoteProvider { 
    children: ReactNode;
}

const NoteProvider: FC<INoteProvider> = ({ children }) => {
    const [state, dispatch] = useReducer(noteReducer, { notes: [], selectedNote: null });

    return (
        <NoteStateContext.Provider value={state}>
            <NoteDispatchContext.Provider value={dispatch}>
                {children}
            </NoteDispatchContext.Provider>
        </NoteStateContext.Provider>
    )
}

export default NoteProvider