import { FC } from 'react';

import styles from './Header.module.scss';

interface HomeProps {
  title: string
}

export const Header: FC<HomeProps> = ({ title }) => {
  return (
    <header className={styles.header}>
      <h3 className={styles.title}>{title}</h3>
    </header>
  )
}