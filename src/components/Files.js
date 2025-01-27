import React, { useCallback, useEffect, useRef, useState } from "react";
import { labels } from "../configs/Labels";
import Button from "./Button";
import { FiPlus } from "react-icons/fi";
import SearchBar from "./SearchBar";
import Input from "./Input";
import CustomSelect from "./CustomSelect";
import {
  colourStyles,
  fileOptions,
  isValidURL,
  validateText,
} from "../utils/validate";
import toast from "react-hot-toast";
import {
  addImageAttachmentApiMethod,
  allProjectFileApiMethod,
  createFileUploadApiMethod,
  deleteFileApiMethod,
} from "../store/actions/projectActions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import NoDataAvailable from "./NoDataAvailable";
import ClipLoader from "react-spinners/ClipLoader";
import MenuDropDown from "./Menu";
import { isMobile } from "react-device-detect";

const Files = () => {
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [apiHit, setApiHit] = useState(false);
  const [filesData, setFilesData] = useState([]);
  const [search, setSearch] = useState("");
  const [docFile, setDocFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const fileRef = useRef();
  const dispatch = useDispatch();
  const params = useParams();
  const plusIcon = <FiPlus />;
  const [fileValues, setFileValues] = useState({
    fileName: "",
    docType: "",
    url: "",
    file: null,
  });
  const [errors, setErrors] = useState({
    fileName: null,
    docType: null,
  });

  useEffect(() => {
    handleFiles();
  }, []);
  const handleFiles = () => {
    setLoading(true);
    allProjectFileApiMethod(params?.id, {}, (res) => {
      setLoading(false);
      setApiHit(true);
      setFilesData(res);
    });
  };
  useEffect(
    (e) => {
      const getData = setTimeout(() => {
        allProjectFileApiMethod(
          params?.id,
          { ...(search ? { search } : {}) },
          (res) => {
            setApiHit(true);
            setFilesData(res);
          }
        );
      }, 1000);
      return () => clearTimeout(getData);
    },
    [search]
  );
  // console.log(fileValues,"fileValues")

  const addFileFunc = useCallback(async () => {
    if (!fileValues.fileName) {
      const textError = validateText(fileValues.fileName);
      setErrors((prevState) => ({
        ...prevState,
        fileName: textError,
      }));
    }
    if (!fileValues.docType) {
      const textError = validateText(fileValues.docType);
      setErrors((prevState) => ({
        ...prevState,
        docType: textError,
      }));
    }
    if (!fileValues?.url) {
      if (!fileValues?.file) {
        toast.error("Please add file!");
      }
    }
    if (
      (fileValues?.fileName && fileValues?.docType && fileValues?.file) ||
      fileValues?.url
    ) {
      let payload = {
        fileName: fileValues.fileName,
        documentType: fileValues.docType?.id,
        projectId: params?.id,
        fileSize: fileValues?.file?.size ?? 0,
      };
      if (fileValues.docType?.id === "url")
        // eslint-disable-next-line nonblock-statement-body-position
        payload = { ...payload, ...{ fileUrl: fileValues?.url } };
      else payload = { ...payload, ...{ file: docFile } };
      // console.log(payload, "payload");
      // return;
      setLoading(true);
      await dispatch(
        createFileUploadApiMethod(
          payload,
          () => {
            handleFiles();
            setLoading(false);
            setShowAddFileModal(false);
            setFileValues({
              fileName: "",
              docType: "",
              url: "",
              file: null,
            });
          },
          setLoading
        )
      );
    }
  }, [fileValues, setErrors, dispatch, docFile, setFilesData]);
  // console.log(filesData)

  const handleUpload = () => {
    fileRef?.current?.click();
  };
  const handleDocFile = (e) => {
    setFileLoading(true);
    setFileValues((prevState) => ({
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
  const handleDeleteFile = (id) => {
    deleteFileApiMethod(id, async () => {
      await handleFiles();
    });
  };
  return (
    <div className="rounded-[8px] bg-[#FFFFFF12] w-full py-6 px-4 my-6">
      <div className="flex flex-wrap items-center justify-between md:gap-y-0 gap-y-2">
        <div className="flex items-center gap-x-3 text-[20px] text-c_fff/90">
          <p className="md:text-[18px] text-[16px]">{labels.linksAndFiles}</p>{" "}
          <div className="flex justify-center items-center px-2 md:px-2 md:w-8 w-8 h-8 my-auto bg-c_fff/10 rounded-md">
            <span className=" text-c_fff text-[12px]">{filesData?.length}</span>
          </div>
        </div>
        <div
          className={`flex flex-wrap items-center justify-start md:justify-start md:pl-4 pl-0 md:gap-x-4 gap-y-3`}
        >
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            onClick={() => setShowAddFileModal(true)}
            label={labels.addNew}
            icon={plusIcon}
            className={`flex items-center md:gap-x-2 gap-x-1 text-c_fff text-sm md:text-[14px] capitalize bg-c_212121 border border-c_fff/30 py-1.5 md:py-2 px-3 md:px-3 rounded`}
          />
        </div>
      </div>

      {/* slider sidebar to add new user */}
      {showAddFileModal && (
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
                        {labels.addNewFile}
                      </h2>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* content */}
                      <div className="flex flex-col">
                        <div className="">
                          <Input
                            placeholder={labels.fileName}
                            type="text"
                            id="fileName"
                            name="fileName"
                            value={fileValues?.fileName}
                            className="w-full bg-c_212121 rounded-lg text-base outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            onChange={(e) => {
                              setErrors((prevState) => ({
                                ...prevState,
                                fileName: null,
                              }));
                              setFileValues((prevState) => ({
                                ...prevState,
                                fileName: e.target.value,
                              }));
                            }}
                            error={errors.fileName}
                            errorText={errors.fileName}
                          />

                          <div className="mt-4">
                            <CustomSelect
                              className="basic-select mb-1 bg-c_212121"
                              styles={colourStyles}
                              options={fileOptions}
                              value={fileValues.docType}
                              placeholder={labels.documentType}
                              error={errors.docType}
                              errorText={errors.docType}
                              onChange={(e) => {
                                setErrors((prevState) => ({
                                  ...prevState,
                                  docType: null,
                                }));
                                setFileValues((prevState) => ({
                                  ...prevState,
                                  docType: e,
                                }));
                              }}
                            />
                          </div>
                          {fileValues?.docType?.label === "url" ? (
                            <div className="mt-4">
                              <Input
                                placeholder={labels.url}
                                type="url"
                                id="url"
                                name="url"
                                value={fileValues?.url}
                                className={`w-full bg-c_212121 rounded-lg text-base outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${
                                  !isValidURL(fileValues?.url) &&
                                  "border border-red-600"
                                }`}
                                onChange={(e) => {
                                  setFileValues((prevState) => ({
                                    ...prevState,
                                    url: e.target.value,
                                  }));
                                }}
                              />
                              {fileValues?.url?.length !== 0 &&
                                !isValidURL(fileValues?.url) && (
                                  <span className="text-red-500 text-xs block">
                                    {labels.invalidURL}
                                  </span>
                                )}
                            </div>
                          ) : (
                            <div className="relative" onClick={handleUpload}>
                              <div className="absolute  cursor-pointer top-4 left-0 w-full h-40 bg-c_fff/5 rounded-lg z-9 flex flex-col items-center justify-center">
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
                                    : fileValues?.file?.name}
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
                        </div>

                        <div className="w-full flex items-center justify-between absolute left-0 px-6 bottom-0 ">
                          <Button
                            onClick={() => {
                              setShowAddFileModal(false);
                            }}
                            className="flex items-center gap-x-2 text-white text-base capitalize bg-c_212121 border border-c_595959 py-1 px-3 rounded"
                            label={labels.cancel}
                          ></Button>
                          <Button
                            onClick={addFileFunc}
                            label={labels.add}
                            disabled={loading}
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
      {/* slider ends here */}
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <ClipLoader className="spinner-css" color={"#BF642B"} />
        </div>
      ) : (
        <div className="flex flex-wrap gap-x-1.5 mt-2">
          {filesData?.map((file) => (
            <React.Fragment>
              <div
                key={file?.id}
                className="rounded-[8px] bg-c_212121 md:w-48 w-full h-auto px-4 py-2 border border-[#4A4A4A] mt-4"
              >
                <MenuDropDown
                  options={[{ label: "Delete" }]}
                  onClick={() => handleDeleteFile(file?.id)}
                >
                  <div className="flex justify-end items-end ">
                    <button>
                      <img
                        src="/images/inlineDot.svg"
                        alt="dotInline"
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                </MenuDropDown>
                <div className="flex flex-col gap-y-2 items-center justify-center">
                  <a href={file?.fileUrl} target="_blank">
                    <img
                      src={
                        file?.fileType === "pdf"
                          ? "/images/pdfFileIcon.svg"
                          : file?.fileType === "jpeg"
                          ? "/images/jpeg.png"
                          : file?.fileType === "mov"
                          ? "/images/mov.png"
                          : file?.fileType === "doc"
                          ? "/images/docFileIcon.svg"
                          : file?.fileType === "mp4"
                          ? "/images/mp4.svg"
                          : file?.fileType === "jpeg"
                          ? "/images/docFileIcon.svg"
                          : "/images/linkIcon.svg"
                      }
                      alt="fileIcon"
                      className="h-12 w-12"
                    />
                  </a>
                  <p className="text-base text-c_fff/80 font-medium">{`${
                    file?.fileName?.length > 10
                      ? file?.fileName?.substring(0, 10) +
                        "..." +
                        "." +
                        file?.fileType
                      : file?.fileName + "." + file?.fileType
                  }`}</p>
                  <p className="text-[14px] text-c_fff/40 font-normal">{` ${
                    file?.fileType === "url"
                      ? "URL"
                      : (file?.fileSize / 1024 ** 2).toFixed(2) + " MB"
                  }`}</p>
                </div>
              </div>
              <div className="mt-8">
                {apiHit && filesData?.length <= 0 ? (
                  <NoDataAvailable entity={labels.linksAndFiles} />
                ) : null}
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Files;
