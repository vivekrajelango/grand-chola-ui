import React, { ReactNode} from 'react';

interface DrawerProps {
    isShowStatus: boolean;
    closeHandler: () => void;
    children: ReactNode;
    position: string;
    title?:string;
}
function Drawer({ isShowStatus, closeHandler, children, position='bottom', title }: DrawerProps) {

    const getPositionClass = () => {
        switch (position) {
          case "bottom":
            return isShowStatus ? "translate-y-0" : "translate-y-full";
          case "right":
            return isShowStatus ? "translate-x-0" : "translate-x-full";
          default:
            return ""; // Default: No transformation
        }
      };

    return (
        <div className={`border-[2px] border rounded-t-2xl fixed bottom-0 z-100 px-2 py-4 w-full max-w-[385px] bg-white transition-transform duration-500 transform ${getPositionClass()}
        `}>
            <div className='fixed top-0 left-0 right-0 rounded-t-2xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% px-2 pt-2'>    
              <div className='flex flex-row items-center justify-center h-[30px]'>
                  <h2 className="text-lg font-bold text-white">
                      {title ? title : ''}
                  </h2>
                  <button onClick={closeHandler} className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.0 right-2.5 inline-flex items-center ">
                      <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
              </div>
              <hr className='my-2'/>
            </div>  
            {/* <section className=''> */}
              {children}
            {/* </section> */}
            {/* <div className="flex items-center p-4 space-x-4 rounded-b ">
              <button onClick={submitHandler} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Confirm</button>
            </div> */}
        </div>
    )
}

export default Drawer;