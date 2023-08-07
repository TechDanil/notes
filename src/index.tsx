import { RouterProvider } from 'react-router-dom';
import router from 'router/router';

import ReactDOM from 'react-dom/client';

import NoteProvider from './components/NoteProvider/NoteProvider';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <NoteProvider>
        <RouterProvider router={router} />
    </NoteProvider>
);