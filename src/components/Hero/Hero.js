import React, { useEffect, useState } from 'react';
import * as styles from './Hero.module.css';
import Button from '../Button';
import { Link } from 'gatsby';
import { toOptimizedImage } from '../../helpers/general';
import { getDashboardBanners } from '../../apiCalls';
import { Carousel } from 'antd';

const Hero = (props) => {
  const {
    title,
    subtitle,
    ctaText,
    ctaAction,
    image,
    maxWidth,
    ctaStyle,
    ctaLink,
    ctaTo,
    header,
  } = props;
  const [bannerImages, setBannerImages] = useState([]);

  useEffect(() => {
    getDashboardBanners(
      (response) => {
        setBannerImages(response?.data?.data);
      },
      (error) => {
        console.log('dashboardBanner error', error);
      },
    );
  }, []);
  console.log('bannerImages >><<', bannerImages);
  return (
    <Carousel autoplay>
      {bannerImages?.map((each) => {
        return (
          <div key={each?.id} className={styles.root}>
            <img src={each?.image_url} alt={`Banner ${each?.id}`} />
          </div>
        );
      })}
    </Carousel>
    // <div className={styles.root} style={{ backgroundImage: `url(${toOptimizedImage(image)})` }}>
    //   <div className={styles.content} style={{ maxWidth: maxWidth }}>
    //     {/* {header && <span className={styles.header}>{header}</span>} */}
    //     {/* {title && <h2 className={styles.title}>{title}</h2>} */}
    //     {/* {subtitle && <span className={styles.subtitle}>{subtitle}</span>} */}
    //     {/* {ctaText && (
    //       <Button
    //         className={`${styles.ctaButton} ${ctaStyle}`}
    //         level={'primary'}
    //         onClick={ctaAction}
    //       >
    //         {ctaText}
    //       </Button>
    //     )} */}
    //     {/* {ctaLink && (
    //       <Link className={styles.ctaLink} to={ctaTo}>
    //         {ctaLink}
    //       </Link>
    //     )} */}
    //   </div>
    // </div>
  );
};

export default Hero;
