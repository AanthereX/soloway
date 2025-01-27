import {
  SIGNUP_FAILED,
  SIGNUP_LOADING,
  SIGNUP_SUCCESSFULL,
  SIGNIN_FAILED,
  SIGNIN_SUCCESSFULL,
  SIGNIN_LOADING,
  FORGET_PASSWORD_LOADING,
  FORGET_PASSWORD_FAILED,
  FORGET_PASSWORD_SUCCESSFULL,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESSFULL,
  RESET_PASSWORD_LOADING,
  RESEND_FAILED,
  RESEND_LOADING,
  RESEND_SUCCESSFULL,
  ADD_USER_FAILED,
  ADD_USER_LOADING,
  ADD_USER_SUCCESSFULL,
  PROFILE_DATA,
  UPDATE_DATA,
  SIGNUP_DATA,
  VERIFY_LOADING,
  VERIFY_FAILED,
  VERIFY_SUCCESSFULL,
  LOGOUT_FAILED,
  LOGOUT_LOADING,
  LOGOUT_SUCCESSFULL,
  SOCIAL_SIGNUP_FAILED,
  SOCIAL_SIGNUP_LOADING,
  SOCIAL_SIGNUP_SUCCESSFULL,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESSFULL,
  DELETE_USER_FAILED,
  DELETE_USER_LOADING,
  DELETE_USER_SUCCESSFULL,
  UPDATE_USER_FAILED,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESSFULL,
  ADD_USER_RELATED_PROJECT,
  GOOGLE_SIGNIN_SUCCESSFULL,
  GOOGLE_SIGNIN_FAILED,
  GET_TOKEN_LOADING,
  GET_TOKEN_SUCCESSFULL,
  GET_TOKEN_FAILED,
  CHANGE_EMAIL_FAILED,
  CHANGE_EMAIL_LOADING,
  CHANGE_EMAIL_SUCCESSFULL,
  CHANGE_STATUS_FAILED,
  CHANGE_STATUS_LOADING,
  CHANGE_STATUS_SUCCESSFULL,
} from "../constants";

const intitalState = {
  signup: {
    loading: false,
    payload: null,
    error: null,
  },
  user: {
    loading: false,
    payload: null,
    error: null,
  },
  forgetpassword: {
    loading: false,
    payload: null,
    error: null,
  },
  sidebarUserDetails: {
    loading: false,
    payload: null,
    error: null,
  },
  resetpassword: {
    loading: false,
    payload: null,
    error: null,
  },
  resendotp: {
    loading: false,
    payload: null,
    error: null,
  },
  adduser: {
    loading: false,
    payload: null,
    error: null,
  },
  verify: {
    loading: false,
    payload: null,
    error: null,
  },
  logout: {
    loading: false,
    payload: null,
    error: null,
  },
  sociallogin: {
    loading: false,
    payload: null,
    error: null,
  },
  deleteuser: {
    loading: false,
    payload: null,
    error: null,
  },
  updateuser: {
    loading: false,
    payload: null,
    error: null,
  },
  changepassword: {
    loading: false,
    payload: null,
    error: null,
  },
  gettoken: {
    loading: false,
    payload: null,
    error: null,
  },
  changeemail : {
    loading: false,
    payload: null,
    error: null,
  },
  changestatus: {
    loading: false,
    payload: null,
    error: null,
  }
};

export default (state = intitalState, action) => {
  switch (action.type) {
    case SIGNUP_LOADING:
      return {
        ...state,
        signup: {
          loading: true,
        },
      };
    case SIGNUP_SUCCESSFULL:
      return {
        ...state,
        signup: {
          loading: false,
          payload: action?.payload?.data,
        },
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        signup: {
          loading: false,
          error: action?.payload?.error,
        },
      };
    case SIGNIN_LOADING:
      return {
        ...state,
        user: {
          loading: true,
        },
      };
    case SIGNIN_SUCCESSFULL:
      return {
        ...state,
        user: {
          loading: false,
          payload: action?.payload?.data,
        },
      };
    case SIGNIN_FAILED:
      return {
        ...state,
        user: {
          loading: false,
          error: action?.payload?.error,
        },
      };
      case GOOGLE_SIGNIN_SUCCESSFULL:
        return {
          ...state,
          user: {
            payload: action?.payload?.data,
          },
        };
        case GOOGLE_SIGNIN_FAILED:
          return {
            ...state,
            user: {
              error: action?.payload?.error,
            },
          };
    case LOGOUT_LOADING:
      return {
        ...state,
        logout: {
          loading: true,
        },
      };
    case LOGOUT_SUCCESSFULL:
      return {
        ...state,
        logout: {
          loading: false,
          payload: action?.payload?.data,
        },
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        logout: {
          loading: false,
          error: action?.payload?.error,
        },
      };
    case FORGET_PASSWORD_LOADING:
      return {
        ...state,
        forgetpassword: {
          loading: true,
        },
      };
    case FORGET_PASSWORD_SUCCESSFULL:
      return {
        ...state,
        forgetpassword: {
          loading: false,
          payload: action?.payload?.data,
        },
      };
    case FORGET_PASSWORD_FAILED:
      return {
        ...state,
        forgetpassword: {
          loading: false,
          error: action?.payload?.error,
        },
      };
    case SOCIAL_SIGNUP_LOADING:
      return {
        ...state,
        sociallogin: {
          loading: true,
        },
      };
    case SOCIAL_SIGNUP_SUCCESSFULL:
      return {
        ...state,
        sociallogin: {
          loading: false,
          payload: action?.payload?.data,
        },
      };
    case SOCIAL_SIGNUP_FAILED:
      return {
        ...state,
        sociallogin: {
          loading: false,
          error: action?.payload?.error,
        },
      };
    case RESET_PASSWORD_LOADING:
      return {
        ...state,
        resetpassword: {
          loading: true,
        },
      };
    case RESET_PASSWORD_SUCCESSFULL:
      return {
        ...state,
        resetpassword: {
          loading: false,
          payload: action?.payload?.data,
        },
      };
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        resetpassword: {
          loading: false,
          error: action?.payload?.error,
        },
      };
      case CHANGE_EMAIL_LOADING:
        return {
          ...state,
          changeemail: {
            loading: true,
          },
        };
      case CHANGE_EMAIL_FAILED:
        return {
          ...state,
          changeemail: {
            loading: false,
            payload: action?.payload?.error,
          },
        };
      case CHANGE_EMAIL_SUCCESSFULL:
        return {
          ...state,
          changeemail: {
            loading: false,
            error: action?.payload?.data,
          },
        };
    case RESEND_LOADING:
      return {
        ...state,
        resendotp: {
          loading: true,
        },
      };
    case RESEND_SUCCESSFULL:
      return {
        ...state,
        resendotp: {
          loading: false,
          payload: action?.payload?.data,
        },
      };
    case RESEND_FAILED:
      return {
        ...state,
        resendotp: {
          loading: false,
          error: action?.payload?.error,
        },
      };
      case CHANGE_PASSWORD_LOADING:
        return {
          ...state,
          changepassword: {
            loading: true,
          },
        };
      case CHANGE_PASSWORD_SUCCESSFULL:
        return {
          ...state,
          changepassword: {
            loading: false,
            payload: action?.payload?.data,
          },
        };
      case CHANGE_PASSWORD_FAILED:
        return {
          ...state,
          changepassword: {
            loading: false,
            error: action?.payload?.error,
          },
        };
        case CHANGE_STATUS_LOADING:
          return {
            ...state,
            changestatus: {
              loading: true,
            },
          };
        case CHANGE_STATUS_SUCCESSFULL:
          return {
            ...state,
            changestatus: {
              loading: false,
              payload: action?.payload?.data,
            },
          };
        case CHANGE_STATUS_FAILED:
          return {
            ...state,
            changestatus: {
              loading: false,
              error: action?.payload?.error,
            },
          };
    case VERIFY_LOADING:
      return {
        ...state,
        verify: {
          loading: true,
        },
      };
    case VERIFY_SUCCESSFULL:
      return {
        ...state,
        verify: {
          loading: false,
          payload: action?.payload?.data,
        },
      };
    case VERIFY_FAILED:
      return {
        ...state,
        verify: {
          loading: false,
          error: action?.payload?.error,
        },
      };
    case ADD_USER_LOADING:
      return {
        ...state,
        adduser: {
          loading: true,
        },
      };
    case ADD_USER_SUCCESSFULL:
      return {
        ...state,
        adduser: {
          loading: false,
          payload: action?.payload?.data,
        },
      };
      case ADD_USER_RELATED_PROJECT:
      return {
        ...state,
        projectRelatedUser: {
          loading: false,
          payload: action?.payload?.data,
        },
      };
    case ADD_USER_FAILED:
      return {
        ...state,
        adduser: {
          loading: false,
          error: action?.payload?.error,
        },
      };
      case UPDATE_USER_LOADING:
        return {
          ...state,
          updateuser: {
            loading: true,
          },
        };
      case UPDATE_USER_SUCCESSFULL:
        return {
          ...state,
          updateuser: {
            loading: false,
            payload: action?.payload?.data,
          },
        };
      case UPDATE_USER_FAILED:
        return {
          ...state,
          updateuser: {
            loading: false,
            error: action?.payload?.error,
          },
        };
      case DELETE_USER_LOADING:
        return {
          ...state,
          deleteuser: {
            loading: true,
          },
        };
      case DELETE_USER_SUCCESSFULL:
        return {
          ...state,
          deleteuser: {
            loading: false,
            payload: action?.payload?.data,
          },
        };
      case DELETE_USER_FAILED:
        return {
          ...state,
          deleteuser: {
            loading: false,
            error: action?.payload?.error,
          },
        };
        case GET_TOKEN_LOADING:
          return {
            ...state,
            gettoken: {
              loading: true,
            },
          };
        case GET_TOKEN_SUCCESSFULL:
          return {
            ...state,
            gettoken: {
              loading: false,
              payload: action?.payload?.data,
            },
          };
        case GET_TOKEN_FAILED:
          return {
            ...state,
            gettoken: {
              loading: false,
              error: action?.payload?.error,
            },
          };
    case PROFILE_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          payload: action?.payload,
        },
      };
    case SIGNUP_DATA:
      return {
        ...state,
        signup: {
          ...state.signup,
          payload: action?.payload,
        },
      };
    case UPDATE_DATA:
      return {
        ...state,
        sidebarUserDetails: {
          ...state.sidebarUserDetails,
          payload: action?.payload,
        }
      }
    default:
      return state;
  }
};
