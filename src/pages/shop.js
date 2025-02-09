import React, { useState, useEffect } from 'react';
import * as styles from './shop.module.css';

import Banner from '../components/Banner';
import Breadcrumbs from '../components/Breadcrumbs';
import CardController from '../components/CardController';
import Container from '../components/Container';
import Chip from '../components/Chip';
import Icon from '../components/Icons/Icon';
import Layout from '../components/Layout';
import LayoutOption from '../components/LayoutOption';
import ProductCardGrid from '../components/ProductCardGrid';
import { generateMockProductData } from '../helpers/mock';
import Button from '../components/Button';
import Config from '../config.json';
import { useLocation } from 'react-router-dom';
import { getProductLists } from '../apiCalls';

const ShopPage = (props) => {
  const [showFilter, setShowFilter] = useState(false);
  const data = generateMockProductData(6, 'woman');
  const locationData = props?.location;
  const [productLists, setProductLists] = useState([]);

  useEffect(() => {
    window.addEventListener('keydown', escapeHandler);
    return () => window.removeEventListener('keydown', escapeHandler);
  }, []);

  const escapeHandler = (e) => {
    if (e?.keyCode === undefined) return;
    if (e.keyCode === 27) setShowFilter(false);
  };

  useEffect(() => {
    getProductLists(
      locationData?.state?.category || '',
      (response) => {
        setProductLists(response?.data?.data);
      },
      (error) => {
        console.log('productList error', error);
      },
    );
  }, [locationData?.state?.category]);

  console.log('locationData in Shop page >><<', locationData?.state?.category);
  return (
    <Layout>
      <div className={styles.root}>
        {/***BreadCrumbs */}
        {/* <Container size={'large'} spacing={'min'}>
          <div className={styles.breadcrumbContainer}>
            <Breadcrumbs
              crumbs={[
                { link: '/', label: 'Home' },
                { link: '/', label: 'Woman' },
                { label: 'Sweaters' },
              ]}
            />
          </div>
        </Container> */}
        {/***BreadCrumbs */}
        {/* <Banner
          maxWidth={'650px'}
          name={`Woman's Sweaters`}
          subtitle={
            'Look to our women’s sweaters for modern takes on one-and-done dressing. From midis in bold prints to dramatic floor-sweeping styles and easy all-in-ones, our edit covers every mood.'
          }
        /> */}
        <Container size={'large'} spacing={'min'}>
          <div className={styles.metaContainer}>
            <span className={styles.itemCount}>
              {productLists?.length +
                `${productLists?.length > 1 ? ` items` : ` item`}`}
            </span>
            {/* <div className={styles.controllerContainer}>
              <div
                className={styles.iconContainer}
                role={'presentation'}
                onClick={() => setShowFilter(!showFilter)}
              >
                <Icon symbol={'filter'} />
                <span>Filters</span>
              </div>
              <div
                className={`${styles.iconContainer} ${styles.sortContainer}`}
              >
                <span>Sort by</span>
                <Icon symbol={'caret'} />
              </div>
            </div> */}
          </div>
          {/* <CardController
            closeFilter={() => setShowFilter(false)}
            visible={showFilter}
            filters={Config.filters}
          />
          <div className={styles.chipsContainer}>
            <Chip name={'XS'} />
            <Chip name={'S'} />
          </div> */}
          <div className={styles.productContainer}>
            <span className={styles.mobileItemCount}>
              <br />
              <br />
              {productLists?.length +
                `${productLists?.length > 1 ? ` items` : ` item`}`}
            </span>
            {/**Products list section */}
            <ProductCardGrid data={productLists}></ProductCardGrid>
            {/**Products list section */}
          </div>
          {/***Load More Section */}
          {/* <div className={styles.loadMoreContainer}>
            <span>6 of 456</span>
            <Button fullWidth level={'secondary'}>
              LOAD MORE
            </Button>
          </div> */}
          {/***Load More Section */}
        </Container>
      </div>

      {/* <LayoutOption /> */}
    </Layout>
  );
};

export default ShopPage;
