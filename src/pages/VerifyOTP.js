import React, { useCallback, useEffect, useRef, useState } from "react";
import { labels } from "../configs/Labels";
import Input from "../components/Input";
import Button from "../components/Button";
import {
  checkInternetConnection,
  validateEmailAddress,
  validateText,
} from "../utils/validate";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import {
  resendOtpVerify,
  verifyOtpIfNotVerified,
  verifyOtpOnNewEmail,
  userSignUpAction,
  userProfileAction,
} from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.User.verify);
  const navigate = useNavigate();
  const userDataSignUp = useSelector((state) => state.User.signup);
  const userDataSignIn = useSelector((state) => state.User.user);
  const newEmail = localStorage.getItem("newEmail");

  const inputRefs = useRef([]);
  const [errors, setErrors] = useState({
    otp: null,
  });

  useEffect(() => {
    handleFetchSignIn();
  }, [userDataSignUp?.payload]);

  useEffect(() => {
    handleFetchSignUp();
  }, [userDataSignUp?.payload]);

  const resendOTP = useCallback(async () => {
    if (!otp) {
      const textError = validateText(otp);
      setErrors((prevState) => ({
        ...prevState,
        otp: textError,
      }));
    }
    if (otp) {
      const params = {
        email: userDataSignUp?.payload?.data?.email,
        code: Number(otp),
      };
      dispatch(resendOtpVerify(params, setOtp, setErrors));
    }
  }, [userDataSignUp, otp, setErrors, dispatch]);

  const verifyOTP = useCallback(async () => {
    if (!otp) {
      const textError = validateText(otp);
      setErrors((prevState) => ({
        ...prevState,
        otp: textError,
      }));
    }
    if (otp) {
      if (Boolean(checkInternetConnection())) {
        const params = {
          email: userDataSignUp?.payload?.data?.email,
          code: Number(otp),
        };
        dispatch(verifyOtpIfNotVerified(params, navigate));
      }
    }
  }, [userDataSignUp, otp, setErrors, dispatch]);

  const verifyOTPOnNewEmail = useCallback(async () => {
    if (newEmail) {
      if (!otp) {
        const textError = validateText(otp);
        setErrors((prevState) => ({
          ...prevState,
          otp: textError,
        }));
      }
      if (otp) {
        if (Boolean(checkInternetConnection())) {
          const params = {
            code: Number(otp),
            newEmail: newEmail,
          };
          dispatch(verifyOtpOnNewEmail(params));
        }
      }
    }
  }, [newEmail, otp, setErrors, dispatch]);

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

  const handleFetchSignUp = useCallback(() => {
    if (!userDataSignUp?.payload) {
      const data = JSON.parse(localStorage.getItem("userSignUp"));
      dispatch(userSignUpAction({ data }));
    }
  }, [userDataSignUp?.payload]);

  const handleFetchSignIn = useCallback(() => {
    if (!userDataSignIn?.payload) {
      const data = JSON.parse(localStorage.getItem("user"));
      dispatch(userProfileAction({ data }));
    }
  }, [userDataSignUp?.payload]);

  return (
    <React.Fragment>
      <div className="container-fluid mx-auto grid md:grid-cols-2 min-h-screen">
        <div className=" bg-c_1B1B1B col-span-1 flex flex-col justify-center items-left w-full h-screen pt-16 pb-16 pl-16 md:pl-20 pr-16 md:pr-32">
          <img
            className="w-[70px] h-16"
            src="/images/message.PNG"
            alt="LockImage"
          />
          <h2 className="text-c_fff text-2xl mt-8 font-medium">
            {`${labels.verifyemail}`}
          </h2>

          <p className="text-base mb-12 mt-2 text-c_FFFFFFCC">
            {labels.pleaseenterthecodesentto}
            <br></br>
            <span className="font-bold text-c_FFFFFFCC">
              {userDataSignUp?.payload?.data?.email || newEmail}
            </span>
          </p>

          <div className="relative mb-4 flex items-center justify-left gap-x-8">
            {/* {otp.map((item, index) => (
                <React.Fragment>
                  <Input
                    key={item}
                    type={"text"}
                    value={otp[index]}
                    id="name"
                    name="name"
                    maxLength={1}
                    onChange={(e) => {
                      handleInputChange(e, index)
                      setErrors((prevState) => ({
                        ...prevState,
                        otp: null,
                      }));
                    }}
                    error={errors.otp}
                    errorText={errors.otp}
                    ref={(el) => (inputRefs.current[index] = el)}
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
            onClick={newEmail ? verifyOTPOnNewEmail : verifyOTP}
            disabled={loading}
          ></Button>

          <p className="text-base text-c_FFFFFFCC mt-3">
            <span
              disabled={loading}
              onClick={resendOTP}
              className="flex w-fit mx-auto items-center justify-center gap-x-2 cursor-pointer capitalize text-base font-bold text-c_FFFFFFCC"
            >
              {`${labels.resendCode}`}
            </span>
          </p>
        </div>

        <div className=" bg-gray-300 col-span-1 w-full h-screen overflow-hidden flex">
          <img
            className="w-full min-h-full"
            src="/images/login-background.png"
            alt="SoloWayloginImage"
            draggable={false}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default VerifyOTP;
