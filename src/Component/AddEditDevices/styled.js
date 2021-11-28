import { Modal } from "@mui/material";
import { styled } from "@mui/system";

export const StyledModel = styled(Modal)({

})

export const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export const FormControl = styled('div')({
  margin: "10px",
  width: "100%"
})