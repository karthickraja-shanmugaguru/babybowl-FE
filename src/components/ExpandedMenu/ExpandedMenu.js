import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';

import * as styles from './ExpandedMenu.module.css';
import { toOptimizedImage } from '../../helpers/general';
import { getCategoryLists } from '../../apiCalls';

const ExpandedMenu = (props) => {
  const { menu } = props;
  const [categoryLists, setCategoryLists] = useState([]); //to list categories in shop section in header

  useEffect(() => {
    getCategoryLists(
      (response) => {
        setCategoryLists(response?.data?.data);
      },
      (error) => {
        console.log('categoriesList error', error);
      },
    );
  }, []);
  console.log('categoryLists in headerShop page>><<', categoryLists);

  if (menu === null || menu === undefined) return <React.Fragment />;
  return (
    <div className={styles.root}>
      <div>
        {categoryLists?.map((item, index) => {
          return (
            <div key={index} className={styles?.categoryContainer}>
              {/* <span className={styles.categoryName}>{item?.name}</span> */}
              <span>
                <Link to="/shop/" state={{ category: item?.name }}>
                  {item?.name}
                </Link>
              </span>
              <ul>
                {item?.submenu?.map((link, linkIndex) => {
                  return (
                    <li key={linkIndex}>
                      <Link className={styles?.menuLink} to={link?.menuLink}>
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
  );
};

export default ExpandedMenu;
