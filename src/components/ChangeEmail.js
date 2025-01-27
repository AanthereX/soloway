import React, { useState, useCallback } from "react";
import { labels } from "../configs/Labels";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  validateText,
  validateEmailAddress,
  checkInternetConnection,
  validateOnlySpace,
} from "../utils/validate";
import { changeEmailRequest } from "../store/actions";
import PasswordInput from "./PasswordInput";

const ChangeEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.User?.changeemail);
  const [fieldsEditable, setFieldsEditable] = useState(false);
  const [disableFields, setDisableFields] = useState(true);
  const token = localStorage.getItem("token");

  const handleEditClick = () => {
    setFieldsEditable(!fieldsEditable);
    setDisableFields(!disableFields);
  };

  const [values, setValues] = useState({
    newEmail: "",
    oldPassword: "",
  });
  const [errors, setErrors] = useState({
    newEmail: null,
    oldPassword: null,
  });

  const handleChangeEmail = useCallback(() => {
    if (!values?.newEmail) {
      const textError = validateText(values?.newEmail);
      setErrors((prevState) => ({
        ...prevState,
        newEmail: textError,
      }));
    }
    if (values?.newEmail) {
      const emailError = validateEmailAddress(values?.newEmail);
      setErrors((prevState) => ({
        ...prevState,
        newEmail: emailError,
      }));
      if (emailError) return;
    }
    if (!values?.oldPassword) {
      const textError = validateText(values?.oldPassword);
      setErrors((prevState) => ({
        ...prevState,
        oldPassword: textError,
      }));
    }
    if (values?.oldPassword) {
      const textError = validateOnlySpace(values?.oldPassword);
      setErrors((...prevState) => ({
        ...prevState,
        oldPassword: textError,
      }));
      if (textError) return;
    }
    if (values?.oldPassword && values?.newEmail) {
      if (Boolean(checkInternetConnection())) {
        const params = {
          password: values?.oldPassword,
          newEmail: values?.newEmail,
        };
        localStorage.setItem("newEmail", values?.newEmail);
        dispatch(
          changeEmailRequest(
            params,
            navigate,
            setDisableFields,
            setFieldsEditable
          )
        );
      }
    }
  }, [values, setErrors, dispatch, navigate]);

  return (
    <div className="grid grid-cols-6 gap-y-4 py-8">
      <div className="col-span-6 rounded-md py-4 px-5 bg-c_1F1F1F">
        <div className="relative flex items-center justify-between pb-2">
          <p>{labels.changeEmail}</p>
          <button
            className={`flex items-center justify-between gap-x-1 text-c_fff/70 bg-c_1F1F1F ${
              fieldsEditable
                ? "border border-c_BF642B/50"
                : "border border-c_fff/10"
            } rounded-md py-1 px-4`}
            onClick={handleEditClick}
          >
            <img
              src="/images/editIcon.svg"
              alt="editIcon"
              className="h-5 w-5"
            />
            {labels.edit}
          </button>
        </div>

        <div className="grid grid-cols-4 my-3.5">
          <div className="flex flex-col gap-y-4 col-span-4 md:col-span-2 mb-4 md:pr-4">
            <div className="relative flex flex-col gap-y-4 col-span-2">
              <Input
                disabled={disableFields}
                id="newEmail"
                name="newEmail"
                onChange={(e) => {
                  setErrors((prevState) => ({
                    ...prevState,
                    newEmail: null,
                  }));
                  setValues((prevState) => ({
                    ...prevState,
                    newEmail: e.target.value,
                  }));
                }}
                error={errors.newEmail}
                errorText={errors.newEmail}
                placeholder={labels.newEmail}
                className="w-full bg-transparent rounded-[6px] text-base outline-none border border-c_fff/30 text-c_fff placeholder:text-c_fff/30 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-4 col-span-4 md:col-span-2">
            <div className="relative flex flex-col gap-y-4 col-span-2">
              <PasswordInput
                disabled={disableFields}
                id="oldPassword"
                name="oldPassword"
                onChange={(e) => {
                  setErrors((prevState) => ({
                    ...prevState,
                    oldPassword: null,
                  }));
                  setValues((prevState) => ({
                    ...prevState,
                    oldPassword: e.target.value,
                  }));
                }}
                error={errors.oldPassword}
                errorText={errors.oldPassword}
                placeholder={labels.oldPassword}
                className="w-full bg-transparent rounded-[6px] text-base outline-none border border-c_fff/30 text-c_fff/30 placeholder:text-c_fff/30 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-4 col-span-4 md:col-span-2 md:my-0 my-4">
            <div className="relative flex flex-col gap-y-4 col-span-2">
              <Button
                onClick={handleChangeEmail}
                loading={loading}
                className={`${
                  fieldsEditable
                    ? "cursor-pointer"
                    : "bg-c_BF642B/60 cursor-default"
                } flex w-fit items-center gap-x-2 text-white text-sm md:text-base capitalize bg-c_BF642B border-0 py-1.5 px-3 md:px-6 rounded`}
                label={labels.changeEmail}
                disabled={fieldsEditable ? false : true}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmail;
