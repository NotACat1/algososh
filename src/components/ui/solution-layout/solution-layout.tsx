import React from 'react';
import { ReturnButton } from '../return-button/return-button';
import { Link } from 'react-router-dom';
import styles from './solution-layout.module.css';

interface SolutionLayoutProps {
  title: string;
  extraClass?: string;
  children?: React.ReactNode;
}

export const SolutionLayout: React.FC<SolutionLayoutProps> = ({
  extraClass = '',
  title,
  children,
}) => {
  return (
    <div className={styles.contentCard}>
      <Link className={styles.link} to="/">
        <ReturnButton extraClass={styles.returnButton} />
      </Link>
      <h3 className={`text text_type_h3 text_color_h3 ${styles.title}`}>
        {title}
      </h3>
      {children}
    </div>
  );
};
