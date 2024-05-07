import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const buybuttonid = import.meta.env.VITE_BUY_BUTTON;
const publishablekey = import.meta.env.VITE_PUBLISHABLE_KEY;
function Donate() {

  return (
    <stripe-buy-button
      buy-button-id={buybuttonid}
      publishable-key={publishablekey}
    ></stripe-buy-button>
  );
}

export default Donate;
