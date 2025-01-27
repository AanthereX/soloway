import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "../utils/classNames";
import FolderIcon from "./FolderIcon";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Dropdown({ tab, setTab, ...props }) {
  const menuItems = [
    {
      id: 1,
      title: "Evo Design",
      nestedItems: [
        { name: "Project One", href: "#" },
        { name: "Project Two", href: "#" },
      ]
    },
    {
      id: 2,
      title: "Soloway",
    },
    {
      id: 3,
      title: "Tucson",
    },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div
        className={`inline-flex w-full gap-x-2.5 bg-transparent text-base py-1 pr-5 leading-6 text-c_fff/60`}
      >
        <FolderIcon
          color={
            window.location.pathname === "/project" ? "#BF642B" : "#ffffff60"
          }
          fill={
            window.location.pathname === "/project" ? "#BF642B30" : "#00000030"
          }
          width={20}
          height={20}
        />
        <p
          className={`${
            window.location.pathname === "/project"
              ? "text-c_fff"
              : "text-c_fff/60"
          }`}
        >
          {props.title}
        </p>

        <p className="py-1 px-2 bg-c_fff/10 text-c_fff text-xs rounded">
          {props.quantity}
        </p>
        <Menu.Button>
          <div className="my-auto">
            <MdKeyboardArrowDown className="text-xl" />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="relative mt-2 w-56 origin-top-right rounded-md !bg-transparent">
          <div className="">
            {menuItems.map((item, index) => (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`flex items-center gap-x-2.5 py-2 text-sm
                    ${
                      window.location.pathname === "/project"
                        ? "!bg-c_1B1B1B"
                        : null
                    }
                    `}
                    >
                      <img
                        src="/images/rightOutlineArrow.svg"
                        alt="rightoutlinearrow"
                        className="w-4 h-4"
                      />
                      <img
                        src="/images/singleFolderIcon.svg"
                        alt="folderIcon"
                        className="w-4 h-4 text-c_fff"
                      />
                      {item.title}
                    </a>
                  )}
                </Menu.Item>
              </>
              
            ))}
            
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
