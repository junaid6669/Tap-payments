import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import "./styles.css";
import { postRequest } from "../../libraries/axios";

import {
  CardHolder,
  CardNumber,
  CardSecurityCode,
  ValidThruMonth,
  ValidThruYear,
} from "reactjs-credit-card/form";
import Card from "reactjs-credit-card/card";
import { useCardForm } from "reactjs-credit-card";
import { useState } from "react";

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

export default function PopUp({ getAmount }) {
  const [open, setOpen] = React.useState(false);

  const getFormData = useCardForm();
  const [chargeButtonDisable, setChargeButtonDisable] = useState(true);
  const [numberValid, setNumberValid] = useState(true);
  const [holderValid, setHolderValid] = useState(true);
  const [securityValid, setSecurityValid] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setChargeButtonDisable(true);
  };

  function validateCard() {
    const [data, isValid] = getFormData();

    if (!data.number.isValid) {
      setNumberValid(false);
    } else {
      handleFocusNumber();
    }
    if (!data.holder.isValid) {
      setHolderValid(false);
    } else {
      handleFocusHolder();
    }

    if (!data.securityCode.isValid) {
      setSecurityValid(false);
    } else {
      handleFocusSecurity();
    }
    if (isValid) {
      setChargeButtonDisable(false);
    } else {
      setChargeButtonDisable(true);
    }
  }

  function handleSubmit() {
    // alert();
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

  function handleFocusNumber() {
    setNumberValid(true);
  }
  function handleFocusHolder() {
    setHolderValid(true);
  }
  function handleFocusSecurity() {
    setSecurityValid(true);
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
              <CardNumber
                placeholder='Card Number'
                className={`input-text${!numberValid ? " error" : ""}`}
                onFocus={handleFocusNumber}
                onChange={validateCard}
              />
              <CardHolder
                placeholder='Card Name'
                className={`input-text${!holderValid ? " error" : ""}`}
                onFocus={handleFocusHolder}
                onChange={validateCard}
              />
              <div className='flex-wrapper'>
                <div className='semi flex-wrapper'>
                  <ValidThruMonth className='input-text semi' />

                  <ValidThruYear className='input-text semi' />
                </div>
                <CardSecurityCode
                  placeholder='Card CVV'
                  className={`semi input-text${!securityValid ? " error" : ""}`}
                  onFocus={handleFocusSecurity}
                  onChange={validateCard}
                />
              </div>
              <Button
                onClick={handleSubmit}
                variant='contained'
                disabled={chargeButtonDisable}
              >
                Charge 10$
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Card fixClass='fix-new' cardClass='card-new' />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
