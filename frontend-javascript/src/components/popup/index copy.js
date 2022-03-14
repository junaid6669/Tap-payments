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

export default function PopUp() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Payment Card Information
            </Typography>
            <TextField id='cardname' label='Card Name' variant='outlined' />

            <TextField id='cardnumber' label='Card number' variant='outlined' />
            {/* <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Age</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  // value={age}
                  label='Age'
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            <TextField
              id='cardexpirydate'
              label='Card expiry date'
              variant='outlined'
            />
            <TextField id='cardcvv' label='Card CVV' variant='outlined' />
            <Button onClick={handleOpen} variant='contained'>
              Charge 10$
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
