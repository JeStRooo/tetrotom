import React, { useCallback, useMemo, useState } from 'react';
import { useAppSelector } from '@/core/hooks/useAppSelector.ts';

import styles from './RightSideBar.module.scss';
import { Img } from 'react-image';
import { Button, Spin } from 'antd';

export const RightSideBar: React.FC = () => {
  const newsApiData = useAppSelector((state) => state.main.news.apiData!);

  const [newsToShow, setNewsToShow] = useState(3);

  const showNewsData = useMemo(() => newsApiData.slice(0, newsToShow), [newsApiData, newsToShow]);

  const handleShowMore = useCallback(() => {
    setNewsToShow((prev) => prev + 3);
  }, []);

  return (
    <div className={styles.rightSideBar}>
      <div className={styles.newsList}>
        <h3 className={styles.title}>News</h3>
        {showNewsData.map((news) => (
          <a
            className={styles.news}
            href={news.url}
            target="_blank"
            rel="noreferrer"
            key={news.url}
          >
            <h4 className={styles.newsTitle}>{news.title}</h4>
            <Img
              src={news.urlToImage}
              loader={<Spin />}
              alt="Photo"
              className={styles.newsImage}
            />
          </a>
        ))}
        {newsToShow < newsApiData.length && (
          <Button type="primary" onClick={handleShowMore} className={styles.showMore}>
            Show more
          </Button>
        )}
      </div>
    </div>
  );
};