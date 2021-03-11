import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './detailCard.module.scss';

export const DetailCardSkeleton: React.FC = () => {
  return (
    <div className={`${styles.card} ${styles.pseudoHover}`}>
      <div className={styles.headerWrapper}></div>
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <Skeleton height={100} />
        </div>
      </div>
      <div>
        <Skeleton height={150} />
      </div>
      <div>
        <Skeleton height={100} />
      </div>
    </div>
  );
};
