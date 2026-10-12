import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AppProvider } from './lib/store.jsx';
import App from './App.jsx';
import './styles/base.css';
import './styles/hud.css';
import './styles/levels.css';
import './styles/charts.css';

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </HashRouter>,
);
