import { Button, FormControl } from "@mui/material";
import { styled } from "@mui/system";

export const OptionsWrappers = styled("div")({
  margin: "15px 0px",
  display: "flex",
  justifyContent: "space-between",
  '@media (max-width: 600px)': {
    flexFlow: "column",
  }
});

export const SelectWrappers = styled(FormControl)({
  width: "200px",
  margin: "0px 0px 0px 15px",
  '@media (max-width: 600px)': {
    width: "100%",
    margin: "0px 0px 20px 0px",
  }
});


export const AddDeviceButton = styled(Button)({
  margin: "15px 0px",
  '@media (max-width: 600px)': {
    width: "50%",
    marginLeft: "auto",
  }
})