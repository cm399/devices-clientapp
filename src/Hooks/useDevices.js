import { useEffect, useState } from "react";
import { findDeviceType, findSortBy } from "../Helper";
import { DeviceTypes, SortByFields } from "./../Constants/";
import API from "./../Helper/API";

const initColumns = [
  {
    id: 1,
    column: "Device Type"
  },
  {
    id: 2,
    column: "System Name",
    align: "right"
  },
  {
    id: 3,
    column: "HDD Capacity",
    align: "right"
  },
  {
    id: 4,
    column: "Edit",
    align: "right"
  },
  {
    id: 5,
    column: "Delete",
    align: "right"
  },
]

const useDevices = () => {

  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [filterValues, setFilterValues] = useState({ DeviceType: DeviceTypes[0].id, SortBy: SortByFields[0].id });
  const [editDeviceInfo, setEditDeviceInfo] = useState({ modal: false, isEdit: false, device: {} });
  const [ErrorMessage, setErrorMessage] = useState({ show: false, variant: "error", message: "" });

  useEffect(console.clear)

  const getAllDevices = async () => {
    try {
      const { data } = await API.get("/devices")
      if (data) {
        data.sort(function (a, b) {
          if (a.system_name < b.system_name) { return -1; }
          if (a.system_name > b.system_name) { return 1; }
          return 0;
        });
        setDevices(data);
        setFilterValues({ DeviceType: DeviceTypes[0].id, SortBy: SortByFields[0].id });
        setFilteredDevices(data);
      }
    } catch (error) {
      setErrorMessage({ ...ErrorMessage, show: true, message: "Something goes wrong here." })
    }
  }

  useEffect(() => {
    getAllDevices();
    onChangeFilters({ name: "SortBy", value: SortByFields[0].id });
  }, [])

  useEffect(() => {
    let timeOut;
    if (ErrorMessage.show)
      setTimeout(() => {
        setErrorMessage({ show: false, message: "" });
      }, 4000)
    return () => clearTimeout(timeOut);
  }, [ErrorMessage])

  const onChangeFilters = ({ name, value }) => {
    setFilterValues({ ...filterValues, [name]: value })
    const filterFunctions = {
      "DeviceType": function (filteredID) {
        const { value } = findDeviceType(filteredID);
        if (value !== "ALL") {
          const filteredDevice = devices.filter(({ type }) => type === value).sort(function (a, b) {
            const sortType = filterValues.SortBy === SortByFields[0].id ? "system_name" : "hdd_capacity";
            if (sortType === "system_name") {
              if (a[sortType] < b[sortType]) { return -1; }
              if (a[sortType] > b[sortType]) { return 1; }
            } else {
              if (+a[sortType] < +b[sortType]) { return -1; }
              if (+a[sortType] > +b[sortType]) { return 1; }
            }
            return 0;
          });
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
    try {
      await API.delete(`/devices/${id}`);
      await getAllDevices()
    } catch (error) {
      setErrorMessage({ ...ErrorMessage, show: true, message: "Something goes wrong here." })
    }
  }

  const onSubmitForm = async ({ id, ...value }) => {
    try {
      if (editDeviceInfo.isEdit) {
        await API.put(`/devices/${id}`, value)
        setEditDeviceInfo({ modal: false, isEdit: false, device: {} })
      } else {
        await API.post(`/devices`, value)
        setEditDeviceInfo({ modal: false, isEdit: false, device: {} })
      }
      await getAllDevices()
    } catch (error) {
      setErrorMessage({ ...ErrorMessage, show: true, message: "Something goes wrong here." })
    }
  }

  return ({
    devices,
    filteredDevices,
    tableColumn: initColumns,
    filterValues,
    ErrorMessage,
    editDeviceInfo,
    setEditDeviceInfo,
    onChangeFilters,
    onDeleteDevice,
    onSubmitForm
  })
}

export default useDevices;