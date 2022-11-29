import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import './index.css';

import App from './components/App/App';

const domContainer = document.getElementById('root');
const root = createRoot(domContainer);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
