import React, { useEffect, useState } from 'react';
import ToggleSwitch from './common/ToggleSwitch';
import { ModalPopUp } from './common/Modal';
import MenuStatus from './MenuStatus';

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function EditPage({data, saveHandler}:any) {
    const [isData, setData] = useState(data);
    const [isShow, setShow] = useState(false);

    const formSubmit=(e:any)=>{
        e.preventDefault();
        saveHandler(isData);
    };
    const changeHandler=(e:any)=>{
        let {name,value} = e.target;
        setData({...isData, [name]:value});
    }

    const statusValueHandler=(status:string, val:any)=>{ 
        setShow(!isShow);
        setData({
            ...isData,
            visible: status==='active' ? true : false,
            customNextVisibleTime: {
                timeStamp:val !==null ? dayjs.utc(val).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss.SSSZ") : null,
                timeDisplayVal: status
            }
        })
    }


    useEffect(()=>{
        if(data) setData(data);
    },[data])
    return (
        <div className='min-h-[350px]'>
            <div className="flex flex-col gap-2 p-4 mt-8">
                {/* <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900 ">Name</label>
                    <input type="text" name="name" disabled id="name" className="bg-gray-50 border border-gray-300 text-gray-400 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={isData?.name} onChange={changeHandler}/>
                </div> */}
                <section className='flex flex-row gap-3'>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-900 ">Price</label>
                        <input type="text" name="onlinePrice" id="onlinePrice" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " value={isData?.onlinePrice} onChange={changeHandler} />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-900 ">Offer</label>
                        <input type="text" name="offer" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " value={isData?.offer} onChange={changeHandler} />
                    </div>
                </section>
                <MenuStatus status={isData} statusValue={statusValueHandler}/>

                {/* <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900 ">Time Slot</label>
                    {isData.timeSlots.length && isData.timeSlots.map((time:any, i:number)=>
                        <div key={i} className='flex flex-col gap-2'>
                        <input type="text" name="time" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[50px] p-2.5 " value={time.low.hr}  />
                        <input type="text" name="time" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[50px] p-2.5 " value={time.up.hr}  />
                        </div>
                    )}
                </div> */}
                {/* <div className='mt-6'>
                    <label className='flex flex-row gap-2 items-center justify-center'>
                    <input type="checkbox" name="visible" className="h-5 w-5" checked={isData?.visible} onChange={activeHandler}/> 
                        <p className={isData?.visible ? 'text-gray-600' : 'text-red-600'}>{isData?.visible ? 'Activated' : 'Deactivated'}</p>
                    </label>
                </div> */}
            </div>
            <div className="flex flex-row items-center justify-center w-full pb-8 mt-4 space-x-4 sm:absolute sm:px-4 sm:mt-0">
                <button onClick={formSubmit} className="w-[40%] justify-center text-white bg-emerald-500 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditPage