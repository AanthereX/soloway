import React, { useCallback, useState } from "react";
import { labels } from "../configs/Labels";
import { AiFillApple, AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction, socialLoginAction } from "../store/actions";
import {
  checkInternetConnection,
  validateEmailAddress,
  validateLength,
  validateOnlySpace,
  validateText,
} from "../utils/validate";
import PasswordInput from "../components/PasswordInput";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.User.signup);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: null,
    userName: "",
    email: null,
    password: null,
  });

  const handleSignup = useCallback(
    async (e) => {
      e?.preventDefault();
      if (!values.name) {
        const textError = validateText(values.name);
        setErrors((prevState) => ({
          ...prevState,
          name: textError,
        }));
      }
      if (values.name) {
        const textError = validateLength(values.name);
        setErrors((prevState) => ({
          ...prevState,
          name: textError,
        }));
        if (textError) return;
      }
      if (values.name) {
        const textError = validateOnlySpace(values.name);
        setErrors((prevState) => ({
          ...prevState,
          name: textError,
        }));
        if (textError) return;
      }
      if (!values.userName) {
        const textError = validateText(values.userName);
        setErrors((prevState) => ({
          ...prevState,
          userName: textError,
        }));
      }
      if (values.userName) {
        const textError = validateLength(values.userName);
        setErrors((prevState) => ({
          ...prevState,
          userName: textError,
        }));
        if (textError) return;
      }
      if (values.userName) {
        const textError = validateOnlySpace(values.userName);
        setErrors((prevState) => ({
          ...prevState,
          userName: textError,
        }));
        if (textError) return;
      }
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
      if (!values.password) {
        const textError = validateText(values.password);
        setErrors((prevState) => ({
          ...prevState,
          password: textError,
        }));
      }
      if (values.password) {
        const textError = validateOnlySpace(values.password);
        setErrors((prevState) => ({
          ...prevState,
          password: textError,
        }));
        if (textError) return;
      }
      if (values.password) {
        const textError = validateLength(values.password);
        setErrors((prevState) => ({
          ...prevState,
          password: textError,
        }));
        if (textError) return;
      }
      if (
        values.name &&
        values.userName &&
        values.email &&
        validateEmailAddress(values.email) === null &&
        values.password
      ) {
        if (Boolean(checkInternetConnection())) {
          const params = {
            name: values.name,
            userName: values.userName,
            email: values.email,
            password: values.password,
          };
          dispatch(signUpAction(params, navigate));
        }
      }
    },
    [values, setErrors, dispatch]
  );

  // const handleGoogleLogin = async () => {
  //   const provider = await new GoogleAuthProvider();
  //   const auth = getAuth();
  //   signInWithPopup(auth, provider)
  //     .then(async (res) => {
  //       const response = await res?._tokenResponse;
  //       if (response?.localId) {
  //         const payload = {
  //           socialId: response?.localId,
  //           type: "google",
  //           email: response?.email,
  //           fullName: response?.fullName,
  //           image: response?.photoUrl,
  //         };
  //         dispatch(
  //           socialLoginAction(payload, async () => {
  //             await navigate("/project");
  //           })
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       const msg = err.message.replace(`(${err.code}).`, "");
  //       toast.error(msg.replace("Firebase: ", ""));
  //     });
  // };

  return (
    <React.Fragment>
      <div className="container-fluid mx-auto grid md:grid-cols-2 min-h-screen">
        <div className="bg-c_1B1B1B col-span-1 justify-center flex flex-col w-full md:pt-16 md:pb-0 pt-8 pb-16 pl-4 md:pl-16 pr-4 md:pr-16">
          <img className="w-12 h-12" src="/images/logo.PNG" alt="SoloWayLogo" />
          <h2 className="text-c_fff text-2xl mt-8 font-medium">
            {`${labels.createYourAccount}.`}
          </h2>
          <p className="text-base mb-5 leading-relaxed text-c_FFFFFFCC">
            {labels.pleaseenteryourdetails}
          </p>
          <form>
            <div className="relative mb-4">
              <Input
                placeholder={labels.name}
                type={"text"}
                name="name"
                value={values?.name}
                id="name"
                onChange={(e) => {
                  setErrors((prevState) => ({
                    ...prevState,
                    name: null,
                  }));
                  setValues((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }));
                }}
                error={errors.name}
                errorText={errors.name}
                className="w-full bg-c_212020 rounded text-base outline-none text-c_fff py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <Input
                placeholder={labels.userName}
                type={"text"}
                name="userName"
                value={values?.userName}
                id="userName"
                onChange={(e) => {
                  setErrors((prevState) => ({
                    ...prevState,
                    userName: null,
                  }));
                  setValues((prevState) => ({
                    ...prevState,
                    userName: e.target.value,
                  }));
                }}
                error={errors.userName}
                errorText={errors.userName}
                className="w-full bg-c_212020 rounded text-base outline-none text-c_fff py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <Input
                placeholder={labels.email}
                type={"email"}
                name="email"
                value={values?.email}
                id="email"
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
                className="w-full bg-c_212020 rounded text-base outline-none text-c_fff py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative">
              <PasswordInput
                name="password"
                value={values?.password}
                id="password"
                placeholder={labels.password}
                onChange={(e) => {
                  setErrors((prevState) => ({
                    ...prevState,
                    password: null,
                  }));
                  setValues((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }));
                }}
                error={errors.password}
                errorText={errors.password}
              />
            </div>

            <Button
              className="w-full text-c_fff text-lg capitalize bg-c_BF642B border-0 py-2 px-6 my-8 rounded"
              label={labels.SignUp}
              onClick={handleSignup}
              loading={loading}
              disabled={loading}
              type="submit"
            ></Button>
          </form>
          {/* <div className="relative">
            <p className="ContinueWith text-base text-center text-c_FFFFFFCC mt-3">
              {labels.orContinueWith}
            </p>
          </div> */}

          {/* <div className="flex items-center justify-center gap-x-4 my-4">
            <div
              className="flex-1 py-2 border border-c_595959 rounded-md cursor-pointer"
              onClick={handleGoogleLogin}
            >
              <AiOutlineGoogle className="mx-auto text-c_fff text-xl" />
            </div> */}
          {/* <div className="flex-1 py-2 border border-c_595959 rounded-md cursor-pointer">
              <AiFillApple className="mx-auto text-c_fff text-xl" />
            </div> */}
          {/* <div className="flex-1 py-2 border border-c_595959 rounded-md cursor-pointer">
              <FaFacebookF className="mx-auto text-c_fff text-xl" />
            </div> */}
          {/* </div> */}

          <p className="text-base text-c_FFFFFFCC mt-3">
            {`${labels.alreadyhaveaccount} `}
            <span
              onClick={() => navigate("/")}
              className="cursor-pointer capitalize text-base font-bold text-c_FFFFFFCC"
            >{`${labels.signIn}.`}</span>
          </p>
        </div>

        <div className="col-span-1 w-full min-h-screen overflow-hidden hidden md:block">
          <img
            className="w-full max-h-screen object-fill"
            src="/images/login-background.png"
            alt="SoloWayloginImage"
            draggable={false}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;
