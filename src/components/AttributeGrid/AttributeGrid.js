import React from 'react';

import Attribute from '../Attribute';

import * as styles from './AttributeGrid.module.css';

const AttributeGrid = (props) => {
  return (
    <div className={styles.root}>
      <Attribute
        icon={'delivery'}
        title={'Safe Delivery'}
        // subtitle={'Click to learn more'}
      />
      <Attribute
        icon={'cycle'}
        title={'100% Natural'}
        // subtitle={'Return goods in 30 days'}
      />
      <Attribute
        icon={'creditcard'}
        title={'secured payment'}
        // subtitle={'Shop safely'}
      />
    </div>
  );
};

export default AttributeGrid;
