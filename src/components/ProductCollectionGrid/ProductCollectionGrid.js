import React, { useEffect, useState } from 'react';
import * as styles from './ProductCollectionGrid.module.css';

import ProductCollection from '../ProductCollection';
import { getCategoryLists } from '../../apiCalls';
import { Skeleton } from 'antd';

const ProductCollectionGrid = (props) => {
  const [categoryLists, setCategoryLists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategoryLists(
      (response) => {
        setCategoryLists(response?.data?.data);
        setLoading(false);
      },
      (error) => {
        console.log('categoriesList error', error);
        setLoading(false);
      },
    );
  }, []);
  console.log('categoryLists Page>><<', categoryLists);
  return (
    <>
      {loading ? (
        <div className={styles.root} role={'presentation'}>
          <>
            <Skeleton.Image
              active={loading}
              style={{ minWidth: '90vw', minHeight: '40vh' }}
            />
          </>
        </div>
      ) : (
        <div className={styles.root}>
          {categoryLists?.slice(0, 4)?.map(
            (category) =>
              category?.is_active && (
                <ProductCollection
                  image={category?.image_url}
                  title={category?.name}
                  text={'SHOP NOW'}
                  link={'/shop'}
                  state={{
                    category: category?.name,
                  }}
                />
              ),
          )}
          {/* <ProductCollection
        image={'/collections/collection1.png'}
        title={'Men'}
        text={'SHOP NOW'}
        link={'/shop'}
      />
      <ProductCollection
        image={'/collections/collection2.png'}
        title={'Women'}
        text={'SHOP NOW'}
        link={'/shop'}
      />
      <ProductCollection
        image={'/collections/collection3.png'}
        title={'Accessories'}
        text={'SHOP NOW'}
        link={'/shop'}
      />
      <ProductCollection
        image={'/collections/collection4.png'}
        title={'Simple Cotton'}
        text={'SHOP NOW'}
        link={'/shop'}
      /> */}
        </div>
      )}
    </>
  );
};

export default ProductCollectionGrid;
