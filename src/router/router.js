import { createBrowserRouter } from 'react-router-dom';

import NotesPage from '../pages';

const router = createBrowserRouter([
  {
    path: '/*',
    element: <NotesPage />,
  },
]);
  
export default router;