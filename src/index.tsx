// Подключение библиотек
import React from 'react';
import { createRoot } from 'react-dom/client';

// Подключение компонентов
import App from './components/app/app';

// Подключение таблиц стилей и функций
import 'normalize.css';
import './index.css';
import './fonts/fonts.css';
import 'components/ui/common.css';
import 'components/ui/box.css';

import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

// Рендеринг основного компонента
if (rootElement) {
  const root = createRoot(rootElement as HTMLElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
