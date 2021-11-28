import { Button, OutlinedInput, Select, InputLabel, Paper, MenuItem, FormHelperText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as Yup from "yup";
import { useFormik } from "formik";
import { StyledModel, Backdrop, FormControl } from "./styled";


const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    outline: "none",
    px: 4,
    pb: 3,
  },
  modal_title: {
    padding: "20px",
    fontSize: "18px",
    fontWeight: "bold",
    borderBottom: "2px solid #7f7f7f"
  },
  container: {
    width: "96%"
  },
  modal_footer: {
    borderTop: "2px solid #7f7f7f",
    display: "flex",
    justifyContent: "right",
    padding: "15px"
  },
  button: {
    margin: "0px 15px"
  },
  input_txt: {
    width: "100%"
  },
  helper_txt: {
    color: "red"
  }
}));

const formValidationSchema = Yup.object().shape({
  type: Yup.string().required(),
  system_name: Yup.string().required("System Name is required"),
  hdd_capacity: Yup.number("HDD Capacity must be a number").required("HDD Capacity must be required")
});

const initialDevice = {
  type: "WINDOWS_WORKSTATION",
  system_name: "",
  hdd_capacity: 1
}

const AddEditDevices = ({ modal, isEdit, device, onCloseModal, onSubmitForm }) => {

  const classes = useStyles();

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
    enableReinitialize: true,
    initialValues: device || initialDevice,
    validationSchema: formValidationSchema,
    onSubmit: onSubmitForm
  })


  return (
    <StyledModel aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={modal} onClose={onCloseModal} Backdrop={Backdrop}>
      <Paper className={classes.paper}>
        <div className={classes.modal_title}>
          {!isEdit ? "Add Device" : "Edit Device"}
        </div>
        <div className={classes.container}>
          <FormControl>
            <InputLabel htmlFor="device_type">Device Type</InputLabel>
            <Select value={values.type} onChange={handleChange} onBlur={handleBlur} name="type" className={classes.input_txt} id="device_type">
              <MenuItem value={"WINDOWS_WORKSTATION"}>Windows Workstation</MenuItem>
              <MenuItem value={"WINDOWS_SERVER"}>Windows Server</MenuItem>
              <MenuItem value={"MAC"}>Mac</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="system_name">System Name</InputLabel>
            <OutlinedInput className={classes.input_txt} value={values.system_name} name="system_name" onChange={handleChange} onBlur={handleBlur} aria-describedby="system_name_helper" id="system_name" />
            {errors.system_name && touched.system_name && <FormHelperText className={classes.helper_txt} id="system_name_helper">{errors.system_name}</FormHelperText>}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="hdd_capacity">HDD Capacity</InputLabel>
            <OutlinedInput type="number" className={classes.input_txt} value={values.hdd_capacity} name="hdd_capacity" onChange={handleChange} aria-describedby="hdd_capacity_helper" onBlur={handleBlur} endAdornment={<div>GB</div>} id="hdd_capacity" />
            {errors.hdd_capacity && touched.hdd_capacity && <FormHelperText className={classes.helper_txt} id="hdd_capacity_helper">{errors.hdd_capacity}</FormHelperText>}
          </FormControl>
        </div>
        <div className={classes.modal_footer}>
          <Button className={classes.button} variant="outlined" onClick={onCloseModal}>Cancel</Button>
          <Button className={classes.button} variant="contained" onClick={handleSubmit}>Submit</Button>
        </div>
      </Paper >
    </StyledModel >
  )
}

export default AddEditDevices;