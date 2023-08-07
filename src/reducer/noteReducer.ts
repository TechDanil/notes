import { filterNoteById } from "../utils/filterNoteById/filterNoteById";
import { Action, State } from "../context/NoteContext";
import { updateNotes } from "../utils/updateNotes/updateNotes";
import { QueryStatus } from "../enums/QueryStatus";
import { NoteAction } from "../enums/NoteAction";

const noteReducer = (state: State, action: Action) => {
    switch (action.type) {

        case NoteAction.LOAD: {
            return {
                ...state,
                notes: action.notes,
                initialNotes: action.notes,
                query: QueryStatus.ALL,
                selectedNote: null
            };
        }

        case NoteAction.ADD: {
            const updatedNotes = [...state.notes, action.note];
            return {
                ...state,
                notes: state.query === QueryStatus.ALL ?
                updatedNotes :
                state.notes,
                initialNotes: updatedNotes,
            };
        }

        case NoteAction.EDIT: {
            const updatedNote = action.note;
            const updatedNotes = updateNotes(state.notes, updatedNote);
            const updatedInitialNotes = updateNotes(state.initialNotes, updatedNote);

            return {
                ...state,
                notes: updatedNotes,
                initialNotes: state.query === QueryStatus.ALL ?
                updatedInitialNotes : 
                updatedInitialNotes,
            };
        }


        case NoteAction.SELECT: {
            return {
                ...state,
                selectedNote: action.note,
            };
        }

        case NoteAction.DELETE: {
            const filteredNotes = filterNoteById(state.notes, action.id);
            const updatedInitialNotes = state.query === QueryStatus.SEARCH ? 
                                    filterNoteById(state.initialNotes, action.id) : 
                                    filteredNotes;
            return {
                ...state,
                notes: filteredNotes,
                initialNotes: updatedInitialNotes,
                selectedNote: null,
            };
        }
          

        case NoteAction.SEARCH: {
            const filteredNotes = state.initialNotes.filter(
                note =>
                    note.title.toLowerCase().includes(action.query.toLowerCase()) ||
                    note.description.toLowerCase().includes(action.query.toLowerCase())
            );

            return {
                ...state,
                notes: filteredNotes,
                query: QueryStatus.SEARCH,
                selectedNote: null,
            };
        }

        case NoteAction.CLEARSEARCH: {
            return {
                ...state,
                notes: state.initialNotes, 
                query: QueryStatus.ALL,
            };
        }

        default: {
            return state;
        }
    }
}

export { noteReducer };
