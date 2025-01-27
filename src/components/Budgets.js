import React, { useCallback, useEffect, useRef, useState } from "react";
import { labels } from "../configs/Labels";
import SearchBar from "./SearchBar";
import {
  addBudgetApiMethod,
  addImageAttachmentApiMethod,
  deleteBudgetApiMethod,
  projectBudgetApiMethod,
} from "../store/actions/projectActions";
import { useParams } from "react-router";
import moment from "moment";
import NoDataAvailable from "./NoDataAvailable";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "./Pagination";
import Button from "./Button";
import { FiPlus } from "react-icons/fi";
import Input from "./Input";
import CustomSelect from "./CustomSelect";
import {
  colourStyles,
  fileOptions,
  isValidURL,
  validateText,
} from "../utils/validate";
import TextArea from "./TextArea";
import { useDispatch } from "react-redux";
import DeleteModal from "./DeleteModal";
import { changeStatus } from "../store/actions";

const Budgets = ({ role }) => {
  const [budgets, setBudgets] = useState([]);
  const [page, setPage] = useState(1);
  const [apiHit, setApiHit] = useState(false);
  const [search, setSearch] = useState("");
  const [budgetCount, setBudgetCount] = useState("");
  const [budgetId, setBudgetId] = useState("");
  const [docFile, setDocFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteBudget, setDeleteBudget] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const dateFormat = JSON.parse(localStorage.getItem("detail"))?.dateFormat;
  const dispatch = useDispatch();
  const params = useParams();
  const fileRef = useRef();
  const plusIcon = <FiPlus />;

  const [budgetValues, setBudgetValues] = useState({
    budgetDescription: "",
    budgetAmount: "",
    measurement: "",
    fileName: "",
    docType: "",
    url: "",
    file: null,
  });
  const [errors, setErrors] = useState({
    budgetDescription: null,
    budgetAmount: null,
    measurement: null,
    fileName: null,
    docType: null,
  });

  useEffect(() => {
    handleBudget();
  }, [page]);

  useEffect(() => {
    const getData = setTimeout(() => {
      projectBudgetApiMethod(
        params?.id,
        { page: 1, ...(search ? { search } : {}) },
        (res) => {
          setApiHit(true);
          setBudgets(res?.budget);
          setBudgetCount(res?.total);
        }
      );
    }, 1000);
    return () => clearTimeout(getData);
  }, [search]);

  const handleBudget = () => {
    setLoading(true);
    projectBudgetApiMethod(params?.id, { page }, (res) => {
      setApiHit(true);
      setBudgetCount(res?.total);
      setBudgets(res?.budget);
      setLoading(false);
    });
  };
  const handleUpload = () => {
    fileRef?.current?.click();
  };
  const deleteBudgetFunc = () => {
    setLoading(true);
    deleteBudgetApiMethod(budgetId, async () => {
      setLoading(false);
      await setDeleteBudget(false);
      await handleBudget();
    });
  };
  const handleChangeStatusApprove = useCallback(
    (budgetId, statusApprove) => {
      setLoading(true);
      changeStatus(
        budgetId,
        { clientId: user?.id, status: statusApprove },
        () => {
          setLoading(false);
          handleBudget();
        }
      );
    },
    [setLoading]
  );

  const handleChangeStatusDeny = useCallback(
    (budgetId, statusDeny) => {
      setLoading(true);
      changeStatus(budgetId, { clientId: user?.id, status: statusDeny }, () => {
        setLoading(false);
        handleBudget();
      });
    },
    [setLoading]
  );

  const handleDocFile = (e) => {
    setFileLoading(true);
    setBudgetValues((prevState) => ({
      ...prevState,
      file: e.target.files[0],
    }));
    const formData = new FormData();
    formData?.append("file", e.target.files[0]);
    addImageAttachmentApiMethod(formData, (res) => {
      setFileLoading(false);
      setDocFile(res?.data?.data);
    });
  };
  const addBudgetFunc = useCallback(async () => {
    if (!budgetValues.budgetDescription) {
      const textError = validateText(budgetValues.budgetDescription);
      setErrors((prevState) => ({
        ...prevState,
        budgetDescription: textError,
      }));
    }
    if (!budgetValues.budgetAmount) {
      const textError = validateText(budgetValues.budgetAmount);
      setErrors((prevState) => ({
        ...prevState,
        budgetAmount: textError,
      }));
    }
    if (!budgetValues.docType) {
      const textError = validateText(budgetValues.docType);
      setErrors((prevState) => ({
        ...prevState,
        docType: textError,
      }));
    }

    if (budgetValues?.budgetDescription && budgetValues?.budgetAmount) {
      let payload = {
        description: budgetValues.budgetDescription,
        amount: budgetValues.budgetAmount,
        attachment: docFile,
        projectId: params?.id,
        measurement: budgetValues?.measurement,
      };
      if (budgetValues?.docType?.id === "url") {
        payload = { ...payload, ...{ url: budgetValues?.url } };
      } else {
        payload = { ...payload, ...{ attachment: docFile } };
      }
      // console.log(payload, "payload");
      // return;
      await dispatch(
        addBudgetApiMethod(
          payload,
          () => {
            setShowAddBudgetModal(false);
            handleBudget();
            setBudgetValues({});
          },
          setLoading
        )
      );
    }
  }, [dispatch, budgetValues, setErrors, docFile]);
  return (
    <div className="rounded-[8px] bg-[#FFFFFF12] w-full py-6 px-4 my-6">
      <div className="flex flex-wrap items-center justify-between md:gap-y-0 gap-y-2">
        <div className="flex gap-x-3 text-[20px] text-c_fff/90">
          <p className="md:text-[18px] text-[16px]">{labels.budgets}</p>{" "}
          <div className="flex justify-center items-center px-2 md:px-2 md:w-8 w-8 h-8 my-auto bg-c_fff/10 rounded-md">
            <span className=" text-c_fff text-[12px]">{budgets?.length}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-start md:justify-start md:pl-4 pl-0 md:gap-x-4 gap-y-3">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {role === "client" || role === "contributor" ? null : (
            <Button
              onClick={() => setShowAddBudgetModal(true)}
              icon={plusIcon}
              label={labels.addNew}
              className={`flex items-center md:gap-x-2 gap-x-1 text-c_fff text-sm md:text-[14px] capitalize bg-c_212121 border border-c_fff/30 py-1.5 md:py-2 px-3 md:px-3 rounded`}
            ></Button>
          )}
        </div>
      </div>
      <>
        {loading ? (
          <div className="min-h-screen flex justify-center items-center">
            <ClipLoader className="spinner-css" color={"#BF642B"} />
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full mt-8">
              <thead>
                <tr>
                  <th className="py-3.5 p-4 pl-4 pr-4 text-left text-sm capitalize text-white sm:pl-0">
                    <div className="flex items-center gap-x-4 md:pl-4 pl-0">
                      <p className="font-semibold text-[12px] text-c_fff">
                        {labels.description}
                      </p>
                    </div>
                  </th>
                  <th className="py-3.5 pr-4 text-left text-sm capitalize text-white">
                    <div className="flex items-center gap-x-4">
                      <p className="font-semibold text-[12px] text-c_fff">
                        {labels.attachment}
                      </p>
                    </div>
                  </th>
                  <th className="py-3.5 pr-4 text-left text-sm capitalize text-white">
                    <div className="flex items-center justify-center gap-x-4">
                      <p className="font-semibold text-[12px] text-c_fff">
                        {labels.status}
                      </p>
                    </div>
                  </th>
                  <th className="py-3.5 pr-4 text-left text-sm capitalize text-white">
                    <div className="flex items-center gap-x-4">
                      <p className="font-semibold text-[12px] text-c_fff">
                        {labels.amount}
                      </p>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 pr-4 text-left text-sm capitalize text-white"
                  >
                    <div className="flex items-center gap-x-4">
                      <p className="font-semibold text-[12px] text-c_fff">
                        {labels.asOf}
                      </p>
                    </div>
                  </th>
                  <th className="py-3.5 pr-4 text-center text-sm capitalize text-white">
                    <p className="font-semibold text-[12px] text-c_fff">
                      {labels.actions}
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                {budgets?.map((item) => (
                  <React.Fragment>
                    <tr
                      className="odd:bg-c_fff/5 even:bg-transparent rounded-md cursor-pointer overflow-x-auto"
                      key={item?.id}
                    >
                      <td className="w-3/6 py-4 gap-x-3 my-4 pl-4 text-base font-normal text-c_fff !rounded-tl-md !rounded-bl-md">
                        {item?.description}
                      </td>
                      <td className="py-4 gap-x-3 my-4 text-base font-normal text-c_fff">
                        {item?.attachment?.[0]?.attachment ||
                        item?.attachment?.[0]?.url ? (
                          <a
                            target="_blank"
                            href={
                              item?.attachment?.[0]?.attachment ||
                              item?.attachment?.[0]?.url
                            }
                          >
                            {" "}
                            <Button
                              label={labels.attachment}
                              className="text-c_fff border text-sm border-c_BF642B p-2 rounded-md"
                            ></Button>
                          </a>
                        ) : null}
                      </td>
                      <td className="w-1/5 py-4 text-sm text-c_fff text-center capitalize">
                        {item?.status}
                      </td>
                      <td className="w-1/5 py-4 text-sm text-c_fff">{`${
                        item?.amount
                      } ${
                       [null,""].includes(item?.measurement) ? "" : item?.measurement
                      }`}</td>

                      <td
                        style={{ minWidth: "6rem" }}
                        className="w-1/5  text-[13px] text-c_fff/80 font-normal !rounded-tr-md !rounded-br-md"
                      >
                        {moment.utc(item?.createdAt)?.format(
                          dateFormat || "YYYY/MM/DD"
                        )}
                      </td>
                      {role === "admin" && item?.status === "pending" ? (
                        <td className="px-3 md:px-0 text-sm !rounded-tr-md !rounded-br-md">
                          <div className="flex items-end justify-center">
                            <img
                              onClick={() => {
                                setBudgetId(item?.id);
                                setDeleteBudget(true);
                              }}
                              src="/images/deleteIcon.svg"
                              alt="deleteIcon"
                              className="w-6 h-6 cursor-pointer text-c_fff/10"
                            />
                          </div>
                        </td>
                      ) : role === "client" && item?.status === "pending" ? (
                        <div className="flex items-center justify-center py-5 gap-x-4 mr-4 px-2 md:px-0 col-span-2">
                          <Button
                            label={labels.deny}
                            onClick={() =>
                              handleChangeStatusDeny(item?.id, "denied")
                            }
                            // disabled={!item?.isActive ? true : false}
                            className={`${
                              !item?.isActive ? "opacity-80" : "opacity-100"
                            } text-c_FF5C5A cursor-pointer bg-c_101010 px-4 py-1 rounded-[8px] text-sm font-normal capitalize`}
                          />
                          <Button
                            label={labels.approve}
                            onClick={() =>
                              handleChangeStatusApprove(item?.id, "approved")
                            }
                            // disabled={!item?.data?.isActive ? true : false}
                            className={`${
                              !item?.isActive ? "opacity-80" : "opacity-100"
                            } text-c_0AA81A cursor-pointer bg-c_101010 px-4 py-1 rounded-[8px] text-sm font-normal capitalize`}
                          />
                        </div>
                      ) : (
                        <td className="px-3 md:px-0 text-sm !rounded-tr-md !rounded-br-md"></td>
                      )}
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
      <Pagination
        pageCount={Math.ceil(budgetCount) / 10}
        onPageChange={(event) => {
          setPage(event?.selected + 1);
        }}
      />

      {showAddBudgetModal && (
        <div className="relative">
          <div className="fixed inset bg-c_000/50 bg-opacity-75 transition-opacity z-9"></div>
          <div className="fixed inset-0 overflow-hidden z-9">
            <div className="absolute inset-0 overflow-hidden z-99">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto relative w-screen max-w-md">
                  <div className="flex min-h-screen flex-col overflow-y-hidden bg-c_272727 py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <h2
                        className="text-lg font-thin leading-6 text-c_fff"
                        id="slide-over-title"
                      >
                        {labels.addNewBudget}
                      </h2>
                    </div>
                    <div className="relative mt-3 flex-1 px-4 sm:px-6">
                      {/* content */}
                      <div className="flex flex-col">
                        <div>
                          <div className="mt-1">
                            <label className="text-sm text-c_B2B2B2">
                              {labels.budgetAmount}
                            </label>
                            <Input
                              placeholder="$"
                              value={budgetValues?.budgetAmount}
                              type="text"
                              id="budgetAmount"
                              name="budgetAmount"
                              min="0"
                              className="w-full bg-c_272727 mb-3 rounded-lg outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              error={errors.budgetAmount}
                              errorText={errors.budgetAmount}
                              onChange={(e) => {
                                setErrors((prevState) => ({
                                  ...prevState,
                                  budgetAmount: null,
                                }));
                                setBudgetValues((prevState) => ({
                                  ...prevState,
                                  budgetAmount: e.target.value,
                                }));
                              }}
                            />
                          </div>
                          <div className="mt-1">
                            <label className="text-sm text-c_B2B2B2">
                              {labels.measure}
                            </label>
                            <Input
                              placeholder="$700.00 per square foot"
                              value={budgetValues?.measurement}
                              type="text"
                              id="measurement"
                              name="measurement"
                              className="w-full bg-c_272727 mb-3  rounded-lg outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 placeholder:lowercase py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              onChange={(e) => {
                                setBudgetValues((prevState) => ({
                                  ...prevState,
                                  measurement: e.target.value,
                                }));
                              }}
                            />
                          </div>
                          <label className="text-sm text-c_B2B2B2">
                            {labels.budgetDescription}
                          </label>
                          <TextArea
                            className="w-full bg-c_272727 mt-1 rounded-lg text-white outline-none border border-c_595959  placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            placeholder={labels.description}
                            type="textarea"
                            id="budgetDescription"
                            name="budgetDescription"
                            value={budgetValues?.budgetDescription}
                            error={errors.budgetDescription}
                            errorText={errors.budgetDescription}
                            onChange={(e) => {
                              setErrors((prevState) => ({
                                ...prevState,
                                budgetDescription: null,
                              }));
                              setBudgetValues((prevState) => ({
                                ...prevState,
                                budgetDescription: e.target.value,
                              }));
                            }}
                          />
                        </div>

                        <div className="mt-1">
                          <label className="text-sm text-c_B2B2B2">
                            {labels.addFileAttachment}
                          </label>
                          <CustomSelect
                            className="basic-select mb-1 bg-c_272727"
                            styles={colourStyles}
                            options={fileOptions}
                            value={budgetValues?.docType}
                            placeholder={labels.documentType}
                            onChange={(e) => {
                              setBudgetValues((prevState) => ({
                                ...prevState,
                                docType: e,
                              }));
                            }}
                          />
                        </div>
                        {budgetValues?.docType?.label === "url" ? (
                          <div className="mt-4">
                            <Input
                              placeholder={labels.url}
                              type="url"
                              id="url"
                              name="url"
                              value={budgetValues?.url}
                              className={`w-full bg-c_212121 rounded-lg text-base outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${
                                !isValidURL(budgetValues?.url) &&
                                "border border-red-600"
                              }`}
                              onChange={(e) => {
                                setBudgetValues((prevState) => ({
                                  ...prevState,
                                  url: e.target.value,
                                }));
                              }}
                            />
                            {budgetValues?.url?.length !== 0 &&
                              !isValidURL(budgetValues?.url) && (
                                <span className="text-red-500 text-xs block">
                                  {labels.invalidURL}
                                </span>
                              )}
                          </div>
                        ) : (
                          <div className="relative" onClick={handleUpload}>
                            <div className="absolute  cursor-pointer top-4 left-0 w-full h-[7rem] bg-c_fff/5 rounded-lg z-9 flex flex-col items-center justify-center">
                              <img
                                src="/images/uploadFile.svg"
                                alt="uploadIcon"
                                className="w-6 h-6"
                              />
                              <p className="text-base text-c_fff font-bold">
                                {labels.addNewFile}
                              </p>
                              <p className="text-[10px] text-c_fff/80 font-medium">
                                {labels.fileType}
                              </p>
                              <p className="text-[12px] text-white font-medium mt-4">
                                {fileLoading
                                  ? "Loading..."
                                  : budgetValues?.file?.name}
                              </p>
                            </div>
                            <Input
                              type="file"
                              name="file"
                              ref={fileRef}
                              accept=".pdf,.doc,.jpg,.docx,.jpeg,video/mp4,video/mov"
                              onChange={(e) => handleDocFile(e)}
                              className="w-full h-40 absolute  cursor-pointer hidden top-4 left-0 bg-c_fff/5 rounded-lg opacity-0 z-99"
                            />
                          </div>
                        )}

                        <div className="w-full flex items-center justify-between  absolute left-0 px-6 bottom-0 ">
                          <Button
                            onClick={() => {
                              setShowAddBudgetModal(false);
                            }}
                            className="flex items-center gap-x-2 text-white text-base capitalize bg-transparent border border-c_595959 py-1 px-3 rounded"
                            label={labels.cancel}
                          ></Button>
                          <Button
                            onClick={addBudgetFunc}
                            label={labels.add}
                            disabled={
                              loading ||
                              fileLoading ||
                              errors?.budgetAmount?.length
                            }
                            className="flex items-center gap-x-2 text-white text-base capitalize bg-c_BF642B border-0 py-1 px-4 rounded"
                          ></Button>
                        </div>
                      </div>
                      {/* content ends */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-8">
        {apiHit && budgets?.length <= 0 ? (
          <NoDataAvailable entity={labels.budgets} />
        ) : (
          <></>
        )}
      </div>
      <DeleteModal
        open={deleteBudget}
        setOpen={() => setDeleteBudget(!deleteBudget)}
        onClick={deleteBudgetFunc}
        loading={loading}
      />
    </div>
  );
};

export default Budgets;
