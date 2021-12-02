import { Button, OutlinedInput, Select, InputLabel, Paper, MenuItem, FormHelperText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as Yup from "yup";
import { useFormik } from "formik";
import { StyledModel, FormControl } from "./styled";
import { DeviceTypes } from "./../../Constants/";

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    outline: "none",
    px: 4,
    pb: 3,
    border: "3px solid #eec0a2",
    "@media (max-width: 768px)": {
      width: "95%",
    }
  },
  modal_title: {
    padding: "20px",
    fontSize: "18px",
    fontWeight: "bold",
    borderBottom: "2px solid #eec0a2",
    textAlign: "center"
  },
  container: {
    width: "96%"
  },
  modal_footer: {
    display: "flex",
    justifyContent: "right",
    padding: "15px"
  },
  button: {
    margin: "0px 15px"
  },
  input_txt: {
    width: "100%",
    height: "35px",
    textAlign: "center",
    "@media (max-width: 425px)": {
      padding: "16.5px 8px"
    }
  },
  select_type: {
    border: "2px solid #c5c5c5",
    borderRadius: "3px",
    height: "30px",
    outline: "none"
  },
  helper_txt: {
    color: "red",
    marginLeft: "150px",
    "@media (max-width: 425px)": {
      marginLeft: "110px"
    }
  },
  text_area: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  text_Label: {
    minWidth: "150px",
    textAlign: "center",
    "@media (max-width: 425px)": {
      minWidth: "110px",
      fontSize: "14px"
    }
  }
}));

const formValidationSchema = Yup.object().shape({
  type: Yup.string().required().notOneOf(["Select Type"], "Please select Device type"),
  system_name: Yup.string().trim().matches(/^(?!\s+$)/, 'This System Name cannot contain only blankspaces').required("System Name is required"),
  hdd_capacity: Yup.number("HDD Capacity must be a number").positive("HDD Capacity must be a positive number").required("HDD Capacity must be required")
});

const initialDevice = {
  type: "Select Type",
  system_name: "",
  hdd_capacity: ""
}

const AddEditDevices = ({ modal, isEdit, device, setEditDeviceInfo, onSubmitForm }) => {

  const classes = useStyles();

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
    enableReinitialize: true,
    initialValues: device || initialDevice,
    validationSchema: formValidationSchema,
    onSubmit: onSubmitForm
  })

  const onCloseModal = () => {
    setEditDeviceInfo({ modal: false, isEdit: false, device: {} });
  }

  return (
    <StyledModel aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={modal} onClose={onCloseModal}>
      <Paper className={classes.paper}>
        <div className={classes.modal_title}>{!isEdit ? "Add Device" : "Edit Device"}</div>
        <div className={classes.container}>
          <FormControl>
            <div className={classes.text_area}>
              <InputLabel className={classes.text_Label} htmlFor="device_type">Device Type</InputLabel>
              <Select placeholder="Select Type" value={values.type} onChange={handleChange} onBlur={handleBlur} name="type" className={classes.input_txt} id="device_type">
                <MenuItem hidden value={"Select Type"}>Select Type</MenuItem>
                {DeviceTypes.map(({ type, value }, i) => value !== "ALL" ? <MenuItem key={i} value={value}>{type}</MenuItem> : "")}
              </Select>
            </div>
            {errors.type && touched.type && <FormHelperText className={classes.helper_txt} id="system_name_helper">{errors.type}</FormHelperText>}
          </FormControl>
          <FormControl>
            <div className={classes.text_area}>
              <InputLabel className={classes.text_Label} htmlFor="system_name">System Name</InputLabel>
              <OutlinedInput className={classes.input_txt} value={values.system_name} name="system_name" onChange={handleChange} onBlur={handleBlur} aria-describedby="system_name_helper" id="system_name" />
            </div>
            {errors.system_name && touched.system_name && <FormHelperText className={classes.helper_txt} id="system_name_helper">{errors.system_name}</FormHelperText>}
          </FormControl>
          <FormControl>
            <div className={classes.text_area}>
              <InputLabel className={classes.text_Label} htmlFor="hdd_capacity">HDD Capacity</InputLabel>
              <OutlinedInput type="number" className={classes.input_txt} value={values.hdd_capacity} name="hdd_capacity" onChange={handleChange} aria-describedby="hdd_capacity_helper" onBlur={handleBlur} endAdornment={<div>GB</div>} id="hdd_capacity" />
            </div>
            {errors.hdd_capacity && touched.hdd_capacity && <FormHelperText className={classes.helper_txt} id="hdd_capacity_helper">{errors.hdd_capacity}</FormHelperText>}
          </FormControl>
        </div >
        <div className={classes.modal_footer}>
          <Button className={classes.button} variant="outlined" onClick={onCloseModal}>Cancel</Button>
          <Button className={classes.button} variant="contained" onClick={handleSubmit}>Submit</Button>
        </div>
      </Paper >
    </StyledModel >
  )
}

export default AddEditDevices;