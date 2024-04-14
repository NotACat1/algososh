// Подключение библиотек
import React, { FC } from 'react';
import { useLocation, Outlet } from 'react-router-dom';

// Подключение таблиц стилей
import styles from './root.module.scss';
import backgroundImage from 'images/bg.jpg';

const RootPage: FC = () => {
  const location = useLocation();

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <header
        className={`${styles.content} ${location.pathname != '/' && styles.content_header}`}
      >
        <h1
          className={`text  ${styles.title} ${location.pathname == '/' ? `text_type_h1 ${styles.title_main}` : 'text_type_h2'} text_color_h1`}
        >
          МБОУ АЛГОСОШ
        </h1>
        <p
          className={`text text_type_fibonacci text_color_secondary ${styles.title__subtitle} ${location.pathname == '/' && styles.title__subtitle_main}`}
        >
          им. Фибоначчи
        </p>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className={`${styles.content} ${styles.content_footer}`}>
        <p
          className={`text text_type_column text_color_input mt-14 ${styles.copyright}`}
        >
          Сделано в Практикуме.
        </p>
      </footer>
    </div>
  );
};

export default RootPage;
