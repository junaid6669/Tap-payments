import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import { postRequest } from "../../libraries/axios";

import { useState, FC } from "react";

import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IPopup {
  getAmount: () => void;
}

const PopUp: FC<IPopup> = ({ getAmount }) => {
  const [open, setOpen] = React.useState(false);

  const [chargeButtonDisable, setChargeButtonDisable] = useState(true);
  const [helperT, setHelperT] = useState<string>("");
  const handleCallBack = (props: any, isvalid: any) => {
    if (!isvalid) {
      setHelperT("Please enter a valid Card Numer");
    } else {
      setHelperT("");
      setChargeButtonDisable(false);
    }
  };
  const [creaditCardCheck, setCreditCardCheck] = useState<any>({
    cvc: "",
    expiry: "",
    focus: "name",
    name: "",
    number: "",
  });

  const handleInputFocus = (e: any) => {
    setCreditCardCheck({
      ...creaditCardCheck,
      focus: e.target.name,
    });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCreditCardCheck({
      ...creaditCardCheck,
      [name]: value,
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setChargeButtonDisable(true);
  };

  function handleSubmit() {
    postRequest("api/balance", {
      amount: 10,
    }).then((res) => {
      alert("Succes");
      setTimeout(() => {
        handleClose();
        getAmount();
      }, 2000);
    });
  }

  return (
    <div>
      <Button onClick={handleOpen} variant='contained'>
        Recharge/Add Balance
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={{ ...style, minWidth: 800 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Payment Card Information
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name='name'
                    id='card-name'
                    label='Card Name'
                    variant='outlined'
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name='number'
                    id='card-number'
                    label='Card Number'
                    variant='outlined'
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    helperText={helperT}
                    inputProps={{ maxLength: 16 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name='expiry'
                    id='card-expiry-date'
                    label='Card expiry date'
                    variant='outlined'
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name='cvc'
                    id='card-cvv'
                    label='Card CVV'
                    variant='outlined'
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    onClick={handleSubmit}
                    variant='contained'
                    disabled={chargeButtonDisable}
                  >
                    Charge 10$
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Cards
                cvc={creaditCardCheck.cvc}
                expiry={creaditCardCheck.expiry}
                focused={creaditCardCheck.focus}
                name={creaditCardCheck.name}
                number={creaditCardCheck.number}
                callback={handleCallBack}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default PopUp;
