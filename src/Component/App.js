import React, { useEffect } from 'react';
import { Alert, Container } from '@mui/material';
import './App.css';

import useDevices from '../Hooks/useDevices';
import DataTable from './Table';
import FilterOptions from './FilterOptions';
import AddEditDevices from './AddEditDevices';

function App() {

  const { tableColumn, editDeviceInfo, ErrorMessage, filteredDevices, filterValues, onChangeFilters, onDeleteDevice, setEditDeviceInfo, onSubmitForm } = useDevices();

  return (
    <Container className="app" maxWidth="lg">
      {ErrorMessage.show && <Alert className="alert_message" severity="error">{ErrorMessage.message}</Alert>}
      <AddEditDevices {...editDeviceInfo} setEditDeviceInfo={setEditDeviceInfo} onSubmitForm={onSubmitForm} />
      <FilterOptions {...filterValues} onChangeFilters={onChangeFilters} setEditDeviceInfo={setEditDeviceInfo} />
      <DataTable data={filteredDevices} columns={tableColumn} setEditDeviceInfo={setEditDeviceInfo} onDeleteDevice={onDeleteDevice} />
    </Container>
  );
}

export default App;