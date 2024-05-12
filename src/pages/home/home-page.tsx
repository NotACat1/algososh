// Подключение библиотек
import React, { FC, useMemo } from 'react';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';

// Подключение таблиц стилей и дополнительных данных
import styles from './home-page.module.scss';
import { cardsData } from './home-page.utils';

const HomePage: FC = () => {
  const cards = useMemo(
    () =>
      cardsData.map((card, index) => (
        <Link to={card.to} key={index}>
          <div
            className={`${styles.cards__item} ${styles.cards__item_string}`}
            style={{
              backgroundImage: `url("${card.image}")`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundImage = `url("${card.imageHover}")`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundImage = `url("${card.image}")`;
            }}
          />
        </Link>
      )),
    [cardsData],
  );

  return (
    <>
      <div className={styles.cards}>{cards}</div>
      <Marquee
        className={styles.ticker}
        gradient={false}
        speed={200}
        autoFill={true}
      >
        <p className="text text_type_ticker text_color_secondary">
          Вдохновлено школами, в которых не учили алгоритмам
        </p>
        <div className={styles.ticker__box}>
          <p className={styles.ticker__dot} />
        </div>
      </Marquee>
    </>
  );
};

export default HomePage;
