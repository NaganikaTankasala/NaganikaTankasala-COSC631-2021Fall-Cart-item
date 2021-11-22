import { Card, CardMedia, Grid, Typography, Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import './Addtocart.css';
import useStyles from '../../styles/styles';
import { commerce } from '../../lib/commerce';
import { useHistory } from 'react-router-dom';
import { Add, Remove } from '@material-ui/icons';
import { Box } from '@mui/system';

function Addtocart() {
  const classes = useStyles();
  var history = useHistory();
  const [cart, setCart] = React.useState([]);
  const [cartTotal, setCartTotal] = React.useState(0);
  const [cartId, setCartId] = React.useState('');
  const removetocart = ({ id }) => {
    commerce.cart.remove(id).then((response) => console.log(response));
    window.location.reload(true);
  };

  useEffect(() => {
    (async () => {
      setCartId(await (await commerce.cart.retrieve()).id);
      setCart(await commerce.cart.contents());
      commerce.cart.contents().then((item) => {
        var i = 0;
        item.forEach((element) => {
          i += element.line_total.raw;
        });

        setCartTotal(i);
      });
    })();
  }, []);
  return (
    <Grid container justifyContent='center' className='addtoCart__Container'>
      {cart.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item>
            {cart.map((item) => (
              <Card key={item.id} className={classes.card}>
                <CardMedia
                  className={classes.mediaCart}
                  component='img'
                  image={item.image.url}
                  title='Productimage'
                />
                <Grid container xs={12} spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='span' gutterBottom>
                      {item.product_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Box display='flex' alignItems='center'>
                      <Typography variant='span' gutterBottom>
                        Quantity
                      </Typography>
                      <Add
                        className={classes.icon}
                        onClick={() => {
                          commerce.cart
                            .add(item.product_id, 1)
                            .then((response) => {
                              if (response.success)
                                window.location.reload(true);
                            });
                        }}
                      />
                      {item.quantity}
                      <Remove
                        className={classes.icon}
                        onClick={() => {
                          commerce.cart
                            .update(item.id, {
                              quantity: item.quantity - 1,
                            })
                            .then((response) => {
                              if (response.success)
                                window.location.reload(true);
                            });
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='span' gutterBottom>
                      Price: {item.price.formatted_with_code}
                    </Typography>
                  </Grid>
                  <Box
                    display='flex'
                    width='100%'
                    justifyContent='center'
                    alignItems='center'
                    margin='10px'
                  >
                    <Button
                      onClick={() => removetocart({ id: item.id })}
                      variant='contained'
                    >
                      Delete
                    </Button>
                  </Box>
                </Grid>
              </Card>
            ))}
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <p>
                Subtotal({cart.length}): <strong>{cartTotal}</strong>
              </p>
              <Button
                onClick={() => {
                  history.push(`checkout/${cartId}`);
                }}
                variant='contained'
              >
                Proceed to Checkout
              </Button>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <h2 style={{ textAlign: 'center', width: '100%' }}>
          Your cart is empty
        </h2>
      )}
      {cart.length > 0 ? (
        <Button
          onClick={() => {
            commerce.cart.empty().then((response) => console.log(response));
            window.location.reload(true);
          }}
          variant='contained'
        >
          Empty Cart
        </Button>
      ) : null}
    </Grid>
  );
}

export default Addtocart;
