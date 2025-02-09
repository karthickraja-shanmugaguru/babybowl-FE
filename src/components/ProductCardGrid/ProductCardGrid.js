import React, { useState } from 'react';
import * as styles from './ProductCardGrid.module.css';

import Drawer from '../Drawer';
import ProductCard from '../ProductCard';
import QuickView from '../QuickView';
import Slider from '../Slider';

const ProductCardGrid = (props) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const [productData, setProductData] = useState({});
  const { height, columns = 3, data, spacing, showSlider = false } = props;
  const columnCount = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  };

  const renderCards = () => {
    return data?.map((product, index) => {
      return (
        <ProductCard
          key={index}
          height={height}
          price={product?.price}
          imageAlt={product?.name}
          name={product?.name}
          image={product?.image_url}
          meta={product?.description}
          originalPrice={product?.price}
          // link={product.link}
          showQuickView={() => {
            setShowQuickView(true);
            setProductData(product);
          }}
          // productData={product}
        />
      );
    });
  };

  return (
    <div className={styles.root} style={columnCount}>
      <div
        className={`${styles.cardGrid} ${
          showSlider === false ? styles.show : ''
        }`}
        style={columnCount}
      >
        {data && renderCards()}
      </div>

      {showSlider === true && (
        <div className={styles.mobileSlider}>
          <Slider spacing={spacing}>{data && renderCards()}</Slider>
        </div>
      )}

      <Drawer
        visible={showQuickView}
        close={() => {
          setProductData({});
          setShowQuickView(false);
        }}
      >
        <QuickView
          close={() => {
            setShowQuickView(false);
            setProductData({});
          }}
          productData={productData}
        />
      </Drawer>
    </div>
  );
};

export default ProductCardGrid;
