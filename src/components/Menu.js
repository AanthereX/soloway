import { Menu, Transition } from "@headlessui/react";
export default function MenuDropDown({
  options = [],
  children,
  onClick = () => {},
}) {
  return (
    <div className="w-full">
      <Menu as="div" className=" flex justify-end text-left z-10">
        <div>
          <Menu.Button className="inline-flex w-full justify-end ">
            <div>{children}</div>
          </Menu.Button>
        </div>
        <Transition
          as={"div"}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute top-4 right-0  w-32 rounded-md bg-c_595959">
            <div className="px-2 py-2">
              {options?.map((item) => (
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`w-full flex items-center px-2 gap-3 cursor-pointer ${
                        active ? "bg-c_343434" : ""
                      }`}
                      onClick={() => onClick(item)}
                    >
                      {item.icon && (
                        <div>
                          <img src={item?.icon} />
                        </div>
                      )}

                      <div>
                        <span className="text-[16px] font-Outfit_medium text-c_FFD13A">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
