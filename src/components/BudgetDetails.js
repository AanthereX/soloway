import React, { useCallback, useEffect, useRef, useState } from "react";
import { labels } from "../configs/Labels";
import SearchBar from "./SearchBar";
import {
  addBudgetApiMethod,
  addImageAttachmentApiMethod,
  budgetDetailsApiMethod,
  deleteBudgetApiMethod,
  projectBudgetApiMethod,
} from "../store/actions/projectActions";
import { useParams,useNavigate } from "react-router";
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
import { BackArrow } from "./BackArrow";



const BudgetDetails = () => {
  const [budgets, setBudgets] = useState({});
  const [apiHit, setApiHit] = useState(false);
  const [budgetId, setBudgetId] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteBudget, setDeleteBudget] = useState(false);
  const role = JSON.parse(localStorage.getItem("user"))?.role;
  const user = JSON.parse(localStorage.getItem("user"));
  const dateFormat = JSON.parse(localStorage.getItem("detail"))?.dateFormat;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const params = useParams();
  


  useEffect(() => {
    handleBudget();
  }, []);

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
 

  const handleBudget = () => {
    setLoading(true);
    budgetDetailsApiMethod(params?.id, (res) => {
      setApiHit(true);
      setLoading(false);
      setBudgets(res);
    });
  };

  const deleteBudgetFunc = () => {
    setLoading(true);
    deleteBudgetApiMethod(budgetId, async () => {
      setLoading(false);
      await setDeleteBudget(false);
      await handleBudget();
    });
  };


  return (
    <div className="rounded-[8px] bg-[#FFFFFF12] w-full py-6 px-10 my-14 m-5">
      <div className="flex flex-wrap items-center justify-between md:gap-y-0 gap-y-2">
        <div className="flex gap-x-3 text-[20px] text-c_fff/90">
        <div className="flex gap-4">
            <BackArrow
              width={32}
              height={32}
              stroke={"#fff"}
              className={`cursor-pointer`}
              onClick={() => navigate(-1)}
            />
          </div>
          <p className="md:text-[18px] text-[16px]">{labels.budgetDetails}</p>{" "}
          {/* <div className="flex justify-center items-center px-2 md:px-2 md:w-8 w-8 h-8 my-auto bg-c_fff/10 rounded-md">
            <span className=" text-c_fff text-[12px]">{budgets?.length}</span>
          </div> */}
        </div>
        {/* <div className="flex flex-wrap items-center justify-start md:justify-start md:pl-4 pl-0 md:gap-x-4 gap-y-3">
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
        </div> */}
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
                  <React.Fragment>
                    <tr
                      className="odd:bg-c_fff/5 even:bg-transparent rounded-md cursor-pointer overflow-x-auto"
                      key={budgets?.id}
                    >
                      <td className="w-3/6 py-4 gap-x-3 my-4 pl-4 text-base font-normal text-c_fff !rounded-tl-md !rounded-bl-md">
                        {budgets?.description}
                      </td>
                      <td className="py-4 gap-x-3 my-4 text-base font-normal text-c_fff">
                        {budgets?.attachment?.[0]?.attachment ||
                        budgets?.attachment?.[0]?.url ? (
                          <a
                            target="_blank"
                            href={
                              budgets?.attachment?.[0]?.attachment ||
                              budgets?.attachment?.[0]?.url
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
                        {budgets?.status}
                      </td>
                      <td className="w-1/5 py-4 text-sm text-c_fff">{`${
                        budgets?.amount
                      } ${
                       [null,""].includes(budgets?.measurement) ? "" : budgets?.measurement
                      }`}</td>

                      <td
                        style={{ minWidth: "6rem" }}
                        className="w-1/5  text-[13px] text-c_fff/80 font-normal !rounded-tr-md !rounded-br-md"
                      >
                        {moment(budgets?.createdAt)?.format(
                          dateFormat || "YYYY/MM/DD"
                        )}
                      </td>
                      {role === "admin" && budgets?.status === "pending" ? (
                        <td className="px-3 md:px-0 text-sm !rounded-tr-md !rounded-br-md">
                          <div className="flex items-end justify-center">
                            <img
                              onClick={() => {
                                setBudgetId(budgets?.id);
                                setDeleteBudget(true);
                              }}
                              src="/images/deleteIcon.svg"
                              alt="deleteIcon"
                              className="w-6 h-6 cursor-pointer text-c_fff/10"
                            />
                          </div>
                        </td>
                      ) : role === "client" && budgets?.status === "pending" ? (
                        <div className="flex items-center justify-center py-5 gap-x-4 mr-4 px-2 md:px-0 col-span-2">
                          <Button
                            label={labels.deny}
                            onClick={() =>
                              handleChangeStatusDeny(budgets?.id, "denied")
                            }
                            // disabled={!item?.isActive ? true : false}
                            className={`${
                              !budgets?.isActive ? "opacity-80" : "opacity-100"
                            } text-c_FF5C5A cursor-pointer bg-c_101010 px-4 py-1 rounded-[8px] text-sm font-normal capitalize`}
                          />
                          <Button
                            label={labels.approve}
                            onClick={() =>
                              handleChangeStatusApprove(budgets?.id, "approved")
                            }
                            // disabled={!item?.data?.isActive ? true : false}
                            className={`${
                              !budgets?.isActive ? "opacity-80" : "opacity-100"
                            } text-c_0AA81A cursor-pointer bg-c_101010 px-4 py-1 rounded-[8px] text-sm font-normal capitalize`}
                          />
                        </div>
                      ) : (
                        <td className="px-3 md:px-0 text-sm !rounded-tr-md !rounded-br-md"></td>
                      )}
                    </tr>
                  </React.Fragment>
              </tbody>
            </table>
          </div>
        )}
      </>
      {/* <Pagination
        pageCount={Math.ceil(budgetCount) / 10}
        onPageChange={(event) => {
          setPage(event?.selected + 1);
        }}
      /> */}

      
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

export default BudgetDetails;
