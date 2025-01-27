import toast from "react-hot-toast";
import { labels } from "../configs/Labels";

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const validateEmailAddress = (val) => {
    if (val && !emailRegex.test(val)) {
        return "Invalid email address"
    }
    return null
}

export const validateText = (val) => {
    if (!val) {
        return "Please fill this field"
    }
    return null
}
export const validateTextLength = (val) => {
    if (!val?.length) {
        return "Please fill this field"
    }
    return null
}
export const  isValidURL = (url) =>  {
    let re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return re.test(url)
  };
export const validateOnlySpace = (val) => {
    
    if (val.trim() === "") {
        return "Can't be only spaces"
    }
    return null
}

export const validateLength = (val) => {

    const trimmedVal = val.trim()

    if (trimmedVal.length < 3) {
        return "Minimum 3 (three) characters required"
    }
    return null
}

// ** Returns K format from a number
export const kFormatter = (num) =>
  num > 999 ? `${(num / 1000).toFixed(1)}k` : num;


export const checkInternetConnection = () =>  {
    if (!navigator.onLine) {
      toast?.error(labels.noInternetConnection);
    }
    return navigator.onLine;
  }
  export const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
      borderColor: "#595959",
      color: "#FFFFFF !important",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#BF642B" : "#595959",
        color:  "#FFFFFF !important",
        "&:hover": {
          cursor: "pointer",
        },
        multiValue: provided => ({
          ...provided,
          color: '#FFFFFF !important'
        }),
        singleValue: provided => ({
          ...provided,
          color: '#FFFFFF !important'
        }),
        // input: (styles) => ({ ...styles, color: "#FFFFFF" }),
        input: (base, state) => ({
          ...base,
          '[type="text"]': {
            color: 'white !important'
          }
        })
        
      };
    },
  };

  export const membersOptions = [
    { value: "Esthela", label: "Esthela" },
    { value: "Marc", label: "Marc" },
    { value: "Esthela and Marc", label: "Esthela and Marc" },
  ]
  export const EsthelaMarcOptions = [
    { value: "Esthela", label: "Esthela" },
    { value: "Marc", label: "Marc" },
    { value: "Esthela and Marc", label: "Esthela and Marc" },
  ]

  export const typeOptions = [
    { value: "Interiors", label: "Interiors" },
    { value: "Architectural", label: "Architectural" },
  ]

  export const taskOptions = [
    { id: "Not Started", label: "Not Started" },
    { id: "Completed", label: "Completed"},
    { id: "In Progress", label: "In Progress" },
    { id: "On Hold", label: "On Hold" },
    { id: "Delayed", label: "Delayed" },
    { id: "Canceled", label: "Canceled" },
    { id: "In Review", label: "In Review" },
    { id: "Approved", label: "Approved" },
    { id: "Rejected", label: "Rejected" },
    { id: "Needs Revision", label: "Needs Revision" },
    { id: "Awaiting Feedback", label: "Waiting Feedback" },
    { id: "Postponed", label: "Postponed" },
    { id: "Scheduled", label: "Scheduled" },
    { id: "Waiting For Approval", label: "Waiting For Approval" },
    { id: "Ordered", label: "Ordered" },
    { id: "In Route", label: "In Route" },
    { id: "Tentative Delivery", label: "Tentative Delivery" },
    { id: "Delivered", label: "Delivered" },
    { id: "Tentative Install", label: "Tentative Install" },
    { id: "Installed", label: "Installed" },
  ];

  export const projectOptions = [
    { id: "complete", label: "Completed" },
    { id: "in_progress", label: "In Progress" },
    { id: "blocked", label: "Blocked" },
  ];

  export const UserOptions = [
    { id: 1, title: "User" },
    { id: 2, title: "Client" },
    { id: 3, title: "Admin" },
    { id: 4, title: "Contributor" },
  ];

  export const fileOptions = [
    { id: "jpeg", label: ".jpeg" },
    { id: "mov", label: ".mov" },
    { id: "pdf", label: ".pdf" },
    { id: "doc", label: ".doc" },
    { id: "url", label: "url" },
    { id: "mp4", label: "mp4" },
  ];