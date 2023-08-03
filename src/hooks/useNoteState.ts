import { NoteStateContext } from "../context/NoteContext"
import { useContext } from "react"

const useNoteState = () => {
    const context = useContext(NoteStateContext);

    if (context === undefined) {
        throw new Error('useNoteState must be used within a NoteProvider');
    }

    return context;
}

export { useNoteState };