import * as React from 'react';
import { Button, Container } from '@mui/material';
import { styled } from '@mui/system';

import useDevices from '../Hooks/useDevices';
import DataTable from './Table';
import FilterOptions from './FilterOptions';
import AddEditDevices from './AddEditDevices';

function App() {

  const { tableColumn, editDeviceInfo, filteredDevices, filterValues, onChangeFilters, onDeleteDevice, onEditClick, onCloseModal, onSubmitForm, onAddClick } = useDevices();

  return (
    <Container maxWidth="lg">
      <AddEditDevices {...editDeviceInfo} onCloseModal={onCloseModal} onSubmitForm={onSubmitForm} />
      <FilterOptions {...filterValues} onChangeFilters={onChangeFilters} onAddClick={onAddClick} />
      <DataTable data={filteredDevices} colunms={tableColumn} onEditClick={onEditClick} onDeleteDevice={onDeleteDevice} />
    </Container>
  );
}

export default App;