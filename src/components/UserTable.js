import React from "react";
import { labels } from "../configs/Labels";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { classNames } from "../utils/classNames";

const UserTable = ({ users }) => {
  return (
    <table className="w-full overflow-auto">
      <thead>
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-4 text-left text-sm uppercase text-white sm:pl-0"
          >
            <div className="flex items-center gap-x-4 pl-4">
              <div className="font-normal text-c_fff/60">{labels.name}</div>

              <div className="flex flex-col items-center">
                <AiFillCaretUp className="text-[10px]" />
                <AiFillCaretDown className="text-[10px]" />
              </div>
            </div>
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 pr-4 text-left text-sm uppercase text-white"
          >
            <div className="flex items-center gap-x-4">
              <div className="font-normal text-c_fff/60">{labels.user}</div>

              <div className="flex flex-col items-center">
                <AiFillCaretUp className="text-[10px]" />
                <AiFillCaretDown className="text-[10px]" />
              </div>
            </div>
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 pr-4 text-left text-sm uppercase text-white"
          >
            <div className="flex items-center gap-x-4">
              <div className="font-normal text-c_fff/60">{labels.email}</div>

              <div className="flex flex-col items-center">
                <AiFillCaretUp className="text-[10px]" />
                <AiFillCaretDown className="text-[10px]" />
              </div>
            </div>
          </th>
          <th
            scope="col"
            className="px-3 md:px-0 py-3.5 text-left text-sm uppercase text-white"
          >
            <div className="flex items-center gap-x-4">
              <div className="font-normal text-c_fff/60">{labels.role}</div>

              <div className="flex flex-col items-center">
                <AiFillCaretUp className="text-[10px]" />
                <AiFillCaretDown className="text-[10px]" />
              </div>
            </div>
          </th>
          <th
            scope="col"
            className="px-3 md:px-0 py-3.5 text-left text-sm uppercase text-white"
          >
            <div className="flex items-center gap-x-4">
              <div className="font-normal text-c_fff/60">{labels.actions}</div>

              <div className="flex flex-col items-center">
                <AiFillCaretUp className="text-[10px]" />
                <AiFillCaretDown className="text-[10px]" />
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="w-full">
        {users?.map((person) => (
          <React.Fragment>
            <tr className="odd:bg-c_1C1C1C !rounded-md" key={person.id}>
              <td className="px-4 py-4 text-sm text-c_fff !rounded-tl-md !rounded-bl-md">
                {person.fullName}
              </td>
              <td className="px-3 py-4 text-sm text-c_fff">
                {person.userName}
              </td>
              <td className="px-3 py-4 text-sm text-c_fff">{person.email}</td>
              <td className="px-3 md:px-0 text-sm">
                <p
                  className={classNames(
                    person.role === "user"
                      ? "px-2 py-1 bg-c_BF642B/20 w-fit text-c_BF642B rounded-sm"
                      : "px-2 py-1 bg-c_0AA81A/20 w-fit text-c_0AA81A rounded-sm",
                    "capitalize"
                  )}
                >
                  {person.role}
                </p>
              </td>
              <td className="px-3 md:px-0 text-sm !rounded-tr-md !rounded-br-md">
                <div className="flex items-center gap-x-2">
                  <img
                    src="/images/editIcon.svg"
                    alt="editIcon"
                    className="w-6 h-6 cursor-pointer text-c_fff"
                  />
                  <img
                    src="/images/deleteIcon.svg"
                    alt="deleteIcon"
                    className="w-6 h-6 cursor-pointer text-c_fff/10"
                  />
                </div>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
