import React from 'react';
import { buybuttonid, publishablekey } from '../../config';

function Donate() {
  return (
    <stripe-buy-button
      buy-button-id={buybuttonid}
      publishable-key={publishablekey}
    ></stripe-buy-button>
  );
}

export default Donate;
