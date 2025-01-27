import Api from "../../api/Api";
import { EndPoint } from "../../api/EndPoint";
import { labels } from "../../configs/Labels";
import {
  SIGNUP_FAILED,
  SIGNUP_SUCCESSFULL,
  SIGNUP_LOADING,
  SIGNIN_FAILED,
  SIGNIN_LOADING,
  SIGNIN_SUCCESSFULL,
  LOGOUT_FAILED,
  LOGOUT_LOADING,
  LOGOUT_SUCCESSFULL,
  FORGET_PASSWORD_LOADING,
  FORGET_PASSWORD_FAILED,
  FORGET_PASSWORD_SUCCESSFULL,
  VERIFY_LOADING,
  VERIFY_FAILED,
  VERIFY_SUCCESSFULL,
  SOCIAL_SIGN_IN_LOADING,
  SOCIAL_SIGN_IN_FAILED,
  SOCIAL_SIGN_IN_SUCCESSFULL,
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESSFULL,
  RESEND_FAILED,
  RESEND_LOADING,
  RESEND_SUCCESSFULL,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESSFULL,
  CHANGE_STATUS_SUCCESSFULL,
  CHANGE_STATUS_FAILED,
  CHANGE_STATUS_LOADING,
  EDIT_USER_FAILED,
  EDIT_USER_LOADING,
  EDIT_USER_SUCCESSFULL,
  ADD_USER_FAILED,
  ADD_USER_SUCCESSFULL,
  GOOGLE_SIGNIN_SUCCESSFULL,
  GOOGLE_SIGNIN_FAILED,
  ADD_USER_LOADING,
  PROFILE_DATA,
  SIGNUP_DATA,
  UPDATE_USER_FAILED,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESSFULL,
  UPDATE_DATA,
  GET_TOKEN_LOADING,
  GET_TOKEN_FAILED,
  GET_TOKEN_SUCCESSFULL,
  CHANGE_EMAIL_FAILED,
  CHANGE_EMAIL_LOADING,
  CHANGE_EMAIL_SUCCESSFULL,
  VERIFYOTP_ON_NEW_EMAIL_LOADING,
  VERIFYOTP_ON_NEW_EMAIL_FAILED,
  VERIFYOTP_ON_NEW_EMAIL_SUCCESSFULL,
} from "../constants";
import toast from "react-hot-toast";

const signUpAction = (params, navigate) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_LOADING });
    await Api._post(
      EndPoint.usersSignUp,
      params,
      (res) => {
        dispatch({ type: SIGNUP_SUCCESSFULL, payload: { data: res?.data } });
        toast.success(labels.signupSuccessfull);
        localStorage.setItem("userSignUp", JSON.stringify(res?.data.data));
        navigate("/verify");
      },
      (error) => {
        toast.error(error);
        dispatch({ type: SIGNUP_FAILED, payload: { error } });
      }
    );
  };
};

const signInAction = (params, navigate) => {
  return async (dispatch) => {
    dispatch({ type: SIGNIN_LOADING });
    await Api._post(
      EndPoint.usersSignIn,
      params,
      (res) => {
        dispatch({ type: SIGNIN_SUCCESSFULL, payload: { data: res?.data } });
        toast.success(labels.signinSuccessfull);
        localStorage.setItem("token", res?.data.tokenDetails);
        localStorage.setItem("isEmailVerified", res?.data.data.isEmailVerified);
        localStorage.setItem("user", JSON.stringify(res?.data.data));
        res?.data?.data?.isEmailVerified
          ? navigate("/project")
          : navigate("/verify");
        location?.reload();
      },
      (error) => {
        toast.error(error);
        dispatch({ type: SIGNIN_FAILED, payload: { error } });
      }
    );
  };
};

const socialLoginAction = (params, callBack) => {
  return async (dispatch) => {
    await Api._post(
      EndPoint.socailSignIn,
      params,
      (res) => {
        callBack(res);
        toast.success(labels.socialLoginSuccessfull);
        dispatch({
          type: GOOGLE_SIGNIN_SUCCESSFULL,
          payload: { data: res?.data },
        });
        const info = {
          email: res?.data?.data?.user?.email,
          username: res?.data?.data?.user?.userName,
          fullName: res?.data?.data?.user?.fullName,
          image: res?.data?.data?.user?.picture,
          id: res?.data?.data?.user?.id,
          socialType: "google",
          googleId: res?.data?.data?.user?.googleId,
        };
        localStorage.setItem("token", res?.data?.data?.token);
        localStorage.setItem("user", JSON.stringify(info));
      },
      (error) => {
        toast.error(error);
        dispatch({ type: GOOGLE_SIGNIN_FAILED, payload: { error } });
      }
    );
  };
};

const forgetPassword = (params, navigate, setSteps) => {
  return async (dispatch) => {
    dispatch({ type: FORGET_PASSWORD_LOADING });
    await Api._post(
      EndPoint.usersForgotPassword,
      params,
      (res) => {
        dispatch({
          type: FORGET_PASSWORD_SUCCESSFULL,
          payload: { data: res?.data },
        });
        setSteps((prev) => prev + 1);
        toast.success(labels.otpSendtoEmail);
      },
      (error) => {
        setSteps((prev) => prev);
        toast.error(error);
        dispatch({ type: FORGET_PASSWORD_FAILED, payload: { error } });
      }
    );
  };
};

const verifyOtp = (params, navigate, setSteps) => {
  return async (dispatch) => {
    dispatch({ type: VERIFY_LOADING });
    await Api._post(
      EndPoint.usersVerify,
      params,
      (res) => {
        dispatch({ type: VERIFY_SUCCESSFULL, payload: { data: res?.data } });
        setSteps((prev) => prev + 1);
        toast.success(labels.verificationSuccess);
      },
      (error) => {
        setSteps((prev) => prev);
        toast.error(error);
        dispatch({ type: VERIFY_FAILED, payload: { error } });
      }
    );
  };
};

const verifyOtpIfNotVerified = (params, navigate) => {
  return async (dispatch) => {
    dispatch({ type: VERIFY_LOADING });
    await Api._post(
      EndPoint.usersVerify,
      params,
      (res) => {
        dispatch({ type: VERIFY_SUCCESSFULL, payload: { data: res?.data } });
        toast.success(labels.verificationSuccess);
        navigate("/login");
      },
      (error) => {
        toast.error(error);
        dispatch({ type: VERIFY_FAILED, payload: { error } });
      }
    );
  };
};

const resendOtpForgetPassword = (params, setSteps) => {
  return async (dispatch) => {
    dispatch({ type: RESEND_LOADING });
    await Api._post(
      EndPoint.usersForgotPassword,
      params,
      (res) => {
        setSteps((prev) => prev);
        dispatch({ type: RESEND_SUCCESSFULL, payload: { data: res?.data } });
        toast.success(labels.codeResendSuccess);
      },
      (error) => {
        setSteps((prev) => prev);
        toast.error(error);
        dispatch({ type: RESEND_FAILED, payload: { error } });
      }
    );
  };
};


const getNotifications = async (user) => {
  await Api._get(
    `${EndPoint.usersGetNotification}`,
    (success) => {
      user(success?.data);
    },
    (error) => {
      toast.error(error);
    }
  );
};

const getAllUsers = async (user, params) => {
  const query = new URLSearchParams(params).toString();
  await Api._get(
    `${EndPoint.allUsers}?${query}`,
    (success) => {
      user(success?.data?.data);
    },
    (error) => {
      toast.error(error);
    }
  );
};

const getAllNotifications = async (user, params) => {
  const query = new URLSearchParams(params).toString();
  await Api._get(
    `${EndPoint.usersGetAllNotification}?${query}`,
    (success) => {
      user(success?.data?.data);
    },
    (error) => {
      toast.error(error);
    }
  );
};
const getAllEmailNotifications = async (user) => {
  await Api._get(
    `${EndPoint.getEmailNotification}`,
    (success) => {
      user(success?.data?.data);
    },
    (error) => {
      toast.error(error);
    }
  );
};

const getSingleUser = async (id, user) => {
  await Api._get(
    `${EndPoint.usersSingleUser}/${id}`,
    (success) => {
      user(success?.data?.data);
    },
    (error) => {
      toast.error(error);
    }
  );
};

const deleteUser = async (id) => {
  await Api._delete(
    `${EndPoint.deleteUser}/${id}`,
    (success) => {
      toast.success(success?.data?.message);
    },
    (error) => {
      toast.error(error);
    }
  );
};

const postFcmToken = (params) => {
  return async (dispatch) => {
    dispatch({ type: GET_TOKEN_LOADING });
    await Api._post(
      EndPoint.usersDeviceToken,
      params,
      (res) => {
        dispatch({ type: GET_TOKEN_SUCCESSFULL, payload: { data: res?.data } });
      },
      (error) => {
        toast.error(error);
        dispatch({ type: GET_TOKEN_FAILED, payload: { error } });
      }
    );
  };
};

const resetPassword = (params, navigate, setSteps) => {
  return async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_LOADING });
    await Api._post(
      EndPoint.usersResetPassword,
      params,
      (res) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESSFULL,
          payload: { data: res?.data },
        });
        setSteps((prev) => prev + 1);
        toast.success(labels.resetPasswordSuccessFull);
      },
      (error) => {
        setSteps((prev) => prev);
        toast.error(error);
        dispatch({ type: RESET_PASSWORD_FAILED, payload: { error } });
      }
    );
  };
};

const changePassword = (
  params,
  setDisableFields,
  setFieldsEditable,
  setValues
) => {
  return async (dispatch) => {
    dispatch({ type: CHANGE_PASSWORD_LOADING });
    await Api._post(
      EndPoint.usersChangePassword,
      params,
      (res) => {
        setDisableFields(false);
        setFieldsEditable(false);
        setValues({
          oldPassword: "",
          newPassword: "",
        });
        dispatch({
          type: CHANGE_PASSWORD_SUCCESSFULL,
          payload: { data: res?.data },
        });
        toast.success(labels.changePasswordSuccess);
      },
      (error) => {
        setDisableFields(false);
        setFieldsEditable(true);
        dispatch({ type: CHANGE_PASSWORD_FAILED, payload: { error } });
        toast.error(error);
      }
    );
  };
};

const changeEmailRequest = (
  params,
  navigate,
  setDisableFields,
  setFieldsEditable
) => {
  return async (dispatch) => {
    dispatch({ type: CHANGE_EMAIL_LOADING });
    await Api._post(
      EndPoint.usersChangeEmail,
      params,
      (res) => {
        setDisableFields(false);
        setFieldsEditable(true);
        dispatch({
          type: CHANGE_EMAIL_SUCCESSFULL,
          payload: { data: res?.data },
        });
        toast.success(`${res?.data}`);
        navigate("/verify");
      },
      (error) => {
        dispatch({ type: CHANGE_EMAIL_FAILED, payload: { error } });
        toast.error(error);
      }
    );
  };
};

const verifyOtpOnNewEmail = (params) => {
  return async (dispatch) => {
    dispatch({ type: VERIFYOTP_ON_NEW_EMAIL_LOADING });
    await Api._post(
      EndPoint.usersVerifyChangeEmail,
      params,
      (res) => {
        dispatch({
          type: VERIFYOTP_ON_NEW_EMAIL_SUCCESSFULL,
          payload: { data: res?.data },
        });
        toast.success(labels.verificationSuccess);
        dispatch(logOutAction("/login"));
      },
      (error) => {
        dispatch({ type: VERIFYOTP_ON_NEW_EMAIL_FAILED, payload: { error } });
      }
    );
  };
};

const logOutAction = async (routeName) => {
  await Api._post(
    EndPoint.usersLogout,
    {},
    (res) => {
      localStorage.clear();
      toast.success(res?.data?.message);
      window.location.href = routeName;
    },
    (error) => {
      toast.error(error);
    }
  );
};

const addUser = (params, callBack) => {
  return async (dispatch) => {
    dispatch({ type: ADD_USER_LOADING });
    await Api._post(
      EndPoint.usersAddUser,
      params,
      (res) => {
        callBack(res);
        dispatch({ type: ADD_USER_SUCCESSFULL, payload: { data: res?.data } });
        toast.success(labels.addUserSuccess);
      },
      (error) => {
        toast.error(error);
        dispatch({ type: ADD_USER_FAILED, payload: { error } });
      }
    );
  };
};

const updateUser = (params, callBack, loading) => {
  loading(true);
  return (dispatch) => {
    dispatch({ type: UPDATE_USER_LOADING });
    return Api._patch(
      `${EndPoint.updateUser}/${params?.id}`,
      params,
      (res) => {
        loading(false);
        callBack(res);
        dispatch({
          type: UPDATE_USER_SUCCESSFULL,
          payload: { data: res?.data },
        });
        toast.success(res?.data?.message);
      },
      (error) => {
        loading(false);
        dispatch({ type: UPDATE_USER_FAILED, payload: { error } });
        toast.error(error);
      }
    );
  };
};

const editUser = (params) => {
  return (dispatch) => {
    dispatch({ type: EDIT_USER_LOADING });
    return Api._patch(
      `${EndPoint.usersUpdateDetail}/${params?.id}`,
      params,
      (res) => {
        dispatch({ type: EDIT_USER_SUCCESSFULL, payload: { data: res?.data } });
        toast.success(labels.editUserSuccess);
      },
      (error) => {
        dispatch({ type: EDIT_USER_FAILED, payload: { error } });
        toast.error(error);
      }
    );
  };
};

const changeStatus = async (id, params, callBack) => {
  const query = new URLSearchParams(params).toString();
  await Api._patch(
    `${EndPoint.projectChangeStatus}/${id}?${query}`,
    {},
    (success) => {
      callBack(success);
      toast.success(`${success?.data?.message}`);
    },
    (error) => {
      toast.error(error);
    }
  );
};

const changeActive = async (id, params, callBack) => {
  const query = new URLSearchParams(params).toString();
  await Api._patch(
    `${EndPoint.usersChangeActive}/${id}?${query}`,
    {},
    (success) => {
      callBack(success);
      toast.success(`${success?.data?.message}`);
    },
    (error) => {
      toast.error(error);
    }
  );
};

const resendOtpVerify = (params, setOtp, setErrors) => {
  return async (dispatch) => {
    dispatch({ type: RESEND_LOADING });
    await Api._post(
      EndPoint.usersForgotPassword,
      params,
      (res) => {
        setOtp([]);
        setErrors({ otp: null });
        dispatch({ type: RESEND_SUCCESSFULL, payload: { data: res?.data } });
        toast.success(labels.codeResendSuccess);
      },
      (error) => {
        toast.error(error);
        dispatch({ type: RESEND_FAILED, payload: { error } });
      }
    );
  };
};
const emailChangeStatus = async (obj,callBack,loader) => {
  loader(true)
  await Api._patch(
    `${EndPoint.getEmailNotification}`,
    obj,
    (success) => {
      loader(true)
      callBack(success);
      toast.success(success?.data?.message);
    },
    (error) => {
      loader(false)
      toast.error(error);
    }
  )
}

// const socialSignup = (params, navigate) => {
//   return async (dispatch) => {
//     dispatch({ type: SOCIAL_SIGNUP_LOADING});
//     const response = await Api._post(
//       EndPoint.socialSignup,
//       params,
//       (res) => {
//         dispatch({ type: SOCIAL_SIGNUP_SUCCESSFULL , payload: { data: res?.data } })
//         toast.success(labels.socialSignupSuccess)
//       },
//       (error) => {
//         toast.error(labels.socialSignupFailed)
//         dispatch({ type: SOCIAL_SIGNUP_FAILED, payload: { error } });
//       }
//     );
//   };
// };

const updateUserDetails = (
  params,
  setFieldsEditable,
  setDisableFields,
  callBack
) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_LOADING });
    await Api._postImage(
      EndPoint.usersUserDetail,
      params,
      (res) => {
        setDisableFields(true);
        setFieldsEditable(false);
        dispatch({
          type: UPDATE_USER_SUCCESSFULL,
          payload: { data: res?.data },
        });
        callBack(res);
        toast.success(labels.userUpdatedSuccess);
      },
      (error) => {
        setDisableFields(true);
        setFieldsEditable(false);
        dispatch({ type: UPDATE_USER_FAILED, payload: { error } });
        toast.error(error);
      }
    );
  };
};

const userProfileAction = (data) => {
  return {
    type: PROFILE_DATA,
    payload: data,
  };
};


const updatedData = (data) => {
  return {
    type: UPDATE_DATA,
    payload: data,
  };
};

const userSignUpAction = (data) => {
  return {
    type: SIGNUP_DATA,
    payload: data,
  };
};



export {
  signUpAction,
  socialLoginAction,
  signInAction,
  postFcmToken,
  forgetPassword,
  resendOtpVerify,
  changeEmailRequest,
  verifyOtp,
  getAllUsers,
  logOutAction,
  getAllEmailNotifications,
  updatedData,
  getSingleUser,
  updateUserDetails,
  emailChangeStatus,
  editUser,
  getNotifications,
  getAllNotifications,
  changePassword,
  verifyOtpOnNewEmail,
  updateUser,
  resetPassword,
  changeStatus,
  deleteUser,
  resendOtpForgetPassword,
  addUser,
  verifyOtpIfNotVerified,
  userProfileAction,
  userSignUpAction,
  changeActive,
};


