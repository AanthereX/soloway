import React, { useCallback, useState, useEffect } from "react";
import { labels } from "../configs/Labels";
import { AiOutlineGoogle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { signInAction, socialLoginAction } from "../store/actions";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { fetchTokenValue } from "../firebase_setup/firebase";
import {
  checkInternetConnection,
  validateEmailAddress,
  validateText,
} from "../utils/validate";
import PasswordInput from "../components/PasswordInput";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.User.user);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: "",
    password: "",
    fcmToken: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  // const handleFetch = async () => {
  //   const token = await fetchTokenValue();
  //   setValues((prev) => ({
  //       ...prev,
  //       fcmToken: token,
  //   }));
  //   localStorage.setItem('fcmToken', token)
  // };

  // useEffect(() => {
  //   handleFetch()
  // }, [])

  const handleSignin = useCallback(
    (e) => {
      e?.preventDefault();
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
      if (
        values.email &&
        validateEmailAddress(values.email) === null &&
        values.password
      ) {
        if (Boolean(checkInternetConnection())) {
          const params = {
            email: values.email,
            password: values.password,
          };
          dispatch(signInAction(params, navigate));
          localStorage.setItem("email", values?.email);
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
        <div className=" bg-c_1B1B1B col-span-1 justify-center flex flex-col w-full min-h-screen md:pt-16 md:pb-0 pt-8 pb-16 pl-4 md:pl-16 pr-4 md:pr-16">
          <img className="w-12 h-12" src="/images/logo.PNG" alt="SoloWayLogo" />
          <h2 className="text-c_fff text-2xl mt-8 font-medium">
            {`${labels.welcomeBack}!`}
          </h2>
          <p className="text-base mb-5 leading-relaxed text-c_FFFFFFCC">
            {labels.PleaseEnterYourDetails}
          </p>
          <form>
            <div className="relative mb-4">
              <Input
                placeholder={labels.email}
                type={"email"}
                value={values.email}
                id="email"
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
                className="w-full bg-c_212020 rounded text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative">
              <PasswordInput
                value={values.password}
                id="password"
                name="password"
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
            <p
              onClick={() => navigate("/forgot-password")}
              className="cursor-pointer w-fit text-base text-orange-500/75 mt-3"
            >
              {labels.forgetPassword}
            </p>

            <Button
              type="submit"
              className="text-c_fff text-lg capitalize bg-c_BF642B border-0 py-2 px-6 my-8 rounded w-full"
              label={labels.login}
              onClick={handleSignin}
              loading={loading}
              disabled={loading}
            ></Button>
          </form>
          {/* <div className="relative">
            <p className="ContinueWith text-base text-center text-c_FFFFFFCC mt-3">
              {labels.orContinueWith}
            </p>
          </div> */}

          {/* <div className="flex items-center justify-center gap-x-4 my-4">
            <div className="flex-1 py-2 border border-c_595959 rounded-md cursor-pointer" onClick={handleGoogleLogin}>
              <AiOutlineGoogle className="mx-auto text-c_fff text-xl" />
            </div> */}
          {/* <div className="flex-1 py-2 border border-c_595959 rounded-md cursor-pointer">
              <AiFillApple className="mx-auto text-c_fff text-xl" />
            </div>
            <div className="flex-1 py-2 border border-c_595959 rounded-md cursor-pointer">
              <FaFacebookF className="mx-auto text-c_fff text-xl" />
            </div> */}
          {/* </div> */}

          {/* <p className="text-base text-c_FFFFFFCC mt-3">
            {`${labels.dontHaveAnAccount} `}
            <span
              onClick={() => navigate("/signup")}
              className="cursor-pointer capitalize text-base font-bold text-c_FFFFFFCC"
            >{`${labels.SignUp}`}</span>
          </p> */}
        </div>

        <div className="md:col-span-1 w-full hidden md:block min-h-screen overflow-hidden">
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

export default Login;
