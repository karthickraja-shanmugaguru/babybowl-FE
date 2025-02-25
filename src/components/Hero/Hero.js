import React, { useEffect, useState } from 'react';
import * as styles from './Hero.module.css';
import Button from '../Button';
import { Link } from 'gatsby';
import { toOptimizedImage } from '../../helpers/general';
import { getDashboardBanners } from '../../apiCalls';
import { Carousel, Skeleton } from 'antd';

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDashboardBanners(
      (response) => {
        setBannerImages(response?.data?.data);
        setLoading(false);
      },
      (error) => {
        console.log('dashboardBanner error', error);
        setLoading(false);
      },
    );
  }, []);
  console.log('bannerImages >><<', bannerImages);
  return (
    <>
      {loading ? (
        <div className={styles.carouselContainer}>
          <Skeleton.Image
            active={loading}
            style={{ minWidth: '100vw', minHeight: '30vh' }}
          />
        </div>
      ) : (
        <div className={styles.carouselContainer}>
          <Carousel autoplay>
            {bannerImages?.map((each) => (
              <div key={each?.id} className={styles.slideWrapper}>
                <picture>
                  <source
                    media="(min-width: 1024px)"
                    srcSet={each?.image_url}
                  />
                  <source media="(min-width: 768px)" srcSet={each?.image_url} />
                  <source media="(min-width: 375px)" srcSet={each?.image_url} />
                  <img
                    src={each?.image_url}
                    alt={`Banner ${each?.id}`}
                    className={styles.bannerImage}
                  />
                </picture>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </>
    // <Carousel autoplay>
    //   {bannerImages?.map((each) => {
    //     return (
    //       <div key={each?.id} className={styles.root}>
    //         <img src={each?.image_url} alt={`Banner ${each?.id}`} />
    //       </div>
    //     );
    //   })}
    // </Carousel>

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
