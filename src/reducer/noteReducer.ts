import { Action, State } from "context/NoteContext";

const noteReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'load': {
            return { ...state, notes: action.notes };
        }

        case 'add': {
            return { ...state,  notes: [...state.notes, action.note] };
        }

        case 'edit': {
            const editedNotes = state.notes.map(note => 
                note.id === action.note.id ? action.note : note);

            return { ...state, notes: editedNotes };
        }

        case 'selected': {
            return {...state, selectedNote: action.note}
        }

        case 'delete': {
            const filteredNotes = state.notes.filter(note => note.id !== action.id);
            return { ...state, notes: filteredNotes };
        }

        default: {
            return state;
        }
    }
}

export { noteReducer };