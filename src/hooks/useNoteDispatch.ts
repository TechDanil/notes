import { useContext } from 'react';
import { NoteDispatchContext } from "../context/NoteContext";

const useNoteDispatch = () => {
    const context = useContext(NoteDispatchContext);

    if (context === undefined) {
        throw new Error('useNoteDispatch must be used within a NoteProvider');
    }

    return context;
}

export { useNoteDispatch };