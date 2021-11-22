import React from 'react';
import { useParams } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
import { Grid } from '@material-ui/core';
import ShippingForm from '../ShippingForm/ShippingForm';
import useStyles from '../../styles/styles';

const Checkout = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [checkoutToken, setCheckoutToken] = React.useState();
  const [shippingInfo, setShippingInfo] = React.useState();

  React.useEffect(() => {
    commerce.checkout
      .generateToken(id, { type: 'cart' })
      .then((response) => {
        console.log(response.id);
        setCheckoutToken(response.id);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Grid container className={classes.content}>
      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h2 style={{ margin: 0 }}>Check out</h2>
      </Grid>
      <Grid item xs={6}>
        <ShippingForm
          checkoutToken={checkoutToken}
          setShippingInfo={setShippingInfo}
        />
      </Grid>
    </Grid>
  );
};

export default Checkout;
