import React, { useState, useContext, useEffect } from 'react';

import Button from '../Button';
import CurrencyFormatter from '../CurrencyFormatter';
import SizeList from '../SizeList';
import SwatchList from '../SwatchList';

import { generateMockProductData } from '../../helpers/mock';
import AddItemNotificationContext from '../../context/AddItemNotificationProvider';

import * as styles from './QuickView.module.css';
import { toOptimizedImage } from '../../helpers/general';
import * as metaStyles from '../../pages/index.module.css';

const QuickView = (props) => {
  const { close, buttonTitle = 'Order Via Whatsapp', productData } = props;
  const sampleProduct = generateMockProductData(1, 'sample')[0];

  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;
  const [activeSwatch, setActiveSwatch] = useState(
    sampleProduct.colorOptions[0],
  );
  const [activeSize, setActiveSize] = useState(
    productData?.ProductInfo?.measuremtnsList[0],
  );

  const handleAddToBag = () => {
    close();
    showNotification();
  };

  // Rating: ${'⭐'?.repeat(Math?.floor(productDetails?.rating))} (${productDetails?.rating})
  // Tags: ${productDetails?.tags?.join(', ')}

  const createWhatsAppMessage_and_Checkout = (productDetails) => {
    const phoneNumber = '919445315451';
    const message = `🛍️ *New Order from Baby Bowl*

    *Product Details*
    Name: ${productDetails?.name}
    Brand: ${productDetails?.brand}
    ${productDetails?.ProductInfo?.measurementsName}: ${activeSize?.toUpperCase()}
    Price: ${'₹' + productDetails?.price} / This is the best available price.

    *Product Description*
    ${productDetails?.description}

    Category: ${productDetails?.categories?.join(', ')}

    Please confirm my order details and provide payment information.

    Thank you! 🌟`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    close();
  };

  useEffect(() => {
    setActiveSize(productData?.ProductInfo?.measuremtnsList[0]);
  }, [productData]);
  console.log('productData in Quickview Card >><<', productData);
  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <h4>Select Options</h4>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.productContainer}>
          <span className={styles.productName}>{productData?.name}</span>
          <div className={styles.price}>
            <CurrencyFormatter amount={productData?.price}></CurrencyFormatter>
          </div>
          <div className={styles.productImageContainer}>
            <img
              alt={productData?.name}
              src={toOptimizedImage(productData?.image_url)}
            ></img>
          </div>
        </div>

        {/***Description Section */}
        <div className={metaStyles.messageContainer}>
          <p>{productData?.description}</p>
        </div>
        {/***Description Section */}

        {/**Color Pallete Section */}
        {/* <div className={styles.sectionContainer}>
          <SwatchList
            swatchList={sampleProduct.colorOptions}
            activeSwatch={activeSwatch}
            setActiveSwatch={setActiveSwatch}
          />
        </div> */}
        {/**Color Pallete Section */}

        {/***Sizelist Section */}
        <div className={styles.sectionContainer}>
          <SizeList
            sizeList={productData?.ProductInfo?.measuremtnsList}
            activeSize={activeSize}
            setActiveSize={setActiveSize}
            measurementLabel={productData?.ProductInfo?.measurementsName}
          />
        </div>
        {/***Sizelist Section */}

        <Button
          onClick={() => createWhatsAppMessage_and_Checkout(productData)}
          fullWidth
          level={'primary'}
        >
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
};

export default QuickView;
