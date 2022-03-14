import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { getRequest } from "../../libraries/axios";
import PopUp from "../popup";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#D3D3D3" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
  minHeight: 100,
}));

export default function MainScreen() {
  const [currentBalance, setCurrentBalance] = useState(null);

  useEffect(() => {
    getAmount();
  }, []);

  const getAmount = () => {
    getRequest("api/balance").then((res) => {
      setCurrentBalance(res.balance);
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>{`Current Balance : ${currentBalance}`}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <PopUp getAmount={getAmount} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
