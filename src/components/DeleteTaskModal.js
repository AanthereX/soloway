import { Fragment, useRef } from "react"
import { Dialog, Transition } from '@headlessui/react'
import { labels } from "../configs/Labels"
import deleteIcon from  "../assets/Images/delete.svg"
import { DeleteTaskApiMethod } from "../store/actions/projectActions"
export default ({open = false,setOpen = () => {},taskId,handleAllTask}) => {
    const cancelButtonRef = useRef(null);

    const deleteTaskFunc = async () => {
      await DeleteTaskApiMethod(taskId);
      await setOpen(false)
      await handleAllTask();
    };
    return (
    <Fragment>
         <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef}   onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-c_272727 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-c_272727 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start justify-center items-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    
                      <div className="mt-2 flex flex-col justify-center items-center">
                        <img src={deleteIcon}/>
                        <p className=" text-white text-lg">
                          {labels.areYouSureYouWantToDeleteTask}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="items-center justify-center px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 pb-10">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={deleteTaskFunc}
                  >
                    {labels.delete}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    {labels.cancel}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

    </Fragment>
    )
}