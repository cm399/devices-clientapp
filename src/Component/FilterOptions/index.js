import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { AddDeviceButton, OptionsWrappers, SelectWrappers } from "./styled";
import { DevideTypes, SortByFields } from "./../../Constants/";

const FilterOptions = ({ DeviceType, SortBy, onChangeFilters, onAddClick }) => {

  const handleChange = ({ target }) => {
    onChangeFilters(target)
  }

  return (
    <OptionsWrappers>
      <AddDeviceButton variant="contained" onClick={onAddClick}>Add Device</AddDeviceButton>
      <div>
        <SelectWrappers fullWidth>
          <InputLabel id="DeviceTypeID">Device Type</InputLabel>
          <Select value={DeviceType} labelId="DeviceTypeID" label="Device Type" name="DeviceType" onChange={handleChange}>
            {DevideTypes.map(({ id, type }) => <MenuItem key={id} value={id}>{type}</MenuItem>)}
          </Select>
        </SelectWrappers>

        <SelectWrappers fullWidth>
          <InputLabel id="SortByID">Sort By</InputLabel>
          <Select value={SortBy} labelId="SortByID" label="Sort By" name="SortBy" onChange={handleChange}>
            {SortByFields.map(({ id, type }) => <MenuItem key={id} value={id}>{type}</MenuItem>)}
          </Select>
        </SelectWrappers>
      </div>
    </OptionsWrappers >
  );
}

export default FilterOptions;