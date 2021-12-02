import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { AddDeviceButton, OptionsWrappers, SelectWrappers } from "./styled";
import { DeviceTypes, SortByFields } from "./../../Constants/";

const FilterOptions = ({ DeviceType, SortBy, onChangeFilters, setEditDeviceInfo }) => {

  const handleChange = ({ target }) => onChangeFilters(target)
  const onAddClick = () => setEditDeviceInfo({ modal: true, isEdit: false })

  return (
    <OptionsWrappers>
      <div>
        <SelectWrappers fullWidth>
          <InputLabel id="DeviceTypeID">Device Type</InputLabel>
          <Select value={DeviceType} labelId="DeviceTypeID" label="Device Type" name="DeviceType" onChange={handleChange}>
            {DeviceTypes.map(({ id, type }) => <MenuItem key={id} value={id}>{type}</MenuItem>)}
          </Select>
        </SelectWrappers>
        <SelectWrappers fullWidth>
          <InputLabel id="SortByID">Sort By</InputLabel>
          <Select value={SortBy} labelId="SortByID" label="Sort By" name="SortBy" onChange={handleChange}>
            {SortByFields.map(({ id, type }) => <MenuItem key={id} value={id}>{type}</MenuItem>)}
          </Select>
        </SelectWrappers>
      </div>
      <AddDeviceButton variant="contained" onClick={onAddClick}>Add Device</AddDeviceButton>
    </OptionsWrappers>
  );
}

export default FilterOptions;