import {StrictMode} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import './index.css';

import App from './components/App/App';
const domContainer = document.getElementById('root');
const root = createRoot(domContainer);
root.render(
  <StrictMode>
    <BrowserRouter>
      <DragDropContext onDragEnd={() => {}}>
        <App />
      </DragDropContext>
    </BrowserRouter>
  </StrictMode>,
);
