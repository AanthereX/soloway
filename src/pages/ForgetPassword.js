import React, { useCallback, useRef, useState, useEffect } from "react";
import { labels } from "../configs/Labels";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  forgetPassword,
  verifyOtp,
  resetPassword,
  resendOtpForgetPassword,
} from "../store/actions";
import OtpInput from "react-otp-input";
import {
  checkInternetConnection,
  validateEmailAddress,
  validateLength,
  validateOnlySpace,
  validateText,
} from "../utils/validate";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [steps, setSteps] = useState(0);
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.User.forgetpassword);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const inputRefs = useRef([]);

  const [values, setValues] = useState({
    email: "",
    newPassword: "",
    confirmNewPass: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    otp: null,
    newPassword: null,
    confirmNewPass: null,
  });

  const handleForgetPassword = useCallback(async () => {
    if (!values.email) {
      const textError = validateText(values.email);
      setErrors((prevState) => ({
        ...prevState,
        email: textError,
      }));
    }
    if (values.email) {
      const emailError = validateEmailAddress(values.email);
      setErrors((prevState) => ({
        ...prevState,
        email: emailError,
      }));
      if (emailError) return;
    }
    if (values.email && validateEmailAddress(values.email) === null) {
      const params = {
        email: values.email,
      };
      dispatch(forgetPassword(params, navigate, setSteps));
    }
  }, [values, setErrors, dispatch]);

  const verifyOTP = useCallback(async () => {
    if (!otp) {
      const textError = validateText(values.otp);
      setErrors((prevState) => ({
        ...prevState,
        otp: textError,
      }));
    }
    if (otp) {
      const params = {
        email: values.email,
        code: Number(otp),
      };
      dispatch(verifyOtp(params, navigate, setSteps));
    }
  }, [values, otp, setErrors, dispatch]);

  const resendOTP = useCallback(async () => {
    if (!values.email) {
      const textError = validateText(values.email);
      setErrors((prevState) => ({
        ...prevState,
        email: textError,
      }));
    }
    if (values.email) {
      const emailError = validateEmailAddress(values.email);
      setErrors((prevState) => ({
        ...prevState,
        email: emailError,
      }));
      if (emailError) return;
    }
    if (values.email && validateEmailAddress(values.email) === null) {
      const params = {
        email: values.email,
      };
      dispatch(resendOtpForgetPassword(params, navigate, setSteps));
    }
  }, [values, setErrors, dispatch]);

  const handleChangePassword = useCallback(async () => {
    if (!values.newPassword) {
      const textError = validateText(values.newPassword);
      setErrors((prevState) => ({
        ...prevState,
        newPassword: textError,
      }));
    }
    if (!values.confirmNewPass) {
      const textError = validateText(values.confirmNewPass);
      setErrors((prevState) => ({
        ...prevState,
        confirmNewPass: textError,
      }));
    }
    if (values.newPassword) {
      const textError = validateOnlySpace(values.newPassword);
      setErrors((prevState) => ({
        ...prevState,
        newPassword: textError,
      }));
      if (textError) return;
    }
    if (values.confirmNewPass) {
      const textError = validateOnlySpace(values.confirmNewPass);
      setErrors((prevState) => ({
        ...prevState,
        confirmNewPass: textError,
      }));
      if (textError) return;
    }
    if (values.newPassword) {
      const textError = validateLength(values.newPassword);
      setErrors((prevState) => ({
        ...prevState,
        newPassword: textError,
      }));
      if (textError) return;
    }
    if (values.confirmNewPass) {
      const textError = validateLength(values.confirmNewPass);
      setErrors((prevState) => ({
        ...prevState,
        confirmNewPass: textError,
      }));
      if (textError) return;
    }
    if (values.newPassword && values.confirmNewPass) {
      if (
        Boolean(checkInternetConnection()) &&
        values.newPassword !== values.confirmNewPass
      ) {
        toast.error("Password doesn't match!");
      }
    }
    if (
      values.newPassword &&
      values.confirmNewPass &&
      validateOnlySpace(values.newPassword) === null &&
      validateOnlySpace(values.confirmNewPass) === null &&
      validateLength(values.newPassword) === null &&
      validateLength(values.confirmNewPass) === null
    ) {
      if (
        Boolean(checkInternetConnection()) &&
        values.newPassword === values.confirmNewPass
      ) {
        const params = {
          email: values.email,
          newPassword: values.newPassword,
        };
        dispatch(resetPassword(params, navigate, setSteps));
      }
    }
  }, [values, setErrors, dispatch]);

  const handleSendEmail = () => {
    handleForgetPassword();
  };

  const handleVerifyTypedOtp = () => {
    verifyOTP();
  };

  const handleChangePasswordOnClick = () => {
    handleChangePassword();
  };

  const handleResendOtp = () => {
    resendOTP();
  };

  // const handleInputChange = (e, index) => {
  //   const newOtp = [...otp];
  //   newOtp[index] = e.target.value;
  //   setOtp(newOtp);

  //   if (e.target.value === "" && index > 0) {
  //     inputRefs.current[index - 1].focus();
  //   } else if (e.target.value === "" && index === 0) {
  //     inputRefs.current[0].focus();
  //   } else if (index < otp.length - 1) {
  //     inputRefs.current[index + 1].focus();
  //   }
  // };

  return (
    <React.Fragment>
      {steps === 0 ? (
        <div className="container-fluid mx-auto grid md:grid-cols-2 min-h-screen">
          <div className="bg-c_1B1B1B col-span-1 flex flex-col justify-center w-full min-h-screen pl-4 md:pl-16 pr-4 md:pr-16">
            <img
              className="w-[70px] h-16"
              src="/images/lock.PNG"
              alt="LockImage"
            />
            <h2 className="text-c_fff text-2xl mt-8 font-medium">
              {`${labels.forgetPassword}`}
            </h2>
            <p className="text-base mb-12 mt-2 text-c_FFFFFFCC w-[24ch] md:w-[40ch]">
              {labels.enteryouremailtorecieveverification}
            </p>
            <div className="relative mb-4">
              <Input
                placeholder={labels.enterYourEmail}
                type={"email"}
                id="email"
                value={values.email}
                name="email"
                onChange={(e) => {
                  setErrors((prevState) => ({
                    ...prevState,
                    email: null,
                  }));
                  setValues((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }));
                }}
                error={errors.email}
                errorText={errors.email}
                className="w-full bg-c_212020 rounded text-base outline-none text-c_FFFFFFCC placeholder:text-c_595959 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <Button
              onClick={handleSendEmail}
              disabled={loading}
              label={labels.send}
              className="text-white text-lg capitalize bg-c_BF642B border-0 py-2 px-6 mb-8 mt-4 rounded"
            ></Button>

            <p className="text-base text-c_FFFFFFCC mt-3">
              <span
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-x-2 cursor-pointer capitalize text-base font-bold text-c_FFFFFFCC"
              >
                <HiOutlineArrowNarrowLeft
                  onClick={() => navigate(-1)}
                  className="text-c_FFFFFFCC"
                />
                {`${labels.backToLogin}`}
              </span>
            </p>
          </div>

          <div className="md:col-span-1 w-full hidden md:block min-h-screen overflow-hidden">
            <img
              className="w-full max-h-screen object-fill"
              src="/images/login-background.png"
              alt="SoloWayloginImage"
            />
          </div>
        </div>
      ) : steps === 1 ? (
        <div className="container-fluid mx-auto grid md:grid-cols-2 min-h-screen">
          <div className="bg-c_1B1B1B col-span-1 flex flex-col justify-center w-full min-h-screen pl-4 md:pl-16 pr-4 md:pr-16">
            <img
              className="w-[70px] h-16"
              src="/images/message.PNG"
              alt="LockImage"
            />
            <h2 className="text-c_fff text-2xl mt-8 font-medium">
              {`${labels.verifyemail}`}
            </h2>

            <p className="text-base mb-12 mt-2 text-c_595959">
              {labels.pleaseenterthecodesentto}
              <br></br>
              <span className="font-bold">
                {values?.email ? values.email : labels.verifyemailsend}
              </span>
            </p>

            <div className="relative mb-4 flex items-center justify-left gap-x-8">
              {/* {otp.map((item, index) => (
                <React.Fragment>
                  <Input
                    key={index}
                    type={"text"}
                    value={otp[index]}
                    id="name"
                    name="name"
                    maxLength={1}
                    onChange={(e) => {
                      handleInputChange(e, index);
                      setErrors((prevState) => ({
                        ...prevState,
                        otp: null,
                      }));
                    }}
                    ref={(el) => (inputRefs.current[index] = el)}
                    error={errors.otp}
                    errorText={errors.otp}
                    className="w-12 bg-c_252525 rounded text-base text-center outline-none text-c_595959 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </React.Fragment>
              ))} */}
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                inputType={"number"}
                shouldAutoFocus={true}
                containerStyle={`w-full flex items-center justify-start`}
                inputStyle={`!w-20 !h-12 bg-c_252525 rounded text-base text-center outline-none text-c_fff py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                renderSeparator={<span className="mr-4"></span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>

            <Button
              className="text-white text-lg capitalize bg-c_BF642B border-0 py-2 px-6 mb-8 mt-4 rounded"
              label={labels.verify}
              onClick={handleVerifyTypedOtp}
            ></Button>

            <p className="text-base text-c_595959 mt-3">
              <span
                onClick={handleResendOtp}
                className={`flex items-center justify-center gap-x-2 cursor-pointer capitalize text-base font-bold text-c_595959`}
              >
                {`${labels.resendCode}`}
              </span>
            </p>
          </div>

          <div className="md:col-span-1 w-full hidden md:block min-h-screen overflow-hidden">
            <img
              className="w-full max-h-screen object-fill"
              src="/images/login-background.png"
              alt="SoloWayloginImage"
            />
          </div>
        </div>
      ) : steps === 2 ? (
        <div className="container-fluid mx-auto grid md:grid-cols-2 min-h-screen">
          <div className="bg-c_1B1B1B col-span-1 flex flex-col justify-center w-full min-h-screen pl-4 md:pl-16 pr-4 md:pr-16">
            <img
              className="w-[70px] h-16"
              src="/images/lock.PNG"
              alt="LockImage"
            />
            <h2 className="text-c_fff text-2xl mt-8 font-medium">
              {`${labels.createNewPassword}`}
            </h2>
            <p className="text-base mb-12 mt-2 text-c_fff">
              {labels.yournewPasswordMustcontain}
            </p>
            <div className="relative mb-4">
              <PasswordInput
                placeholder={labels.newPassword}
                id="password"
                name="password"
                value={values.newPassword}
                onChange={(e) => {
                  setErrors((prevState) => ({
                    ...prevState,
                    newPassword: null,
                  }));
                  setValues((prevState) => ({
                    ...prevState,
                    newPassword: e.target.value,
                  }));
                }}
                error={errors.newPassword}
                errorText={errors.newPassword}
                className="w-full bg-c_212020 rounded text-base outline-none text-c_FFFFFFCC placeholder:text-c_595959 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative mb-4">
              <PasswordInput
                placeholder={labels.confirmPassword}
                id="password"
                name="password"
                value={values.confirmNewPass}
                onChange={(e) => {
                  setErrors((prevState) => ({
                    ...prevState,
                    confirmNewPass: null,
                  }));
                  setValues((prevState) => ({
                    ...prevState,
                    confirmNewPass: e.target.value,
                  }));
                }}
                error={errors.confirmNewPass}
                errorText={errors.confirmNewPass}
                className="w-full bg-c_212020 rounded text-base outline-none text-c_FFFFFFCC placeholder:text-c_595959 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <Button
              className="text-white text-lg capitalize bg-c_BF642B border-0 py-2 px-6 mb-8 mt-4 rounded"
              onClick={handleChangePasswordOnClick}
              label={labels.resetPassword}
            ></Button>

            <p className="text-base text-c_595959 mt-3">
              <span
                onClick={() => setSteps((prev) => prev - 1)}
                className="flex items-center justify-center gap-x-2 cursor-pointer capitalize text-base font-bold text-c_fff"
              >
                {`${labels.cancel}`}
              </span>
            </p>
          </div>

          <div className="md:col-span-1 w-full hidden md:block min-h-screen overflow-hidden">
            <img
              className="w-full max-h-screen object-fill"
              src="/images/login-background.png"
              alt="SoloWayloginImage"
            />
          </div>
        </div>
      ) : (
        <div className="container-fluid mx-auto grid md:grid-cols-2 min-h-screen">
          <div className="bg-c_1B1B1B col-span-1 flex flex-col justify-center w-full min-h-screen pl-4 md:pl-16 pr-4 md:pr-16">
            <img
              className="w-[70px] h-16"
              src="/images/successTick.PNG"
              alt="LockImage"
            />
            <h2 className="text-c_fff text-2xl mt-8 font-medium">
              {`${labels.success}!`}
            </h2>
            <p className="text-base mb-12 mt-2 text-c_fff">
              {labels.yourPasswordhasBeenReset}
            </p>

            <button
              onClick={() => {
                navigate("/");
              }}
              className="text-white text-lg capitalize bg-c_BF642B border-0 py-2 px-6 mb-8 rounded"
            >
              {labels.backToLogin}
            </button>
          </div>

          <div className="md:col-span-1 w-full hidden md:block min-h-screen overflow-hidden">
            <img
              className="w-full max-h-screen object-fill"
              src="/images/login-background.png"
              alt="SoloWayloginImage"
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ForgetPassword;
