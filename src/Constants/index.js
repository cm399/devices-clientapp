import { v4 } from "uuid";

export const DevideTypes = [
  {
    id: v4(),
    type: "All",
    value: "ALL"
  },
  {
    id: v4(),
    type: "Windows Workstation",
    value: "WINDOWS_WORKSTATION"
  },
  {
    id: v4(),
    type: "Windows Server",
    value: "WINDOWS_SERVER"
  },
  {
    id: v4(),
    type: "Mac",
    value: "MAC"
  }
]

export const SortByFields = [
  {
    id: v4(),
    type: "System Name"
  },
  {
    id: v4(),
    type: "HDDCapacity"
  }
]