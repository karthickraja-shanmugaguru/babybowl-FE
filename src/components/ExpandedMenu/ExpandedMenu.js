import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';

import * as styles from './ExpandedMenu.module.css';
import { toOptimizedImage } from '../../helpers/general';
import { getCategoryLists } from '../../apiCalls';
import { Skeleton } from 'antd';

const ExpandedMenu = (props) => {
  const { menu } = props;
  const [categoryLists, setCategoryLists] = useState([]); //to list categories in shop section in header
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
  console.log('categoryLists in headerShop page>><<', categoryLists);

  if (menu === null || menu === undefined) return <React.Fragment />;
  return (
    <>
      {loading ? (
        <Skeleton paragraph={{ rows: 5 }} />
      ) : (
        <div className={styles.root}>
          <div className={styles.linkContainers}>
            {categoryLists?.map((item, index) => {
              return (
                <div key={index} className={styles?.categoryContainer}>
                  {/* <span className={styles.categoryName}>{item?.name}</span> */}
                  <span className={styles.categoryName}>
                    <Link
                      to="/shop/"
                      state={{ category: item?.name }}
                      className={styles.menuLink}
                    >
                      {item?.name}
                    </Link>
                  </span>
                  <ul>
                    {item?.submenu?.map((link, linkIndex) => {
                      return (
                        <li key={linkIndex}>
                          <Link
                            className={styles?.menuLink}
                            to={link?.menuLink}
                          >
                            {link?.menuLabel}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          {/* <div className={styles.imageContainer}>
        <img src={toOptimizedImage('/headerPic1.png')} alt={'header 1'}></img>
        <img src={toOptimizedImage('/headerPic2.png')} alt={'header 2'}></img>
      </div> */}
        </div>
      )}
    </>
  );
};

export default ExpandedMenu;
