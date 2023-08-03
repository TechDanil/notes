import ReactDOM from 'react-dom/client';

import NoteProvider from './components/NoteProvider/NoteProvider';
import App from './components/App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <NoteProvider>
        <App />
    </NoteProvider>
);