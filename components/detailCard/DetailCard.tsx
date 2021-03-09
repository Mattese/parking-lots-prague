import { ReactComponentElement, ReactNode, useState } from 'react';
import styles from './detailCard.module.scss';

interface ComponentProps {
  header: string;
  contentFront: ReactNode;
  contentBack: ReactNode;
}

export const DetailCard: React.FC<ComponentProps> = ({ header, contentFront, contentBack }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={`${styles.card} ${styles.pseudoHover}`}>
      <div className={styles.headerWrapper}>
        <div>
          <h2>{header}</h2>
        </div>
      </div>
      <div
        className={flipped ? styles.cardInnerIsFlipped : styles.cardInner}
        onClick={() => setFlipped((prevState) => !prevState)}
      >
        <div className={styles.cardFront}>{contentFront}</div>
        <div className={styles.cardBack}>{contentBack}</div>
      </div>
    </div>
  );
};
