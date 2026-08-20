import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LocaleProvider } from './i18n';
import './index.css'; // or whatever your CSS file is called

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </React.StrictMode>
);

// Accessibility checks in development only
if (import.meta.env.DEV) {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000);
  });
}