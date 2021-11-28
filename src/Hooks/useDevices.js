import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { DevideTypes, SortByFields } from "./../Constants/";
import API from "./../Helper/API";

const initColumns = [
  {
    id: v4(),
    column: "Device Type"
  },
  {
    id: v4(),
    column: "System Name",
    align: "right"
  },
  {
    id: v4(),
    column: "HDD Capacity",
    align: "right"
  },
  {
    id: v4(),
    column: "Edit",
    align: "right"
  },
  {
    id: v4(),
    column: "Delete",
    align: "right"
  },
]

const useDevices = () => {

  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [filterValues, setFilterValues] = useState({ DeviceType: DevideTypes[0].id, SortBy: SortByFields[0].id });
  const [tableColumn] = useState(initColumns);
  const [editDeviceInfo, setEditDeviceInfo] = useState({ modal: false, isEdit: false, device: {} });


  const getAllDevides = async () => {
    const { data } = await API.get("/devices")
    if (data) {
      setDevices(data);
      setFilteredDevices(data);
    }
  }

  useEffect(getAllDevides, [])

  const findDeviceType = (filterId) => DevideTypes.find(({ id }) => id === filterId)
  const findSortBy = (filterId) => SortByFields.find(({ id }) => id === filterId)

  const onChangeFilters = ({ name, value }) => {
    setFilterValues({ ...filterValues, [name]: value })

    const filterFunctions = {
      "DeviceType": function (filteredID) {
        const { value } = findDeviceType(filteredID);
        if (value !== "ALL") {
          const filteredDevice = devices.filter(({ type }) => type === value);
          setFilteredDevices(filteredDevice);
        } else {
          setFilteredDevices(devices);
        }
      },
      "SortBy": function (value) {
        const { type } = findSortBy(value);
        const device = findDeviceType(filterValues.DeviceType)
        let SortDevices = [];
        switch (type) {
          case "System Name":
            SortDevices = (device.type === "All" ? devices : filteredDevices).sort(function (a, b) {
              if (a.system_name < b.system_name) { return -1; }
              if (a.system_name > b.system_name) { return 1; }
              return 0;
            })
            setFilteredDevices(SortDevices);
            break;
          case "HDDCapacity":
            SortDevices = (device.type === "All" ? devices : filteredDevices).sort(function (a, b) {
              if (+a.hdd_capacity < +b.hdd_capacity) { return -1; }
              if (+a.hdd_capacity > +b.hdd_capacity) { return 1; }
              return 0;
            })
            setFilteredDevices(SortDevices);
            break;
        }
      }
    }
    if (typeof filterFunctions[name] === "function")
      filterFunctions[name](value);
  }

  const onDeleteDevice = async (id) => {
    await API.delete(`/devices/${id}`);
    await getAllDevides()

  }

  const onEditClick = (ID) => {
    const device = devices.find(({ id }) => id === ID);
    setEditDeviceInfo({ modal: true, isEdit: true, device })
  }

  const onCloseModal = () => {
    setEditDeviceInfo({ modal: false, isEdit: false, device: {} });
  }

  const onSubmitForm = async ({ id, ...value }, { ...props }) => {
    console.log(value, "value", props);
    if (editDeviceInfo.isEdit) {
      await API.put(`/devices/${id}`, value)
      setEditDeviceInfo({ modal: false, isEdit: false, device: {} })
    } else {
      await API.post(`/devices`, value)
      setEditDeviceInfo({ modal: false, isEdit: false, device: {} })
    }
    await getAllDevides()
  }

  const onAddClick = () => {
    setEditDeviceInfo({ modal: true, isEdit: false })
  }

  return ({
    devices,
    filteredDevices,
    tableColumn,
    filterValues,
    editDeviceInfo,
    onChangeFilters,
    onDeleteDevice,
    onEditClick,
    onAddClick,
    onCloseModal,
    onSubmitForm
  })
}

export default useDevices;