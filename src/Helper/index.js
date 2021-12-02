import { DeviceTypes, SortByFields } from "../Constants"

export const findDeviceType = (filterId) => DeviceTypes.find(({ id }) => id === filterId)
export const findSortBy = (filterId) => SortByFields.find(({ id }) => id === filterId)