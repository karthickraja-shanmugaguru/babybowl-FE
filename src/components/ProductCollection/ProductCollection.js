import { navigate } from 'gatsby';
import React from 'react';
import * as styles from './ProductCollection.module.css';
import { toOptimizedImage } from '../../helpers/general';

const ProductCollection = (props) => {
  const { image, title, text, link, state } = props;

  return (
    <div
      role={'presentation'}
      onClick={() => navigate(link, { state })}
      className={styles.root}
      style={{ backgroundImage: `url(${toOptimizedImage(image)})` }}
    >
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <span className={styles.text}>{text}</span>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
};

export default ProductCollection;
