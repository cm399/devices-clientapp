import { Button, FormControl } from "@mui/material";
import { styled } from "@mui/system";

export const OptionsWrappers = styled("div")({
  margin: "15px 0px",
  display: "flex",
  justifyContent: "space-between"
});

export const SelectWrappers = styled(FormControl)({
  width: "200px",
  margin: "0px 0px 0px 15px"
});


export const AddDeviceButton = styled(Button)({
  margin: "15px 0px"
})